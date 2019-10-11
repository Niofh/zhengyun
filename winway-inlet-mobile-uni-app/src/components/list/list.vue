<template>

    <view class="uni-list-cell"
          hover-class="uni-list-cell-hover" :hover-start-time="120" :hover-stay-time="30"
          @click="onClick()"
          @touchstart="onTouchStart($event)"
          @touchmove="onTouchMove($event)"
          @touchend="onTouchEnd($event)"
    >
        <view class="uni-list-cell-navigate uni-navigate-right uni-media-list">
            <view class="uni-media-list-logo">
                <image class="logo-img" :src="imgSrc"></image>
            </view>
            <view class="uni-media-list-body">
                <view class="uni-media-list-text-top">{{title}}</view>
                <view class="uni-media-list-text-bottom uni-ellipsis">{{content}}</view>
            </view>
        </view>
    </view>


</template>

<script>
    export default {
        name: "list",
        props: {
            imgSrc: String,
            title: String,
            content: String,
        },
        methods: {
            onClick() {
                this.$emit("click")
            },
            onTouchStart(e) {
                this.$emit("touchstart", e)
            },
            onTouchMove(e) {
                this.$emit("touchmove", e)
            },
            onTouchEnd(e) {
                this.$emit("touchend", e)
            }
        }
    }
</script>


<style lang="stylus" scoped>
    @import "../../common/css/util.styl"


    .uni-media-list-logo {
        width upx(120)
        height upx(120)
        .logo-img {
            border-radius 50%
        }
    }

    .uni-media-list-text-top {
        font-weight 600
    }


</style>
