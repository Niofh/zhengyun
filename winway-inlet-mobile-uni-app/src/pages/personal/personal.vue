<template>
    <view class="pages-personal">
        <view class="my-avatar">
            <image class="bg-img" src="../../static/image/banner-bg@3x.png"></image>
            <view class="avatar-wrap">
                <image class="avatar-url" src="../../static/image/avatar.jpg"></image>
                <view class="name">{{userName}}</view>
            </view>
        </view>

        <view class=" mar-top40">
            <my-cell-group>
                <my-cell title="我的消息" is-link is-badge
                         @click="navigateTo('/my-message/my-message')"
                >
                    <uni-badge :text="msgNumber" type="danger"></uni-badge>
                </my-cell>


                <my-cell title="关于我们" is-link
                         @click="navigateTo('/about-us/about-us')"
                ></my-cell>

                <my-cell title="修改登录密码" is-link
                         @click="navigateTo('/edit-password/edit-password')"
                ></my-cell>

                <my-cell title="个人资料" is-link
                         @click="navigateTo('/my-profile/my-profile')"
                ></my-cell>
            </my-cell-group>

        </view>

        <view class="mar-top40">
            <my-cell-group>
                <my-cell title="客服电话">
                    <text class="phone" @click.stop="makePhoneCall('400-880-0101')">400-880-0101</text>
                </my-cell>
                <my-cell title="退出登录" is-link
                         @click="logout()"
                ></my-cell>
            </my-cell-group>
        </view>

    </view>
</template>

<script>

    import uniBadge from "../../components/uni-badge.vue"
    import myCell from "../../components/cell/cell.vue"
    import myCellGroup from "../../components/cell-group/cell-group.vue"
    import {USER_INFO} from "../../common/js/const"
    import {getAgentMessageStatusApi} from "../../api/my-message"


    export default {
        name: "personal",
        data() {

            return {
                userName: this.$store.state.user.username || uni.getStorageSync(USER_INFO).userName,
                msgNumber: 0,
                isOne: true,   // 是否第一次加载
            }
        },
        onLoad() {

            this.getAgentMessageStatus()
        },
        onShow() {
            if (!this.isOne) {
                this.getAgentMessageStatus()
            }
        },
        methods: {
            navigateTo(url) {
                uni.navigateTo({
                    url: "/pages" + url
                })
            },
            makePhoneCall(phone) {
                uni.makePhoneCall({
                    phoneNumber: phone //仅为示例
                });
            },
            logout() {
                const _this = this
                uni.showModal({
                    title: "提示",
                    content: "是否退出登录？",
                    success(obj) {
                        if (obj.confirm) {
                            _this.$store.dispatch("logout")
                        }
                    }
                })

            },
            getAgentMessageStatus() {
                getAgentMessageStatusApi().then(res => {
                    this.isOne = false
                    if (res.status === this.$SUCCESS_CODE) {
                        this.msgNumber = res.data
                    }
                })
            }
        },
        components: {
            uniBadge,
            myCell,
            myCellGroup
        }
    }
</script>


<style lang="stylus" scoped>
    @import "../../common/css/util.styl"

    .my-avatar {
        height upx(332)
    }

    .bg-img {
        position absolute
        width 100%
        height upx(332)
    }

    .avatar-wrap {
        position relative
        top upx(56)
        z-index 1
        color #ffffff
        text-align center
        .avatar-url {
            width upx(160)
            height upx(160)
            border-radius 50%
            border upx(5) solid #ffffff
        }
        .name {
            margin-top upx(35)
            font-size upx(28)
        }
    }

    .phone {
        color #0448c5
    }


</style>
