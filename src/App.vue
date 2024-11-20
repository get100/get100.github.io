<template>
  <div id="app">
    <VoiceAssistant />
  </div>
</template>

<script>
import VoiceAssistant from './components/VoiceAssistant.vue'

export default {
  name: 'App',
  components: {
    VoiceAssistant
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  min-height: 100vh;
}
</style>
