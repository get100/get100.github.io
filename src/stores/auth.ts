import { defineStore } from 'pinia'

interface UserState {
  user: {
    email: string
    role: 'merchant' | 'influencer'
  } | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): UserState => ({
    user: null,
    token: null
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  
  actions: {
    login(email: string, password: string) {
      if (email === '123@qq.com' && password === '123456') {
        this.user = { email, role: 'influencer' }
        this.token = 'mock_token'
        return true
      }
      if (email === '456@qq.com' && password === '123456') {
        this.user = { email, role: 'merchant' }
        this.token = 'mock_token'
        return true
      }
      return false
    },
    
    logout() {
      this.user = null
      this.token = null
    }
  }
}) 