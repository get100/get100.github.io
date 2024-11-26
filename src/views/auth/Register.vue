<template>
  <main-layout>
    <div class="register-container">
      <el-card class="register-card">
        <h2>注册</h2>
        <el-form :model="form" :rules="rules" ref="formRef" @submit.prevent="handleRegister">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" type="email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" />
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-radio-group v-model="form.role">
              <el-radio label="merchant">商家</el-radio>
              <el-radio label="influencer">达人</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" :loading="loading">注册</el-button>
          </el-form-item>
        </el-form>
        <div class="login-link">
          已有账号？<router-link to="/login">立即登录</router-link>
        </div>
      </el-card>
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import MainLayout from '../../layouts/MainLayout.vue'

interface FormRule {
  required?: boolean
  message?: string
  trigger?: 'blur' | 'change'
  validator?: (rule: any, value: string, callback: (error?: Error) => void) => void
  type?: string
}

interface FormRules {
  [key: string]: FormRule[]
}

const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
  role: 'influencer'
})

const validatePass = (rule: any, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (form.value.confirmPassword !== '') {
      formRef.value?.validateField('confirmPassword')
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.value.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const rules: FormRules = {
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  password: [
    { required: true, validator: validatePass, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validatePass2, trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ]
}

const handleRegister = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      // 这里模拟注册成功
      setTimeout(() => {
        ElMessage.success('注册成功')
        router.push('/login')
        loading.value = false
      }, 1000)
    }
  })
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
  padding: 20px;
}

.register-card {
  width: 100%;
  max-width: 400px;
}

.login-link {
  text-align: center;
  margin-top: 16px;
}
</style> 