<template>
  <main-layout>
    <div class="home">
      <!-- 主横幅区域 -->
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="gradient-text">短视频带货新时代</h1>
          <p class="hero-subtitle">连接商家与达人，让每个商品都能出圈</p>
          <div class="hero-buttons">
            <el-button type="primary" size="large" class="gradient-button" @click="$router.push('/register')">
              <el-icon><Plus /></el-icon>立即入驻
            </el-button>
            <el-button size="large" @click="$router.push('/login')">
              <el-icon><Right /></el-icon>开始变现
            </el-button>
          </div>
          <div class="stats">
            <div class="stat-item">
              <div class="stat-number">10w+</div>
              <div class="stat-label">活跃达人</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">100w+</div>
              <div class="stat-label">商品视频</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">1000w+</div>
              <div class="stat-label">月GMV</div>
            </div>
          </div>
        </div>
        <div class="hero-image">
          <div class="phone-mockup">
            <div class="video-scroll">
              <div v-for="(item, i) in demoProducts" :key="i" class="video-item">
                <img :src="item.image" :alt="item.title" />
                <div class="video-info">
                  <span class="video-title">{{ item.title }}</span>
                  <span class="video-stats">{{ item.stats }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 功能特点区域 -->
      <div class="features-section">
        <h2 class="section-title">为什么选择我们？</h2>
        <el-row :gutter="30">
          <el-col :span="8" v-for="(feature, index) in features" :key="index">
            <div class="feature-card" :class="`feature-${index + 1}`">
              <el-icon class="feature-icon"><component :is="feature.icon" /></el-icon>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.desc }}</p>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 合作流程区域 -->
      <div class="workflow-section">
        <h2 class="section-title">三步开启带货之旅</h2>
        <el-timeline>
          <el-timeline-item
            v-for="(step, index) in steps"
            :key="index"
            :type="step.type"
            :icon="step.icon"
            :size="'large'"
          >
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </el-timeline-item>
        </el-timeline>
      </div>

      <!-- 加入我们区域 -->
      <div class="join-section">
        <div class="join-content">
          <h2>准备好开始了吗？</h2>
          <p>加入我们的短视频带货生态，让创意变现更简单</p>
          <el-button type="primary" size="large" class="gradient-button" @click="$router.push('/register')">
            立即开始
          </el-button>
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import { Plus, Right, ShoppingBag, VideoPlay, TrendCharts, Share, Money, Star } from '@element-plus/icons-vue'
import MainLayout from '../layouts/MainLayout.vue'

const features = [
  {
    icon: 'VideoPlay',
    title: '海量优质视频',
    desc: '精选爆款商品视频，一键分享获得收益'
  },
  {
    icon: 'Money',
    title: '高额佣金收益',
    desc: '最高50%佣金比例，收益实时结算'
  },
  {
    icon: 'Share',
    title: '一键分享变现',
    desc: '无缝对接TikTok，快速实现视频变现'
  }
]

const steps = [
  {
    icon: 'User',
    type: 'primary',
    title: '注册账号',
    desc: '选择商家或达人身份，快速完成注册'
  },
  {
    icon: 'Upload',
    type: 'success',
    title: '上传或选择',
    desc: '商家上传商品视频，达人选择心仪商品'
  },
  {
    icon: 'Share',
    type: 'warning',
    title: '分享获利',
    desc: '一键分享到TikTok，坐等收益到账'
  }
]

const demoProducts = [
  {
    title: '时尚运动鞋',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    stats: '120w+ 播放'
  },
  {
    title: '精美化妆品',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
    stats: '89w+ 播放'
  },
  {
    title: '无线耳机',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    stats: '156w+ 播放'
  }
]
</script>

<style scoped>
.home {
  overflow-x: hidden;
}

.hero-section {
  min-height: 600px;
  background: linear-gradient(135deg, #1a1a1a 0%, #373737 100%);
  color: white;
  padding: 60px 40px;
  display: flex;
  align-items: center;
  position: relative;
}

.hero-content {
  flex: 1;
  max-width: 600px;
  z-index: 1;
}

.gradient-text {
  font-size: 56px;
  font-weight: bold;
  background: linear-gradient(45deg, #ff4d4d, #f9cb28);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 24px;
}

.hero-subtitle {
  font-size: 24px;
  color: #e0e0e0;
  margin-bottom: 40px;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.gradient-button {
  background: linear-gradient(45deg, #ff4d4d, #f9cb28);
  border: none;
}

.stats {
  display: flex;
  gap: 40px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 32px;
  font-weight: bold;
  color: #ff4d4d;
}

.stat-label {
  color: #e0e0e0;
  margin-top: 8px;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.phone-mockup {
  width: 300px;
  height: 600px;
  background: #000;
  border-radius: 30px;
  padding: 10px;
  position: relative;
  overflow: hidden;
}

.video-scroll {
  height: 100%;
  overflow-y: auto;
}

.video-item {
  position: relative;
  height: 500px;
  margin-bottom: 10px;
}

.video-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: white;
}

.video-title {
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.video-stats {
  font-size: 14px;
  opacity: 0.8;
}

.features-section {
  padding: 80px 40px;
  background: #fff;
}

.section-title {
  text-align: center;
  font-size: 36px;
  margin-bottom: 60px;
  color: #333;
}

.feature-card {
  padding: 40px;
  text-align: center;
  border-radius: 20px;
  transition: transform 0.3s;
  height: 100%;
  background: #f8f9fa;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
  color: #ff4d4d;
}

.feature-card h3 {
  font-size: 24px;
  margin-bottom: 16px;
  color: #333;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.workflow-section {
  padding: 80px 40px;
  background: #f8f9fa;
}

.join-section {
  padding: 100px 40px;
  background: linear-gradient(135deg, #1a1a1a 0%, #373737 100%);
  text-align: center;
  color: white;
}

.join-content h2 {
  font-size: 36px;
  margin-bottom: 20px;
}

.join-content p {
  font-size: 18px;
  margin-bottom: 40px;
  color: #e0e0e0;
}

/* 自定义滚动条 */
.video-scroll::-webkit-scrollbar {
  width: 6px;
}

.video-scroll::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.video-scroll::-webkit-scrollbar-thumb {
  background: #666;
  border-radius: 3px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
  }

  .hero-content {
    margin-bottom: 40px;
  }

  .stats {
    justify-content: center;
  }

  .hero-buttons {
    justify-content: center;
  }
}
</style> 