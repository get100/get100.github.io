<template>
  <div class="voice-assistant-container">
    <div class="glass-panel">
      <iframe
        id="audio_iframe"
        src="https://widget.synthflow.ai/widget/v2/1732002773766x418068235674851000/1732002773679x435848946421054000"
        allow="microphone"
        width="400"
        height="600"
        scrolling="no"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoiceAssistant',
}
</script>

<style scoped>
.voice-assistant-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.glass-panel {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: transform 0.3s ease;
}

.glass-panel:hover {
  transform: translateY(-5px);
}

iframe {
  border: none;
  border-radius: 16px;
  background: transparent;
}
</style> 