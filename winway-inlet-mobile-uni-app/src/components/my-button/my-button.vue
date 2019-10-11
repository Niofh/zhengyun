<template>
  <view class="my-button">
    <button class="btn" :disabled="disabled" :formType="formType" type="primary" @click="onClick"
            :style="{marginTop: mt}">
      <slot></slot>
    </button>
  </view>
</template>

<script>
  export default {
    name: "my-button",
    props: {
      marginTop: {
        type: Number,
        default: 80
      },
      formType: {
        type: String
      },
      disabled: Boolean
    },
    computed: {
      mt() {
        return uni.upx2px(this.marginTop) + 'px'
      }
    },
    methods: {
      onClick() {
        this.$emit("click")
      }
    }
  }
</script>
<style lang="stylus">
  @import "../../common/css/util.styl"
  .my-button {
    padding 0 upx(30)
    .btn {
      background-color #1873df
    }
  }

</style>


