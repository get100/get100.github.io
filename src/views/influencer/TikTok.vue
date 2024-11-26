<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">TikTok账号绑定</h1>
        <p class="mt-2 text-sm text-gray-600">绑定您的TikTok账号，开启视频分销之旅</p>
      </div>

      <!-- 未绑定状态 -->
      <div v-if="!isBound" class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-primary-100">
              <el-icon class="h-12 w-12 text-primary-600"><Link /></el-icon>
            </div>
            <h3 class="mt-6 text-lg font-medium text-gray-900">绑定TikTok账号</h3>
            <p class="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
              绑定后可以一键分享视频到TikTok，快速实现视频带货变现
            </p>
            <div class="mt-8">
              <button
                type="button"
                @click="handleBind"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <el-icon class="mr-2 -ml-1 h-5 w-5"><Link /></el-icon>
                立即绑定
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 已绑定状态 -->
      <div v-else class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">账号信息</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">您的TikTok账号已成功绑定</p>
        </div>
        <div class="px-4 py-5 sm:p-6">
          <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">TikTok账号</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ account.username }}</dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">粉丝数量</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ account.followers }}</dd>
            </div>
          </dl>
        </div>
        <div class="px-4 py-4 sm:px-6">
          <button
            type="button"
            @click="handleUnbind"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            解除绑定
          </button>
        </div>
      </div>

      <!-- 功能说明 -->
      <div class="mt-8 grid gap-6 sm:grid-cols-2">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <el-icon class="h-6 w-6 text-primary-600"><VideoPlay /></el-icon>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-medium text-gray-900">一键分享</h4>
                <p class="mt-1 text-sm text-gray-500">
                  绑定后可以直接将商品视频分享到TikTok，无需手动下载上传
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <el-icon class="h-6 w-6 text-primary-600"><Money /></el-icon>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-medium text-gray-900">快速变现</h4>
                <p class="mt-1 text-sm text-gray-500">
                  通过TikTok橱窗带货，轻松实现视频内容变现
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Link, VideoPlay, Money } from '@element-plus/icons-vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const emit = defineEmits(['bind-success'])

const isBound = ref(authStore.user?.tiktokBound || false)
const account = ref({
  username: '@example_user',
  followers: '1000'
})

const handleBind = () => {
  // 模拟绑定过程
  setTimeout(() => {
    authStore.bindTikTok()
    isBound.value = true
    ElMessage.success('绑定成功')
    emit('bind-success')
  }, 1000)
}

const handleUnbind = () => {
  isBound.value = false
  ElMessage.success('已解除绑定')
}
</script> 