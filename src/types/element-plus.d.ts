declare module 'element-plus' {
  import { Component } from 'vue'
  
  const _default: Component
  export default _default
  
  export const ElMessage: {
    success: (message: string) => void
    error: (message: string) => void
    warning: (message: string) => void
  }
  
  export interface FormInstance {
    validate: (callback: (valid: boolean) => void) => Promise<void>
    validateField: (field: string) => void
  }
} 