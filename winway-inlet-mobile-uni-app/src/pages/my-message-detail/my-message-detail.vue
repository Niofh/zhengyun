<template>
    <view class="my-message-detail">
        <view class="message-wrap">
            <view class="header">
                <view class="name">消息发送时间</view>
                <view class="date">{{msg.createTime}}</view>
            </view>
            <view class="body">
                {{msg.content}}
            </view>
        </view>
        <!--<my-button>立即查看</my-button>-->
    </view>
</template>

<script>
    import myButton from "../../components/my-button/my-button"
    import {getMessagefindByIdApi} from "../../api/my-message"

    export default {
        name: "my-message-detail",
        data() {
            return {
                msg: {}
            }
        },
        onLoad(options) {

            this.getMsg(options.id)
        },
        methods: {
            getMsg(id) {
                getMessagefindByIdApi({id}).then(res => {
                    if (res.status === this.$SUCCESS_CODE) {
                        this.msg = res.data || {}
                    }
                })
            }
        },

        components: {
            myButton
        }
    }
</script>

<style lang="stylus">
    page {
        background #ffffff
    }
</style>
<style lang="stylus" scoped>

    .message-wrap {
        @import "../../common/css/util.styl"
        margin-top upx(55)
        padding 0 upx(40)
        .header {
            display flex
            justify-content space-between
            font-size: upx(32)
            padding-bottom upx(27)
            border-bottom upx(1) solid #e7e7e7
            .name {
                font-weight bold
            }
            .date {
                color: "#999999"
                font-size: upx(26)
            }
        }
        .body {
            margin-top upx(36)
            font-size: upx(30)
            line-height: upx(52)
            color: "#000000"
        }
    }

</style>
