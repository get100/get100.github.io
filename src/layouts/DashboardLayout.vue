<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        :default-active="route.path"
        class="dashboard-menu"
        router
      >
        <template v-if="authStore.user?.role === 'merchant'">
          <el-menu-item index="/merchant/products">
            <el-icon><Document /></el-icon>
            <span>商品管理</span>
          </el-menu-item>
          <el-menu-item index="/merchant/orders">
            <el-icon><List /></el-icon>
            <span>订单管理</span>
          </el-menu-item>
        </template>
        
        <template v-if="authStore.user?.role === 'influencer'">
          <el-menu-item index="/influencer/products">
            <el-icon><ShoppingBag /></el-icon>
            <span>选品中心</span>
          </el-menu-item>
          <el-menu-item index="/influencer/orders">
            <el-icon><List /></el-icon>
            <span>订单记录</span>
          </el-menu-item>
          <el-menu-item index="/influencer/tiktok">
            <el-icon><Link /></el-icon>
            <span>TikTok绑定</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header height="60px">
        <div class="header-right">
          <span>{{ authStore.user?.email }}</span>
          <el-button type="text" @click="handleLogout">退出</el-button>
        </div>
      </el-header>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { Document, List, VideoPlay, Link } from '@element-plus/icons-vue'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.el-aside {
  background-color: #304156;
  height: 100vh;
}

.dashboard-menu {
  height: 100%;
  border-right: none;
}

.el-header {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style> 