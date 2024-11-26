<template>
  <main-layout>
    <div class="login-container">
      <el-card class="login-card">
        <h2>登录</h2>
        <el-form :model="form" @submit.prevent="handleLogin">
          <el-form-item label="邮箱">
            <el-input v-model="form.email" type="email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
        <div class="register-link">
          还没有账号？<router-link to="/register">立即注册</router-link>
        </div>
      </el-card>
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import MainLayout from '../../layouts/MainLayout.vue'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  loading.value = true
  try {
    const success = await authStore.login(form.value.email, form.value.password)
    if (success) {
      ElMessage.success('登录成功')
      if (authStore.user?.role === 'merchant') {
        router.push('/merchant/products')
      } else if (authStore.user?.role === 'influencer') {
        router.push('/influencer/products')
      }
    } else {
      ElMessage.error('邮箱或密码错误')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
}

.register-link {
  text-align: center;
  margin-top: 16px;
}
</style> 