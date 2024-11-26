<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 侧边栏 -->
    <aside class="fixed inset-y-0 left-0 w-64 bg-gray-900 transition-transform duration-300 z-20">
      <div class="flex h-16 items-center justify-center border-b border-gray-800">
        <span class="text-xl font-bold text-white">后台管理</span>
      </div>
      
      <nav class="mt-5 px-2 space-y-1">
        <template v-if="authStore.user?.role === 'merchant'">
          <router-link 
            to="/merchant/products"
            class="group flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
            :class="{ 'bg-gray-800 text-white': route.path === '/merchant/products' }"
          >
            <el-icon class="mr-3 h-5 w-5"><Document /></el-icon>
            <span>商品管理</span>
          </router-link>
          
          <router-link 
            to="/merchant/orders"
            class="group flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
            :class="{ 'bg-gray-800 text-white': route.path === '/merchant/orders' }"
          >
            <el-icon class="mr-3 h-5 w-5"><List /></el-icon>
            <span>订单管理</span>
          </router-link>
        </template>
        
        <template v-if="authStore.user?.role === 'influencer'">
          <router-link 
            to="/influencer/products"
            class="group flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
            :class="{ 'bg-gray-800 text-white': route.path === '/influencer/products' }"
          >
            <el-icon class="mr-3 h-5 w-5"><ShoppingBag /></el-icon>
            <span>选品中心</span>
          </router-link>
          
          <router-link 
            to="/influencer/orders"
            class="group flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
            :class="{ 'bg-gray-800 text-white': route.path === '/influencer/orders' }"
          >
            <el-icon class="mr-3 h-5 w-5"><List /></el-icon>
            <span>订单记录</span>
          </router-link>
          
          <router-link 
            to="/influencer/tiktok"
            class="group flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
            :class="{ 'bg-gray-800 text-white': route.path === '/influencer/tiktok' }"
          >
            <el-icon class="mr-3 h-5 w-5"><Link /></el-icon>
            <span>TikTok绑定</span>
          </router-link>
        </template>
      </nav>
    </aside>

    <!-- 主内容区 -->
    <div class="pl-64">
      <!-- 顶部导航栏 -->
      <header class="h-16 bg-white shadow-sm fixed right-0 left-64 top-0 z-10">
        <div class="h-full px-6 flex items-center justify-end">
          <div class="flex items-center space-x-4">
            <span class="text-gray-600">{{ authStore.user?.email }}</span>
            <el-button 
              type="danger" 
              plain 
              size="small"
              @click="handleLogout"
              class="hover:bg-red-50"
            >
              退出
            </el-button>
          </div>
        </div>
      </header>

      <!-- 页面内容 -->
      <main class="pt-16 p-6">
        <div class="max-w-7xl mx-auto">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { Document, List, VideoPlay, Link, ShoppingBag } from '@element-plus/icons-vue'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script> 