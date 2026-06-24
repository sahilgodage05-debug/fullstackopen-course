import styled from 'styled-components'
import useNotificationStore from '../stores/notificationStore'

const AlertBox = styled.div`
  color: ${props => props.$type === 'error' ? '#e53e3e' : '#38a169'};
  background: ${props => props.$type === 'error' ? '#fff5f5' : '#f0fff4'};
  font-size: 15px;
  border: 1.5px solid ${props => props.$type === 'error' ? '#feb2b2' : '#c6f6d5'};
  border-radius: 8px;
  padding: 14px 18px;
  margin-bottom: 24px;
  font-weight: 600;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  font-family: system-ui, -apple-system, sans-serif;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
`

const Notification = () => {
  const message = useNotificationStore(state => state.message)
  const type = useNotificationStore(state => state.type)

  if (message === null) {
    return null
  }

  return (
    <AlertBox $type={type}>
      {message}
    </AlertBox>
  )
}

export default Notification
