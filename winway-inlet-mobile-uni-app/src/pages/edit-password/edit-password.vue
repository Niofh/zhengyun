<template>
    <view class="edit-password">
        <view class="welcome-text">请输入修改信息！</view>

        <form @submit="formSubmit">


            <view class="my-field">
                <view class="uni-list-cell">
                    <view class="uni-form-item">
                        <view class="my-field_headeer">手机号</view>
                        <view class="uni-input">{{phone}}</view>
                    </view>
                </view>
            </view>

            <view class="my-field">
                <view class="uni-list-cell">
                    <view class="uni-form-item">
                        <view class="my-field_headeer" :class="{'error-color':smsCodeErrorClass}">验证码</view>
                        <input class="uni-input" type="number" v-model="smsCode" name="smsCode" placeholder="请输入验证码"
                               @input="clearInput('smsCode','smsCodeIcon',$event)"/>
                        <view class="button-sp-area">

                            <get-code :phone="phone" code-type="update_password"></get-code>

                        </view>

                    </view>
                </view>
            </view>

            <view class="my-field">
                <view class="uni-list-cell">
                    <view class="uni-form-item">
                        <view class="my-field_headeer" :class="{'error-color':passwordErrorClass}">密码</view>
                        <input class="uni-input" v-model="password" name="password" placeholder="请输入登录密码"
                               :password="showPassword"
                               @input="clearInput('password','passwordIcon',$event)"/>
                        <view class="uni-icon uni-icon-clear" v-show="passwordIcon"
                              @click="onClearIcon('password','passwordIcon')"></view>
                    </view>
                </view>
                <view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']"
                      @click.prevent="onChangePassword('showPassword')"></view>
            </view>

            <view class="my-field">
                <view class="uni-list-cell">
                    <view class="uni-form-item">
                        <view class="my-field_headeer" :class="{'error-color':passwordErrorClass}">确认密码</view>
                        <input class="uni-input" v-model="confirmPassword" name="confirmPassword" placeholder="请输入确认密码"
                               :password="showConfirmPassword"
                               @input="clearInput('confirmPassword','confirmPasswordIcon',$event)"/>
                        <view class="uni-icon uni-icon-clear" v-show="confirmPasswordIcon"
                              @click="onClearIcon('confirmPassword','confirmPasswordIcon')"></view>
                    </view>
                </view>
                <view class="uni-icon uni-icon-eye" :class="[!showConfirmPassword ? 'uni-active' : '']"
                      @click.prevent="onChangePassword('showConfirmPassword')"></view>
            </view>

            <my-button form-type="submit">确认修改</my-button>
        </form>
    </view>
</template>

<script>
    import myButton from "../../components/my-button/my-button"
    import getCode from "../../components/get-code/get-code"
    import inputMixin from "../../common/js/mixins/inputMixin"
    import Validate from "../../common/js/validate/Validate"
    import {USER_INFO} from "../../common/js/const"
    import {editPasswordApi} from "../../api/user"

    export default {
        name: "edit-password",
        mixins: [inputMixin],
        data() {
            return {
                phone: uni.getStorageSync(USER_INFO).mobile,

                password: "",
                passwordIcon: false,
                showPassword: true,
                passwordErrorClass: false,

                confirmPassword: "",
                confirmPasswordIcon: false,
                showConfirmPassword: true,
                confirmPasswordErrorClass: false,

                smsCode: "",  // 短信编码
                smsCodeIcon: false,
                smsCodeErrorClass: false,


            }
        },
        onLoad() {

        },
        methods: {

            onLogin() {

            },
            formSubmit(e) {

                console.log(e)
                const formValue = e.detail.value
                const validate = new Validate(
                    {
                        form: formValue,
                        rules: {

                            password: {
                                required: true,
                                maxlength: 15,
                                minlength: 6
                            },
                            confirmPassword: {
                                required: true,
                            },
                            smsCode: {
                                required: true,
                                digits: true
                            },
                        },
                        messages: {

                            password: {
                                required: "密码不能为空",
                                maxlength: "密码长度不能超过15",
                                minlength: "密码长度不能小于6位"
                            },
                            confirmPassword: {
                                required: "确认密码不能为空",
                            },

                            smsCode: {
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
                if (formValue.password !== formValue.confirmPassword) {
                    uni.showToast({
                        title: "两次密码不一致",
                        icon: "none"
                    })
                    return
                }
                this.editPassword(formValue)
            },

            editPassword(params) {

              uni.showLoading({
                title: "提交中...",
                mask: true
              })
                const _this = this
                editPasswordApi(params).then(res => {
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

    .login-btn-wrap {
        margin-top upx(90)
        padding 0 upx(30)
        .login-btn {
            background-color #1873df
        }
    }


</style>
