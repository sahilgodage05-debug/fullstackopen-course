// Exercise 2.16 + 2.17 - Notification component
// type prop: 'success' (green) ya 'error' (red)
// message null hone par kuch render nahi karta

const Notification = ({ message, type }) => {
  if (message === null) return null

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  )
}

export default Notification
