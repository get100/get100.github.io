<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">商品管理</h1>
        <p class="mt-2 text-sm text-gray-600">管理您的商品信息和视频内容</p>
      </div>

      <!-- 操作栏 -->
      <div class="mb-6">
        <button
          @click="handleAdd"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <el-icon class="mr-2 -ml-1 h-5 w-5"><Plus /></el-icon>
          添加商品
        </button>
      </div>

      <!-- 商品列表 -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y divide-gray-200">
          <li v-for="product in products" :key="product.id" class="px-6 py-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-16 w-16">
                  <img 
                    :src="product.image || 'https://via.placeholder.com/150'" 
                    class="h-16 w-16 rounded-lg object-cover"
                    alt="商品图片"
                  >
                </div>
                <div class="ml-4">
                  <div class="text-lg font-medium text-gray-900">{{ product.name }}</div>
                  <div class="mt-1 flex items-center">
                    <span class="text-sm text-gray-500 mr-4">售价：</span>
                    <span class="text-lg font-semibold text-primary-600">¥{{ product.price }}</span>
                  </div>
                  <div class="mt-1 flex items-center">
                    <span class="text-sm text-gray-500 mr-4">佣金比例：</span>
                    <span class="text-sm font-medium text-green-600">{{ (product.commission * 100).toFixed(0) }}%</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <button
                  @click="handleEdit(product)"
                  class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  编辑
                </button>
                <button
                  @click="handleDelete(product)"
                  class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  删除
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 商品编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑商品' : '添加商品'"
      width="600px"
      class="!bg-white"
      destroy-on-close
    >
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入商品名称" />
        </el-form-item>
        
        <el-form-item label="商品主图" prop="image">
          <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div class="space-y-1 text-center">
              <div v-if="!form.image" class="flex flex-col items-center">
                <el-icon class="mx-auto h-12 w-12 text-gray-400"><Plus /></el-icon>
                <div class="flex text-sm text-gray-600">
                  <label
                    class="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500"
                  >
                    <span>上传图片</span>
                    <input type="file" class="sr-only" @change="handleImageUpload">
                  </label>
                </div>
              </div>
              <img v-else :src="form.image" class="max-h-48 rounded-md">
            </div>
          </div>
        </el-form-item>

        <el-form-item label="售价" prop="price">
          <el-input-number v-model="form.price" :precision="2" :step="0.1" :min="0" />
        </el-form-item>

        <el-form-item label="佣金比例" prop="commission">
          <div class="flex items-center">
            <el-input-number
              v-model="form.commission"
              :min="1"
              :max="100"
              :precision="0"
              :step="1"
              controls-position="right"
              class="w-40"
            />
            <span class="ml-2 text-gray-500">%</span>
          </div>
        </el-form-item>

        <el-form-item label="商品链接" prop="link">
          <el-input v-model="form.link" placeholder="请输入商品链接" />
        </el-form-item>

        <el-form-item label="商品视频" prop="video">
          <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div class="space-y-1 text-center">
              <div v-if="!form.video" class="flex flex-col items-center">
                <el-icon class="mx-auto h-12 w-12 text-gray-400"><VideoCamera /></el-icon>
                <div class="flex text-sm text-gray-600">
                  <label
                    class="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500"
                  >
                    <span>上传视频</span>
                    <input type="file" class="sr-only" accept="video/*" @change="handleVideoUpload">
                  </label>
                </div>
                <p class="text-xs text-gray-500">支持mp4、mov格式，大小不超过100MB</p>
              </div>
              <div v-else class="text-sm text-gray-900">
                已上传视频
                <el-button type="text" @click="form.video = ''">重新上传</el-button>
              </div>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="授权协议" prop="agreement">
          <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div class="space-y-1 text-center">
              <div v-if="!form.agreement" class="flex flex-col items-center">
                <el-icon class="mx-auto h-12 w-12 text-gray-400"><Document /></el-icon>
                <div class="flex text-sm text-gray-600">
                  <label
                    class="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500"
                  >
                    <span>上传协议</span>
                    <input type="file" class="sr-only" accept=".pdf,.doc,.docx" @change="handleAgreementUpload">
                  </label>
                </div>
                <p class="text-xs text-gray-500">支持PDF、Word格式，大小不超过10MB</p>
              </div>
              <div v-else class="text-sm text-gray-900">
                已上传协议：{{ form.agreement }}
                <el-button type="text" @click="form.agreement = ''">重新上传</el-button>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <button
            @click="dialogVisible = false"
            class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            取消
          </button>
          <button
            @click="handleSave"
            :disabled="loading"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {{ loading ? '保存中...' : '确定' }}
          </button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { Plus, VideoCamera, Upload, Document } from '@element-plus/icons-vue'

