<template>
    <view>
        <view class="list-swiper" v-for="(item,index) in list" :key="index">
            <view class="uni-list-cell my-list-cell"
                  :style="item.left"
                  @click="onClick(item)"
                  @touchstart="onTouchStart(item,$event)"
                  @touchmove="onTouchMove(item,index,$event)"
                  @touchend="onTouchEnd(item,$event)"
            >
                <view class="uni-list-cell-navigate uni-navigate-right uni-media-list">
                    <view class="uni-media-list-logo">
                        <image class="logo-img" :src="item.img"></image>
                    </view>
                    <view class="uni-media-list-body">
                        <view class="uni-media-list-text-top">{{item.title}}</view>
                        <view class="uni-media-list-text-bottom uni-ellipsis">{{item.content}}</view>
                    </view>
                </view>
            </view>

            <view ref="del" class="my-cell-del list-swiper__del" :style="item.left" @click="onDelete(item,index)">删除
            </view>
        </view>
    </view>

</template>

<script>


    export default {
        name: "list-swiper",
        props: {
            list: Array  // [{id,img,title,content,left}]
        },
        data() {
            return {
                startX: 0,
                moveX: 0,
                delWidth: 0, // 删除按钮默认是65
                flagMove: null
            }
        },

        methods: {
            getDelWidth() {
                const preFix = "list-swiper__del"
                const selectorQuery = uni.createSelectorQuery()
                const delSelect = selectorQuery.select("." + preFix)
                delSelect.boundingClientRect(data => {
                    // 获取删除按钮的宽度，此宽度为滑块左滑的最大距离
                    this.delWidth = data.width
                }).exec()
            },
            onTouchStart(item, ev) {

                // #ifdef  H5
                ev.preventDefault()
                // #endif

                // tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
                if (ev.touches && ev.touches.length === 1) {
                    this.getDelWidth()
                    // 记录开始位置
                    this.startX = ev.touches[0].clientX
                }
            },
            onTouchMove(item, index, ev) {
                // #ifdef  H5
                ev.preventDefault()
                // #endif


                // 获取删除按钮的宽度，此宽度为滑块左滑的最大距离

                if (this.flagMove) {
                    this.flagMove.left = 'transform:translateX(0px)'
                    this.flagMove = item
                }


                if (ev.touches && ev.touches.length === 1) {
                    // 滑动时距离浏览器左侧实时距离
                    this.moveX = ev.touches[0].clientX
                    // 起始位置减去 实时的滑动的距离，得到手指实时偏移距离
                    this.disX = this.startX - this.moveX
                    // console.log("this.disX", this.disX,)

                    // 如果是向右滑动或者不滑动，不改变滑块的位置
                    console.log(this.disX)
                    if (-20 < this.disX < -30) {
                        item.left = 'transform:translateX(0px)'
                        // 大于0，表示左滑了，此时滑块开始滑动

                    } else if (this.disX > 30) {
                        // 具体滑动距离我取的是 手指偏移距离*5。
                        item.left = 'transform:translateX(-' + this.disX * 2 + 'px)'
                        this.flagMove = null
                        // 最大也只能等于删除按钮宽度
                        if (this.disX * 2 >= this.delWidth) {
                            item.left = 'transform:translateX(-' + this.delWidth + 'px)'
                            this.flagMove = item
                        }
                    }
                }


            },


            onTouchEnd(item, ev) {

                // #ifdef  H5
                ev.preventDefault()
                // #endif

                // 防止滚动时候出现删除按钮
                if (ev.touches && ev.touches.length === 1) {
                    let endX = ev.touches[0].clientX
                    this.disX = this.startX - endX
                    // 如果距离小于删除按钮一半,强行回到起点
                    if ((this.disX * 2) < (this.delWidth / 2)) {
                        item.left = 'transform:translateX(0px)'
                        this.flagMove = null
                    } else {
                        // 大于一半 滑动到最大值
                        item.left = 'transform:translateX(-' + this.delWidth + 'px)'
                        this.flagMove = item
                    }
                }
            },
            onClick(item) {
                this.$emit("click", item)
            },
            onDelete(item, index) {

                this.$emit("delete", {item: item, index: index})
            },

        },
        components: {}
    }
</script>

<style lang="stylus" scoped>

    @import "../../common/css/util.styl"
    .list-swiper {
        position relative
        height upx(164)
        overflow hidden
    }

    .my-list-cell {
        transition: 0.3s; // 过度动画
    }

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

    .my-cell-del {
        position absolute
        top: 0
        right: upx(-130)
        width upx(130)
        height 100%
        line-height upx(164)
        text-align center
        background-color #eb4141
        color #ffffff
        transition: 0.3s; // 过度动画
    }
</style>
