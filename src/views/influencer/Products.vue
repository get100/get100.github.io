<template>
  <div class="products">
    <el-page-header content="选品中心" />
    
    <div class="page-content">
      <!-- 左侧类目树 -->
      <div class="category-sidebar">
        <el-card class="category-card">
          <template #header>
            <div class="card-header">
              <span>商品类目</span>
            </div>
          </template>
          <el-tree
            :data="categories"
            :props="defaultProps"
            @node-click="handleCategoryClick"
            default-expand-all
          />
        </el-card>
      </div>

      <!-- 右侧商品列表 -->
      <div class="products-content">
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
                  <img :src="product.image" :alt="product.title" class="image">
                  <div class="video-overlay" @click="handlePreviewVideo(product)">
                    <el-icon><VideoPlay /></el-icon>
                  </div>
                </div>
                <div class="product-info">
                  <h3 class="product-title">{{ product.title }}</h3>
                  <div class="product-price">
                    <span class="price">¥{{ product.price }}</span>
                    <span class="commission">佣金: {{ product.commission }}%</span>
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
      </div>
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

    <!-- TikTok 绑定弹窗 -->
    <el-dialog
      v-model="tikTokBindVisible"
      title="绑定TikTok账号"
      width="500px"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <TikTok @bind-success="handleTikTokBindSuccess" />
    </el-dialog>

    <!-- 添加分享引导弹窗 -->
    <el-dialog
      v-model="shareGuideVisible"
      title="分享到TikTok"
      width="500px"
    >
      <div class="share-guide">
        <el-steps :active="activeStep" finish-status="success">
          <el-step title="步骤1" description="扫描二维码" />
          <el-step title="步骤2" description="添加到橱窗" />
          <el-step title="步骤3" description="分享视频" />
        </el-steps>

        <div class="step-content" v-if="activeStep === 0">
          <div class="qrcode-container">
            <img :src="currentProduct?.qrcode || '/images/mock-qrcode.png'" alt="商品二维码" class="qrcode" />
          </div>
          <p class="guide-text">请使用TikTok App扫描上方二维码，将商品添加到您的橱窗中</p>
          <el-button type="primary" @click="activeStep++">已添加到橱窗，下一步</el-button>
        </div>

        <div class="step-content" v-if="activeStep === 1">
          <p class="guide-text">点击下方按钮，将视频分享到TikTok</p>
          <el-button type="primary" @click="handleShareToTikTok">
            <el-icon><Share /></el-icon>分享视频到TikTok
          </el-button>
        </div>

        <div class="step-content" v-if="activeStep === 2">
          <p class="guide-text">请在TikTok发布页面中：</p>
          <ol class="guide-list">
            <li>点击"添加商品"</li>
            <li>从橱窗中选择刚才添加的商品</li>
            <li>将商品标签拖动到合适的位置</li>
            <li>完成视频发布</li>
          </ol>
          <el-button type="primary" @click="completeShare">完成</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, VideoPlay, Download, Share } from '@element-plus/icons-vue'
import { useAuthStore } from '../../stores/auth'
import TikTok from '../influencer/TikTok.vue'

interface Product {
  id: number
  title: string
  price: number
  commission: number
  image: string
  video?: string
  category: string
}

const searchQuery = ref('')
const previewVisible = ref(false)
const currentProduct = ref<Product | null>(null)
const currentCategory = ref('')

// 类目树数据
const categories = [
  {
    label: '时尚服饰',
    children: [
      { label: '女装' },
      { label: '男装' },
      { label: '运动服饰' }
    ]
  },
  {
    label: '美妆个护',
    children: [
      { label: '护肤品' },
      { label: '彩妆' },
      { label: '个人护理' }
    ]
  },
  {
    label: '数码电子',
    children: [
      { label: '手机配件' },
      { label: '耳机音响' },
      { label: '智能设备' }
    ]
  }
]

const defaultProps = {
  children: 'children',
  label: 'label'
}

