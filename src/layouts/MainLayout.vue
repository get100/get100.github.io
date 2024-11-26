<template>
  <el-container>
    <el-header height="60px">
      <nav class="nav-container">
        <div class="nav-left">
          <router-link to="/" class="logo">商品视频分销平台</router-link>
        </div>
        <div class="nav-right">
          <template v-if="!authStore.user">
            <router-link to="/login" class="nav-link">登录</router-link>
            <router-link to="/register" class="nav-link">注册</router-link>
          </template>
          <template v-else>
            <span class="user-email">{{ authStore.user.email }}</span>
            <el-button type="text" @click="authStore.logout">退出</el-button>
          </template>
        </div>
      </nav>
    </el-header>
    <el-main>
      <slot></slot>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

<style scoped>
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.nav-left {
  display: flex;
  align-items: center;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo {
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}

.nav-link {
  text-decoration: none;
  color: #333;
}

.user-email {
  margin-right: 10px;
}
</style> 