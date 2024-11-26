<template>
  <div class="orders">
    <el-page-header content="订单记录" />
    <div class="content">
      <el-table :data="orders" style="width: 100%; margin-top: 20px;">
        <el-table-column prop="id" label="订单号" width="180" />
        <el-table-column prop="product" label="商品名称" />
        <el-table-column prop="amount" label="订单金额" />
        <el-table-column prop="commission" label="佣金" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'completed' ? 'success' : 'warning'">
              {{ scope.row.status === 'completed' ? '已结算' : '待结算' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
      </el-table>

      <div class="statistics">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>数据统计</span>
            </div>
          </template>
          <div class="stat-content">
            <div class="stat-item">
              <div class="label">总订单数</div>
              <div class="value">{{ statistics.totalOrders }}</div>
            </div>
            <div class="stat-item">
              <div class="label">总佣金</div>
              <div class="value">¥{{ statistics.totalCommission }}</div>
            </div>
            <div class="stat-item">
              <div class="label">本月订单</div>
              <div class="value">{{ statistics.monthlyOrders }}</div>
            </div>
            <div class="stat-item">
              <div class="label">本月佣金</div>
              <div class="value">¥{{ statistics.monthlyCommission }}</div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Order {
  id: string
  product: string
  amount: number
  commission: number
  status: 'completed' | 'pending'
  createTime: string
}

const orders = ref<Order[]>([
  {
    id: 'ORD001',
    product: '示例商品1',
    amount: 99.9,
    commission: 29.97,
    status: 'completed',
    createTime: '2024-03-20 10:00:00'
  },
  {
    id: 'ORD002',
    product: '示例商品2',
    amount: 199.9,
    commission: 49.98,
    status: 'pending',
    createTime: '2024-03-20 11:00:00'
  }
])

const statistics = ref({
  totalOrders: 10,
  totalCommission: 1234.56,
  monthlyOrders: 5,
  monthlyCommission: 456.78
})
</script>

<style scoped>
.orders {
  padding: 20px;
}

.content {
  margin-top: 20px;
}

.statistics {
  margin-top: 20px;
}

.stat-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.stat-item {
  text-align: center;
}

.stat-item .label {
  color: #909399;
  font-size: 14px;
  margin-bottom: 8px;
}

.stat-item .value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
}
</style> 