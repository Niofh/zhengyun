<template>
    <view class="of-not-data" :style="{marginTop:mt}">
        <image class="image" src="../../static/image/nodata.png" alt="暂无数据"></image>
        <view class="desc margin-top">{{text}}</view>
    </view>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                default: '暂无数据'
            },
            marginTop: String
        },
        computed: {
            mt() {
                return uni.upx2px(this.marginTop) + 'px'
            }
        },
    };
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/css/util.styl"
    .of-not-data {
        width 100%
        text-align center
        .desc {
            margin-top upx(10)
            color #cccccc
            text-align center
            font-size upx(20)
        }
        .image {
            width upx(260)
            height upx(196)
        }
    }
</style>
