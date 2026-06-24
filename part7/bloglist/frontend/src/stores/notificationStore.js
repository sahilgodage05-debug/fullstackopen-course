import { create } from 'zustand'

const useNotificationStore = create((set) => {
  let timeoutId = null

  return {
    message: null,
    type: null,
    showNotification: (message, type = 'success', seconds = 5) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      set({ message, type })
      timeoutId = setTimeout(() => {
        set({ message: null, type: null })
        timeoutId = null
      }, seconds * 1000)
    },
    clearNotification: () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      set({ message: null, type: null })
    }
  }
})

export default useNotificationStore
