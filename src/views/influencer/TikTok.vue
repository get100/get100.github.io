<template>
  <div class="tiktok">
    <el-page-header content="TikTok账号绑定" />
    <div class="content">
      <el-card v-if="!isBound">
        <template #header>
          <div class="card-header">
            <span>绑定TikTok账号</span>
          </div>
        </template>
        <div class="bind-content">
          <el-button type="primary" size="large" @click="handleBind">
            <el-icon class="icon"><Link /></el-icon>
            立即绑定
          </el-button>
          <p class="tip">绑定后可以一键分享视频到TikTok</p>
        </div>
      </el-card>
      
      <el-card v-else>
        <template #header>
          <div class="card-header">
            <span>已绑定账号</span>
          </div>
        </template>
        <div class="account-info">
          <div class="info-item">
            <span class="label">账号：</span>
            <span>{{ account.username }}</span>
          </div>
          <div class="info-item">
            <span class="label">粉丝数：</span>
            <span>{{ account.followers }}</span>
          </div>
          <el-button type="danger" @click="handleUnbind">解除绑定</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Link } from '@element-plus/icons-vue'
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

<style scoped>
.tiktok {
  padding: 20px;
}

.content {
  margin-top: 20px;
  max-width: 600px;
}

.bind-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
}

.icon {
  margin-right: 8px;
}

.tip {
  margin-top: 16px;
  color: #909399;
}

.account-info {
  padding: 20px;
}

.info-item {
  margin-bottom: 16px;
}

.label {
  color: #909399;
  margin-right: 8px;
}
</style> 