// 模拟商品数据
// 在 Products.vue 的 script 部分修改商品数据
const products = ref<Product[]>([
  // 女装类目
  {
    id: 1,
    title: '优雅连衣裙',
    price: 399,
    commission: 30,
    category: '女装',
    image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31',
    video: 'https://example.com/video1.mp4'
  },
  {
    id: 2,
    title: '时尚休闲套装',
    price: 299,
    commission: 25,
    category: '女装',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105',
    video: 'https://example.com/video2.mp4'
  },

  // 男装类目
  {
    id: 3,
    title: '商务西装套装',
    price: 899,
    commission: 20,
    category: '男装',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7',
    video: 'https://example.com/video3.mp4'
  },
  {
    id: 4,
    title: '潮流夹克外套',
    price: 459,
    commission: 28,
    category: '男装',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
    video: 'https://example.com/video4.mp4'
  },

  // 运动服饰类目
  {
    id: 5,
    title: '运动套装',
    price: 299,
    commission: 25,
    category: '运动服饰',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    video: 'https://example.com/video5.mp4'
  },
  {
    id: 6,
    title: '瑜伽服套装',
    price: 199,
    commission: 30,
    category: '运动服饰',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2',
    video: 'https://example.com/video6.mp4'
  },

  // 护肤品类目
  {
    id: 7,
    title: '高级护肤套装',
    price: 999,
    commission: 35,
    category: '护肤品',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6',
    video: 'https://example.com/video7.mp4'
  },
  {
    id: 8,
    title: '补水面膜套装',
    price: 159,
    commission: 40,
    category: '护肤品',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b',
    video: 'https://example.com/video8.mp4'
  },

  // 彩妆类目
  {
    id: 9,
    title: '限量版彩妆盘',
    price: 399,
    commission: 30,
    category: '彩妆',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796',
    video: 'https://example.com/video9.mp4'
  },
  {
    id: 10,
    title: '高光唇釉套装',
    price: 299,
    commission: 35,
    category: '彩妆',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31',
    video: 'https://example.com/video10.mp4'
  },

  // 个人护理类目
  {
    id: 11,
    title: '香氛沐浴套装',
    price: 199,
    commission: 25,
    category: '个人护理',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be',
    video: 'https://example.com/video11.mp4'
  },
  {
    id: 12,
    title: '护发精油套装',
    price: 259,
    commission: 30,
    category: '个人护理',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f',
    video: 'https://example.com/video12.mp4'
  },

  // 手机配件类目
  {
    id: 13,
    title: '无线充电器',
    price: 159,
    commission: 20,
    category: '手机配件',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07',
    video: 'https://example.com/video13.mp4'
  },
  {
    id: 14,
    title: '手机保护壳',
    price: 99,
    commission: 25,
    category: '手机配件',
    image: 'https://images.unsplash.com/photo-1541877944-ac82a091518a',
    video: 'https://example.com/video14.mp4'
  },

  // 耳机音响类目
  {
    id: 15,
    title: '无线降噪耳机',
    price: 999,
    commission: 20,
    category: '耳机音响',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    video: 'https://example.com/video15.mp4'
  },
  {
    id: 16,
    title: '便携蓝牙音箱',
    price: 299,
    commission: 25,
    category: '耳机音响',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1',
    video: 'https://example.com/video16.mp4'
  },

  // 智能设备类目
  {
    id: 17,
    title: '智能手表 Pro',
    price: 1599,
    commission: 28,
    category: '智能设备',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
    video: 'https://example.com/video17.mp4'
  },
  {
    id: 18,
    title: '智能体脂秤',
    price: 199,
    commission: 30,
    category: '智能设备',
    image: 'https://images.unsplash.com/photo-1595348020949-87cdfbb44174',
    video: 'https://example.com/video18.mp4'
  }
])

// 搜索和类目过滤
const filteredProducts = computed(() => {
  let result = products.value
  const query = searchQuery.value.toLowerCase().trim()
  
  // 类目过滤
  if (currentCategory.value) {
    result = result.filter(product => 
      product.category === currentCategory.value
    )
  }
  
  // 搜索过滤
  if (query) {
    result = result.filter(product => 
      product.title.toLowerCase().includes(query)
    )
  }
  
  return result
})

const handleCategoryClick = (data: any) => {
  // 只有叶子节点才进行过滤
  if (!data.children) {
    currentCategory.value = data.label
  }
}

const handleSearch = () => {
  // 实际项目中可能需要调用API进行搜索
}

const handlePreviewVideo = (product: Product) => {
  currentProduct.value = product
  previewVisible.value = true
}

const handleDownload = (product: Product) => {
  ElMessage.success('开始下载视频')
}

const authStore = useAuthStore()
const tikTokBindVisible = ref(false)
const shareGuideVisible = ref(false)
const activeStep = ref(0)

const handleTikTokBindSuccess = () => {
  tikTokBindVisible.value = false
  shareGuideVisible.value = true
  activeStep.value = 0
}

const handleShare = (product: Product) => {
  currentProduct.value = product
  
  if (!authStore.user?.tiktokBound) {
    tikTokBindVisible.value = true
  } else {
    shareGuideVisible.value = true
    activeStep.value = 0
  }
}

const handleShareToTikTok = () => {
  // 模拟分享到TikTok的操作
  setTimeout(() => {
    ElMessage.success('视频已成功导入TikTok')
    activeStep.value++
  }, 1000)
}

const completeShare = () => {
  shareGuideVisible.value = false
  activeStep.value = 0
  ElMessage.success('分享完成')
}
</script>

<style scoped>
.products {
  padding: 20px;
}

.page-content {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.category-sidebar {
  width: 240px;
  flex-shrink: 0;
}

.category-card {
  position: sticky;
  top: 20px;
}

.products-content {
  flex: 1;
}

.search-bar {
  margin-bottom: 20px;
}

.search-input {
  max-width: 400px;
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

.share-guide {
  padding: 20px 0;
}

.step-content {
  margin-top: 40px;
  text-align: center;
}

.qrcode-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.qrcode {
  width: 200px;
  height: 200px;
  object-fit: contain;
}

.guide-text {
  margin: 20px 0;
  color: #606266;
  font-size: 16px;
}

.guide-list {
  text-align: left;
  margin: 20px 0;
  padding-left: 20px;
  color: #606266;
  line-height: 1.8;
}

.el-button {
  margin-top: 20px;
}
</style> 