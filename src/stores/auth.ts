import { defineStore } from 'pinia'

interface UserState {
  user: {
    email: string
    role: 'merchant' | 'influencer'
    tiktokBound: boolean
  } | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): UserState => {
    const savedState = localStorage.getItem('auth')
    if (savedState) {
      return JSON.parse(savedState)
    }
    return {
      user: null,
      token: null
    }
  },
  
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  
  actions: {
    login(email: string, password: string) {
      if (email === '123@qq.com' && password === '123456') {
        this.user = { 
          email, 
          role: 'influencer',
          tiktokBound: false
        }
        this.token = 'mock_token'
        this.saveState()
        return true
      }
      if (email === '456@qq.com' && password === '123456') {
        this.user = { 
          email, 
          role: 'merchant',
          tiktokBound: false
        }
        this.token = 'mock_token'
        this.saveState()
        return true
      }
      return false
    },
    
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('auth')
    },

    bindTikTok() {
      if (this.user) {
        this.user.tiktokBound = true
        this.saveState()
      }
    },

    saveState() {
      localStorage.setItem('auth', JSON.stringify({
        user: this.user,
        token: this.token
      }))
    }
  }
}) 