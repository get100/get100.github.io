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
          <el-form-item prop="agreement">
            <el-checkbox v-model="form.agreement">
              我已阅读并同意
              <el-button link type="primary" @click="showAgreement">《网站服务协议》</el-button>
            </el-checkbox>
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

    <!-- 服务协议弹窗 -->
    <el-dialog
      v-model="agreementVisible"
      title="网站服务协议"
      width="600px"
      :close-on-click-modal="false"
    >
      <div class="agreement-content">
        <h3>服务协议内容</h3>
        <div class="agreement-text">
          <p>欢迎使用商品视频分销平台！</p>
          <h4>1. 协议的范围</h4>
          <p>本协议是您与商品视频分销平台之间关于使用本平台服务所订立的协议。</p>
          <h4>2. 账号注册</h4>
          <p>2.1 您承诺提供真实、准确、完整的注册信息。</p>
          <p>2.2 您需要选择商家或达人身份进行注册。</p>
          <h4>3. 平台规则</h4>
          <p>3.1 商家须确保上传的商品信息真实有效。</p>
          <p>3.2 达人须遵守视频分享的相关规定。</p>
          <h4>4. 收益分配</h4>
          <p>4.1 平台将按照约定的佣金比例进行收益分配。</p>
          <p>4.2 具体分配方式以实际合作协议为准。</p>
        </div>
      </div>
      <template #footer>
        <el-button @click="agreementVisible = false">关闭</el-button>
        <el-button type="primary" @click="agreeAndClose">同意并关闭</el-button>
      </template>
    </el-dialog>
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
const agreementVisible = ref(false)

const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
  role: 'influencer',
  agreement: false
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
  ],
  agreement: [
    {
      validator: (rule: any, value: any, callback: (error?: Error) => void) => {
        if (!value) {
          callback(new Error('请阅读并同意服务协议'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ]
}

const showAgreement = () => {
  agreementVisible.value = true
}

const agreeAndClose = () => {
  form.value.agreement = true
  agreementVisible.value = false
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

.agreement-content {
  max-height: 400px;
  overflow-y: auto;
  padding: 0 20px;
}

.agreement-text {
  line-height: 1.8;
  color: #606266;
}

.agreement-text h4 {
  margin: 16px 0 8px;
  color: #303133;
}

.agreement-text p {
  margin: 8px 0;
}
</style> 