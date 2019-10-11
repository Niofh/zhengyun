<template>
    <view class="my-profile">
        <view class="welcome-text">个人资料</view>
        <form @submit="formSubmit" class="form-group w_200">
            <view class="my-field">
                <view class="uni-list-cell">
                    <view class="uni-form-item">
                        <view class="my-field_headeer">姓名</view>
                        <text class="uni-input">{{userName}}</text>
                    </view>
                </view>
            </view>
            <view class="my-field">
                <view class="uni-list-cell">
                    <view class="uni-form-item">
                        <view class="my-field_headeer ">当前手机号</view>
                        <text class="uni-input">{{oldPhone}}</text>
                    </view>
                </view>
            </view>
            <view class="my-field">
                <view class="uni-list-cell">
                    <view class="uni-form-item">
                        <view class="my-field_headeer" :class="{'error-color':newPhoneErrorClass}">新手机号</view>
                        <input class="uni-input" type="number" v-model="newPhone" name="newPhone" placeholder="请输入新手机号"
                               @input="clearInput('newPhone','newPhoneIcon',$event)"/>
                        <view class="uni-icon uni-icon-clear" v-show="newPhoneIcon"
                              @click="onClearIcon('newPhone','newPhoneIcon')"></view>
                    </view>
                </view>
            </view>

            <view class="my-field">
                <view class="uni-list-cell">
                    <view class="uni-form-item">
                        <view class="my-field_headeer" :class="{'error-color':codeErrorClass}">验证码</view>
                        <input class="uni-input" type="number" v-model="code" name="code" placeholder="请输入验证码"

                               @input="clearInput('code','codeIcon',$event)"/>
                        <view class="button-sp-area">
                            <get-code ref="getCode" :phone="newPhone" code-type="security_mobile"></get-code>
                        </view>

                    </view>
                </view>
            </view>

            <view class="my-field">
                <view class="uni-list-cell">
                    <view class="uni-form-item">
                        <view class="my-field_headeer">渠道编码</view>
                        <text class="uni-input">{{channelNum}}</text>
                    </view>
                </view>
            </view>

            <my-button form-type="submit">确认修改</my-button>
        </form>

    </view>
</template>

<script>
    import myButton from "../../components/my-button/my-button"
    import inputMixin from "../../common/js/mixins/inputMixin"
    import getCode from "../../components/get-code/get-code"
    import {USER_INFO} from "../../common/js/const"
    import {getUserInfoApi, updatePhoneApi} from "../../api/user"
    import Validate from "../../common/js/validate/Validate"


    export default {
        name: "my-profile",
        mixins: [inputMixin],
        data() {
            const userInfo = uni.getStorageSync(USER_INFO)
            console.log(userInfo)
            return {
                userName: userInfo.userName,
                oldPhone: userInfo.mobile,
                channelNum: userInfo.channelNum,


                newPhone: "",
                newPhoneIcon: false,
                newPhoneErrorClass: false,

                code: "",
                codeIcon: false,
                codeErrorClass: false,

            }
        },
        onLoad() {

            if (!this.channelNum) {
                getUserInfoApi().then(res => {
                    if (res.status === this.$SUCCESS_CODE) {
                        this.channelNum = res.data.channelNum

                    }
                })
            }

        },
        methods: {

            formSubmit(e) {
                console.log(e)
                const formValue = e.detail.value

                const validate = new Validate(
                    {
                        form: formValue,
                        rules: {
                            newPhone: {
                                required: true,
                                phone: true,
                            },
                            code: {
                                required: true,
                                digits: true
                            },

                        },
                        messages: {

                            newPhone: {
                                required: "手机号不能为空",
                                phone: "手机号格式不正确",
                            },
                            code: {
                                required: "验证码不能为空",
                                digits: "短信格式不正确"
                            },
                        }

                    }
                )

                if (this.errorKey) {
                    this[this.errorKey + "ErrorClass"] = false
                }
                if (!validate.valid()) { // 表单验证
                    const err = validate.getError()
                    this.errorKey = validate.getKey()
                    this[this.errorKey + "ErrorClass"] = true
                    uni.showToast({
                        title: err,
                        icon: "none"
                    })
                    return
                }
                formValue.oldPhone = this.oldPhone
                this.updatePhone(formValue)
            },
            updatePhone(params) {
                const _this = this
              uni.showLoading({
                title: "提交中...",
                mask: true
              })
                updatePhoneApi(params).then(res => {
                    if (res.status === this.$SUCCESS_CODE) {
                        uni.showToast({
                            title: "修改成功",
                            icon: "success",
                            success() {
                                _this.$store.dispatch("logout")
                            }
                        })
                    } else {
                        uni.showToast({
                            title: res.msg,
                            icon: "none"
                        })
                    }
                }).catch(() => {
                  uni.hideLoading()
                })

            }

        },
        onUnload() {

        },
        components: {
            myButton,
            getCode
        }
    }
</script>
<style lang="stylus">
    page {
        background #ffffff
    }
</style>

<style lang="stylus" scoped>
    @import "../../common/css/util.styl"
    .welcome-text {
        padding upx(30) upx(30)
        font-size: upx(28)
        color #9aa7c0
        background-color #efeff4
    }


</style>
