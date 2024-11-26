<template>
  <div class="orders">
    <el-page-header content="订单管理" />
    <div class="content">
      <el-table :data="orders" style="width: 100%; margin-top: 20px;">
        <el-table-column prop="id" label="订单号" width="180" />
        <el-table-column prop="product" label="商品名称" />
        <el-table-column prop="influencer" label="达人" />
        <el-table-column prop="amount" label="订单金额" />
        <el-table-column prop="commission" label="佣金" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'completed' ? 'success' : 'warning'">
              {{ scope.row.status === 'completed' ? '已完成' : '进行中' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Order {
  id: string
  product: string
  influencer: string
  amount: number
  commission: number
  status: 'completed' | 'pending'
  createTime: string
}

const orders = ref<Order[]>([
  {
    id: 'ORD001',
    product: '示例商品1',
    influencer: '达人A',
    amount: 99.9,
    commission: 29.97,
    status: 'completed',
    createTime: '2024-03-20 10:00:00'
  },
  {
    id: 'ORD002',
    product: '示例商品2',
    influencer: '达人B',
    amount: 199.9,
    commission: 49.98,
    status: 'pending',
    createTime: '2024-03-20 11:00:00'
  }
])
</script>

<style scoped>
.orders {
  padding: 20px;
}

.content {
  margin-top: 20px;
}
</style> 