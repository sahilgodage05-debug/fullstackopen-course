const KEY = 'loggedBlogappUser'

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(KEY)
  return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
}

const saveUser = (user) => {
  window.localStorage.setItem(KEY, JSON.stringify(user))
}

const removeUser = () => {
  window.localStorage.removeItem(KEY)
}

export default { getUser, saveUser, removeUser }
