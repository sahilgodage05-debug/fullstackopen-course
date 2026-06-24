import styled from 'styled-components'

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

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <Container>
      <Title>Log in to application</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Username</Label>
          <Input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </FormGroup>
        <Button type="submit">Login</Button>
      </form>
    </Container>
  )
}

export default LoginForm
