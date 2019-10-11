<template>
    <view class="search">
        <view class="search-wrap">
            <view class="icon-wrap">
                <uni-icon class="icon" type="search" size="24"></uni-icon>
            </view>
            <view class="input-wrap">
                <input class="uni-input input" type="text" confirm-type="search" :placeholder="placeholder"
                       :value="value"
                       @input="onInput" @confirm="onConfirm">
                <text v-show="value.length" class="clear" @click.stop="onClear">取消</text>
            </view>
        </view>
    </view>
</template>

<script>
    import uniIcon from "../../components/uni-icon"

    export default {
        name: "search-input",
        props: {
            placeholder: String,
            value: [String, Number]
        },
        methods: {
            onInput(e) {
                this.$emit("input", e.target.value)
            },
            onConfirm(e) {
                this.$emit("confirm", e.target.value)
            },
            onClear() {
                this.$emit("input", "")
            },
        },
        components: {
            uniIcon
        }
    }
</script>


<style lang="stylus" scoped>
    @import "../../common/css/util.styl"
    .search {
        padding upx(20) 0
        .search-wrap {
            position relative
            padding upx(0) upx(30)
            color: #999999
            .icon-wrap {
                position absolute
                z-index 100

                /* #ifdef  MP-WEIXIN*/
                top upx(6)
                left upx(34)
                /* #endif */

                /* #ifdef  H5*/
                left upx(36)
                top upx(10)
                /* #endif */

            }
            .input-wrap {
                display flex
            }
            .input {
                background-color #ffffff
                flex 1
                color #000
                padding upx(4) 0 upx(4) upx(66)

            }
            .clear {
                padding-left upx(10)
                line-height upx(56)
                color #0A98D5
                font-size upx(30)
            }
        }

    }
</style>
