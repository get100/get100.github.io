<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">订单管理</h1>
        <p class="mt-2 text-sm text-gray-600">查看和管理达人分销订单</p>
      </div>

      <!-- 统计卡片 -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <el-icon class="h-6 w-6 text-gray-400"><Money /></el-icon>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">总订单金额</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">¥{{ statistics.totalAmount }}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <el-icon class="h-6 w-6 text-gray-400"><List /></el-icon>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">总订单数</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ statistics.totalOrders }}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <el-icon class="h-6 w-6 text-gray-400"><User /></el-icon>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">合作达人数</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ statistics.totalInfluencers }}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <el-icon class="h-6 w-6 text-gray-400"><TrendCharts /></el-icon>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">转化率</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ statistics.conversionRate }}%</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 订单列表 -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg leading-6 font-medium text-gray-900">订单列表</h3>
            <div class="flex items-center space-x-3">
              <el-input
                v-model="searchQuery"
                placeholder="搜索订单号"
                class="w-64"
                clearable
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
              <el-select v-model="statusFilter" placeholder="订单状态" clearable>
                <el-option label="全部" value="" />
                <el-option label="已完成" value="completed" />
                <el-option label="进行中" value="pending" />
              </el-select>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  订单号
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  商品名称
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  达人
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  订单金额
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  佣金
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  创建时间
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in filteredOrders" :key="order.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ order.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ order.product }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ order.influencer }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ¥{{ order.amount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  ¥{{ order.commission }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    ]"
                  >
                    {{ order.status === 'completed' ? '已完成' : '进行中' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ order.createTime }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Money, List, User, TrendCharts, Search } from '@element-plus/icons-vue'

interface Order {
  id: string
  product: string
  influencer: string
  amount: number
  commission: number
  status: 'completed' | 'pending'
  createTime: string
}

const searchQuery = ref('')
const statusFilter = ref('')

const statistics = ref({
  totalAmount: 12345.67,
  totalOrders: 156,
  totalInfluencers: 23,
  conversionRate: 3.5
})

const orders = ref<Order[]>([
  {
    id: 'ORD001',
    product: '时尚运动鞋',
    influencer: '达人A',
    amount: 99.9,
    commission: 29.97,
    status: 'completed',
    createTime: '2024-03-20 10:00:00'
  },
  {
    id: 'ORD002',
    product: '智能手表',
    influencer: '达人B',
    amount: 199.9,
    commission: 49.98,
    status: 'pending',
    createTime: '2024-03-20 11:00:00'
  },
  // 可以添加更多订单数据...
])

const filteredOrders = computed(() => {
  let result = orders.value
  
  if (searchQuery.value) {
    result = result.filter(order => 
      order.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (statusFilter.value) {
    result = result.filter(order => order.status === statusFilter.value)
  }
  
  return result
})
</script>

<style scoped>
.orders {
  padding: 20px;
}

.content {
  margin-top: 20px;
}
</style> 