interface Product {
  id: number
  name: string
  image?: string
  video?: string
  agreement?: string
  price: number
  commission: number
  link?: string
}

interface ProductForm {
  name: string
  image: string
  video: string
  agreement: string
  price: number
  commission: number
  link: string
}

const products = ref<Product[]>([
  { id: 1, name: '示例商品1', price: 99.9, commission: 0.3 },
  { id: 2, name: '示例商品2', price: 199.9, commission: 0.25 }
])

const dialogVisible = ref(false)
const videoDialogVisible = ref(false)
const loading = ref(false)
const videoLoading = ref(false)
const isEdit = ref(false)
const currentProduct = ref<Product | null>(null)
const currentVideo = ref('')
const formRef = ref<FormInstance>()

const form = ref<ProductForm>({
  name: '',
  image: '',
  video: '',
  agreement: '',
  price: 0,
  commission: 30,
  link: ''
})

const rules = {
  name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  price: [{ required: true, message: '请输入售价', trigger: 'blur' }],
  link: [{ required: true, message: '请输入商品链接', trigger: 'blur' }]
}

const resetForm = () => {
  form.value = {
    name: '',
    image: '',
    video: '',
    agreement: '',
    price: 0,
    commission: 30,
    link: ''
  }
}

const handleAdd = () => {
  isEdit.value = false
  resetForm()
  dialogVisible.value = true
}

const handleEdit = (row: Product) => {
  isEdit.value = true
  currentProduct.value = row
  form.value = {
    name: row.name,
    image: row.image || '',
    video: row.video || '',
    agreement: row.agreement || '',
    price: row.price,
    commission: row.commission * 100,
    link: row.link || ''
  }
  dialogVisible.value = true
}

const handleSave = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      // 模拟保存
      setTimeout(() => {
        if (isEdit.value && currentProduct.value) {
          const index = products.value.findIndex(p => p.id === currentProduct.value!.id)
          products.value[index] = { ...currentProduct.value, ...form.value }
        } else {
          products.value.push({
            id: Date.now(),
            ...form.value,
            commission: form.value.commission / 100
          })
        }
        ElMessage.success(isEdit.value ? '修改成功' : '添加成功')
        dialogVisible.value = false
        loading.value = false
      }, 1000)
    }
  })
}

const handleDelete = (row: Product) => {
  ElMessage.success('删除成功')
  products.value = products.value.filter(p => p.id !== row.id)
}

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    form.value.image = reader.result as string
  }
}

const handleVideoUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    form.value.video = reader.result as string
  }
}

const handleAgreementUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    form.value.agreement = file.name
    ElMessage.success('协议文件上传成功')
  }
}
</script>

<style scoped>
.products {
  padding: 20px;
}

.content {
  margin-top: 20px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover;
}

.video-uploader {
  display: block;
}

.upload-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

.agreement-uploader {
  display: block;
}

.commission-input {
  display: flex;
  align-items: center;
  gap: 8px;
}

.commission-suffix {
  color: #606266;
  font-size: 14px;
}
</style> 