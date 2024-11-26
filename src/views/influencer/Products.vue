<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="max-w-[1600px] mx-auto px-4">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">选品中心</h1>
        <p class="mt-2 text-sm text-gray-600">浏览商品视频，一键分享获得佣金</p>
      </div>

      <div class="flex gap-4">
        <!-- 左侧类目树 -->
        <div class="w-56 flex-shrink-0">
          <div class="bg-white rounded-lg shadow-sm sticky top-24">
            <div class="px-4 py-5 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">商品类目</h3>
            </div>
            <div class="p-4">
              <el-tree
                :data="categories"
                :props="defaultProps"
                @node-click="handleCategoryClick"
                default-expand-all
              />
            </div>
          </div>
        </div>

        <!-- 右侧商品列表 -->
        <div class="flex-1">
          <!-- 搜索栏 -->
          <div class="mb-6">
            <div class="max-w-lg">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <el-icon class="h-5 w-5 text-gray-400"><Search /></el-icon>
                </div>
                <input
                  type="text"
                  v-model="searchQuery"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="搜索商品名称"
                  @input="handleSearch"
                >
              </div>
            </div>
          </div>

          <!-- 商品网格 -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="product in filteredProducts" :key="product.id" 
                 class="bg-white overflow-hidden shadow-sm rounded-lg">
              <!-- 商品图片部分 -->
              <div class="relative pt-[100%]">
                <img 
                  :src="product.image" 
                  :alt="product.title"
                  class="absolute inset-0 w-full h-full object-cover"
                >
                <div 
                  class="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer"
                  @click="handlePreviewVideo(product)"
                >
                  <el-icon class="text-white text-4xl"><VideoPlay /></el-icon>
                </div>
              </div>

              <!-- 商品信息部分 -->
              <div class="p-4">
                <h3 class="text-base font-medium text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                  {{ product.title }}
                </h3>
                <div class="flex items-center justify-between mb-4">
                  <span class="text-lg font-bold text-primary-600">¥{{ product.price }}</span>
                  <span class="text-sm font-medium text-green-600">佣金 {{ product.commission }}%</span>
                </div>
                <div class="space-y-2">
                  <button
                    @click="handleDownload(product)"
                    class="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <el-icon class="mr-2 -ml-1 h-4 w-4"><Download /></el-icon>
                    下载视频
                  </button>
                  <button
                    @click="handleShare(product)"
                    class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <el-icon class="mr-2 -ml-1 h-4 w-4"><Share /></el-icon>
                    分享到TikTok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹窗部分保持不变 -->
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
        class="w-full"
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

    <!-- 分享引导弹窗 -->
    <el-dialog
      v-model="shareGuideVisible"
      title="分享到TikTok"
      width="500px"
    >
      <div class="py-6">
        <el-steps :active="activeStep" finish-status="success" class="mb-8">
          <el-step title="步骤1" description="扫描二维码" />
          <el-step title="步骤2" description="添加到橱窗" />
          <el-step title="步骤3" description="分享视频" />
        </el-steps>

        <div v-if="activeStep === 0" class="text-center">
          <div class="mb-6">
            <img :src="currentProduct?.qrcode || '/images/mock-qrcode.png'" alt="商品二维码" class="mx-auto w-48 h-48">
          </div>
          <p class="text-gray-600 mb-6">请使用TikTok App扫描上方二维码，将商品添加到您的橱窗中</p>
          <el-button type="primary" @click="activeStep++">已添加到橱窗，下一步</el-button>
        </div>

        <div v-if="activeStep === 1" class="text-center">
          <p class="text-gray-600 mb-6">点击下方按钮，将视频分享到TikTok</p>
          <el-button type="primary" @click="handleShareToTikTok">
            <el-icon class="mr-2"><Share /></el-icon>分享视频到TikTok
          </el-button>
        </div>

        <div v-if="activeStep === 2" class="text-center">
          <p class="text-gray-600 mb-4">请在TikTok发布页面中：</p>
          <ol class="text-left text-gray-600 space-y-2 mb-6">
            <li>1. 点击"添加商品"</li>
            <li>2. 从橱窗中选择刚才添加的商品</li>
            <li>3. 将商品标签拖动到合适的位置</li>
            <li>4. 完成视频发布</li>
          </ol>
          <el-button type="primary" @click="completeShare">完成</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 下载引导弹窗 -->
    <el-dialog
      v-model="downloadGuideVisible"
      title="下载视频"
      width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="py-6">
        <el-steps :active="downloadStep" finish-status="success" class="mb-8">
          <el-step title="步骤1" description="添加到橱窗" />
          <el-step title="步骤2" description="下载视频" />
        </el-steps>

        <div v-if="downloadStep === 0" class="text-center">
          <div class="mb-6">
            <img :src="currentProduct?.qrcode || '/images/mock-qrcode.png'" alt="商品二维码" class="mx-auto w-48 h-48">
          </div>
          <p class="text-gray-600 mb-6">请使用TikTok App扫描上方二维码，将商品添加到您的橱窗中</p>
          <el-button type="primary" @click="downloadStep++">已添加到橱窗，下一步</el-button>
        </div>

        <div v-if="downloadStep === 1" class="text-center">
          <p class="text-gray-600 mb-6">商品已添加到橱窗，现在您可以下载视频了</p>
          <el-button type="primary" @click="handleDownloadVideo">
            <el-icon class="mr-2"><Download /></el-icon>下载视频
          </el-button>
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
    title: '护发精套装',
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
  currentProduct.value = product
  downloadGuideVisible.value = true
  downloadStep.value = 0
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

// 添加下载相关的状态
const downloadGuideVisible = ref(false)
const downloadStep = ref(0)

// 添加实际下载视频的处理函数
const handleDownloadVideo = () => {
  // 这里实现实际的视频下载逻辑
  ElMessage.success('开始下载视频')
  // 下载完成后关闭弹窗
  setTimeout(() => {
    downloadGuideVisible.value = false
    downloadStep.value = 0
  }, 1000)
}
</script> 