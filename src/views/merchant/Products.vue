<template>
  <div class="products">
    <el-page-header content="商品管理" />
    <div class="content">
      <el-button type="primary" @click="handleAdd">添加商品</el-button>
      <el-table :data="products" style="width: 100%; margin-top: 20px;">
        <el-table-column prop="name" label="商品名称" />
        <el-table-column prop="price" label="售价">
          <template #default="scope">
            ¥{{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column prop="commission" label="佣金比例">
          <template #default="scope">
            {{ (scope.row.commission * 100).toFixed(0) }}%
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" link @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 商品编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑商品' : '添加商品'"
      width="600px"
    >
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="商品主图" prop="image">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="beforeImageUpload"
          >
            <img v-if="form.image" :src="form.image" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="售价" prop="price">
          <el-input-number v-model="form.price" :precision="2" :step="0.1" :min="0" />
        </el-form-item>
        <el-form-item label="佣金比例" prop="commission">
          <div class="commission-input">
            <el-input-number
              v-model="form.commission"
              :min="1"
              :max="100"
              :precision="0"
              :step="1"
              controls-position="right"
              style="width: 160px"
            />
            <span class="commission-suffix">%</span>
          </div>
        </el-form-item>
        <el-form-item label="商品链接" prop="link">
          <el-input v-model="form.link" placeholder="请输入商品链接" />
        </el-form-item>
        <el-form-item label="商品视频" prop="video">
          <el-upload
            class="video-uploader"
            action="#"
            :show-file-list="true"
            :before-upload="beforeVideoUpload"
            accept="video/*"
            :limit="1"
          >
            <el-button type="primary">
              <el-icon><Upload /></el-icon>
              <span>上传视频</span>
            </el-button>
            <template #tip>
              <div class="upload-tip">支持mp4、mov格式，大小不超过100MB</div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item label="授权协议" prop="agreement">
          <el-upload
            class="agreement-uploader"
            action="#"
            :show-file-list="true"
            :before-upload="beforeAgreementUpload"
            :limit="1"
            accept=".pdf,.doc,.docx"
          >
            <el-button type="primary">
              <el-icon><Upload /></el-icon>
              <span>上传协议文件</span>
            </el-button>
            <template #tip>
              <div class="upload-tip">支持PDF、Word格式，大小不超过10MB</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave" :loading="loading">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 视频上传对话框 -->
    <el-dialog
      v-model="videoDialogVisible"
      title="上传商品视频"
      width="500px"
    >
      <el-upload
        class="video-uploader"
        action="#"
        :show-file-list="false"
        :before-upload="beforeVideoUpload"
      >
        <video v-if="currentVideo" :src="currentVideo" class="video-preview" controls />
        <el-icon v-else class="video-uploader-icon"><VideoCamera /></el-icon>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="videoDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleVideoSave" :loading="videoLoading">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { Plus, VideoCamera, Upload } from '@element-plus/icons-vue'

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

const beforeImageUpload = (file: File) => {
  // 模拟图片上传
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    form.value.image = reader.result as string
  }
  return false
}

const handleUploadVideo = (row: Product) => {
  currentProduct.value = row
  currentVideo.value = ''
  videoDialogVisible.value = true
}

const beforeVideoUpload = (file: File) => {
  const isValidFormat = ['video/mp4', 'video/quicktime'].includes(file.type)
  const isLt100M = file.size / 1024 / 1024 < 100

  if (!isValidFormat) {
    ElMessage.error('视频格式不正确！')
    return false
  }
  if (!isLt100M) {
    ElMessage.error('视频大小不能超过 100MB!')
    return false
  }

  // 模拟视频上传
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    form.value.video = reader.result as string
  }
  return false
}

const handleVideoSave = () => {
  if (!currentVideo.value) {
    ElMessage.warning('请先上传视频')
    return
  }
  
  videoLoading.value = true
  // 模拟保存视频
  setTimeout(() => {
    ElMessage.success('视频上传成功')
    videoDialogVisible.value = false
    videoLoading.value = false
  }, 1000)
}

const beforeAgreementUpload = (file: File) => {
  const isValidFormat = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ].includes(file.type)
  const isLt10M = file.size / 1024 / 1024 < 10

  if (!isValidFormat) {
    ElMessage.error('文件格式不正确！')
    return false
  }
  if (!isLt10M) {
    ElMessage.error('文件大小不能超过 10MB!')
    return false
  }

  // 模拟文件上传
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    form.value.agreement = file.name
    ElMessage.success('协议文件上传成功')
  }
  return false
}

const formatTooltip = (val: number): string => {
  return val + '%'
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