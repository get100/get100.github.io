<template>
  <div class="products">
    <el-page-header content="选品中心" />
    
    <div class="search-bar">
      <el-input
        v-model="searchQuery"
        placeholder="搜索商品名称"
        class="search-input"
        clearable
        @input="handleSearch"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <div class="products-grid">
      <el-row :gutter="20">
        <el-col :span="6" v-for="product in filteredProducts" :key="product.id">
          <el-card class="product-card">
            <div class="product-cover">
              <img :src="product.image || 'https://via.placeholder.com/300x300'" class="image">
              <div class="video-overlay" @click="handlePreviewVideo(product)">
                <el-icon><VideoPlay /></el-icon>
              </div>
            </div>
            <div class="product-info">
              <h3 class="product-title">{{ product.name }}</h3>
              <div class="product-price">
                <span class="price">¥{{ product.price }}</span>
                <span class="commission">佣金: {{ (product.commission * 100).toFixed(0) }}%</span>
              </div>
              <div class="action-buttons">
                <el-button type="primary" size="small" @click="handleDownload(product)">
                  <el-icon><Download /></el-icon>下载视频
                </el-button>
                <el-button type="success" size="small" @click="handleShare(product)">
                  <el-icon><Share /></el-icon>分享到TikTok
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 视频预览对话框 -->
    <el-dialog
      v-model="previewVisible"
      title="视频预览"
      width="640px"
      :destroy-on-close="true"
    >
      <video
        v-if="currentProduct?.video"
        :src="currentProduct.video"
        controls
        style="width: 100%"
      ></video>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, VideoPlay, Download, Share } from '@element-plus/icons-vue'

interface Product {
  id: number
  name: string
  price: number
  commission: number
  image?: string
  video?: string
}

const searchQuery = ref('')
const previewVisible = ref(false)
const currentProduct = ref<Product | null>(null)

// 模拟商品数据
const products = ref<Product[]>([
  {
    id: 1,
    name: '时尚休闲运动鞋',
    price: 299.9,
    commission: 0.3,
    image: 'https://via.placeholder.com/300x300',
    video: 'https://example.com/video1.mp4'
  },
  {
    id: 2,
    name: '简约百搭双肩包',
    price: 199.9,
    commission: 0.25,
    image: 'https://via.placeholder.com/300x300',
    video: 'https://example.com/video2.mp4'
  }
])

// 搜索过滤
const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return products.value
  return products.value.filter(product => 
    product.name.toLowerCase().includes(query)
  )
})

const handleSearch = () => {
  // 实际项目中可能需要调用API进行搜索
}

const handlePreviewVideo = (product: Product) => {
  currentProduct.value = product
  previewVisible.value = true
}

const handleDownload = (product: Product) => {
  // 实际项目中需要处理视频下载逻辑
  ElMessage.success('开始下载视频')
}

const handleShare = (product: Product) => {
  // 实际项目中需要处理TikTok分享逻辑
  ElMessage.success('正在跳转到TikTok分享')
}
</script>

<style scoped>
.products {
  padding: 20px;
}

.search-bar {
  margin: 20px 0;
}

.search-input {
  max-width: 400px;
}

.products-grid {
  margin-top: 20px;
}

.product-card {
  margin-bottom: 20px;
}

.product-cover {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
}

.video-overlay:hover {
  opacity: 1;
}

.video-overlay .el-icon {
  font-size: 48px;
  color: white;
}

.product-info {
  padding: 14px;
}

.product-title {
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: normal;
  color: #303133;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.product-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.price {
  color: #f56c6c;
  font-size: 18px;
  font-weight: bold;
}

.commission {
  color: #67c23a;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-buttons .el-button {
  flex: 1;
}
</style> 