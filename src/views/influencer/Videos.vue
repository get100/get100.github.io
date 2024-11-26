<template>
  <div class="videos">
    <el-page-header content="视频浏览" />
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="6" v-for="video in videos" :key="video.id">
          <el-card :body-style="{ padding: '0px' }">
            <div class="video-cover">
              <img :src="video.cover" class="image">
            </div>
            <div style="padding: 14px;">
              <span>{{ video.title }}</span>
              <div class="bottom">
                <el-button type="primary" size="small" @click="handleDownload(video)">
                  下载视频
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Video {
  id: number
  title: string
  cover: string
  url: string
}

const videos = ref<Video[]>([
  {
    id: 1,
    title: '示例视频1',
    cover: 'https://via.placeholder.com/300x200',
    url: '#'
  },
  {
    id: 2,
    title: '示例视频2',
    cover: 'https://via.placeholder.com/300x200',
    url: '#'
  }
])

const handleDownload = (video: Video) => {
  // TODO: 实现视频下载功能
}
</script>

<style scoped>
.videos {
  padding: 20px;
}

.content {
  margin-top: 20px;
}

.video-cover {
  height: 200px;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style> 