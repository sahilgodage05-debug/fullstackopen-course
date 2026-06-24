import { create } from 'zustand'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
import persistentUser from '../services/persistentUser'

const useUserStore = create((set, get) => ({
  user: null,
  users: [],
  setUser: (user) => {
    if (user) {
      blogService.setToken(user.token)
      persistentUser.saveUser(user)
    } else {
      persistentUser.removeUser()
    }
    set({ user })
  },
  clearUser: () => {
    persistentUser.removeUser()
    set({ user: null })
  },
  login: async (username, password) => {
    const user = await loginService.login({ username, password })
    get().setUser(user)
    return user
  },
  initializeUser: () => {
    const user = persistentUser.getUser()
    if (user) {
      blogService.setToken(user.token)
      set({ user })
    }
  },
  fetchUsers: async () => {
    const users = await userService.getAll()
    set({ users })
  }
}))

export default useUserStore
