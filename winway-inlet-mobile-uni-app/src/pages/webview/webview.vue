<template>
  <view class="webview-wrap">
    <web-view :webview-styles="webviewStyles" :src="url"></web-view>
  </view>
</template>

<script>
  export default {
    name: "webview",
    data() {
      return {
        webviewStyles: {
          progress: {
            color: '#00FF00'
          },
          url: ""
        }
      }
    },
    onLoad(options) {

      this.url = options.url
    }
  }
</script>
<style lang="stylus">

</style>


