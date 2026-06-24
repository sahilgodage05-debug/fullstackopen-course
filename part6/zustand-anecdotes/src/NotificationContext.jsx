/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  return context[0]
}

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext)
  return context[1]
}

let timeoutId = null

export const useNotify = () => {
  const dispatch = useNotificationDispatch()
  return (message, seconds = 5) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch({ type: 'SHOW', payload: message })
    timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
      timeoutId = null
    }, seconds * 1000)
  }
}

export default NotificationContext
