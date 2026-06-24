import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useField } from '../hooks/useField'
import useUserStore from '../stores/userStore'
import useNotificationStore from '../stores/notificationStore'

const Container = styled.div`
  max-width: 400px;
  margin: 60px auto;
  padding: 32px;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', system-ui, sans-serif;
`

const Title = styled.h2`
  font-size: 26px;
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 28px;
  text-align: center;
  letter-spacing: -0.5px;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }
`

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: #2b6cb0;
  }

  &:active {
    transform: scale(0.98);
  }
`

const LoginForm = () => {
  const usernameField = useField('text')
  const passwordField = useField('password')

  const { reset: resetUsername, ...usernameProps } = usernameField
  const { reset: resetPassword, ...passwordProps } = passwordField

  const login = useUserStore(state => state.login)
  const showNotification = useNotificationStore(state => state.showNotification)
  const navigate = useNavigate()

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    try {
      const userObj = await login(usernameProps.value, passwordProps.value)
      showNotification(`Logged in successfully as ${userObj.name}`)
      resetUsername()
      resetPassword()
      navigate('/')
    } catch (exception) {
      showNotification(
        exception.response?.data?.error || 'Wrong username or password',
        'error'
      )
    }
  }

  return (
    <Container>
      <Title>Log in to application</Title>
      <form onSubmit={handleLoginSubmit}>
        <FormGroup>
          <Label>Username</Label>
          <Input name="Username" {...usernameProps} />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input name="Password" {...passwordProps} />
        </FormGroup>
        <Button type="submit">Login</Button>
      </form>
    </Container>
  )
}

export default LoginForm
