<template>
    <view class="register">
        <view class="welcome-text">请填写以下信息注册</view>

        <form @submit="formSubmit">

            <view class="my-field">
                <view class="uni-list-cell">
                    <view class="uni-form-item">
                        <view class="my-field_headeer" :class="{'error-color':nameErrorClass}">姓名</view>
                        <input class="uni-input" type="text" v-model="name"
                               placeholder="请输入姓名"
                               name="name"
                               @input="clearInput('name','nameIcon',$event)"/>
                        <view class="uni-icon uni-icon-clear" v-show="nameIcon"
                              @click="onClearIcon('name','nameIcon')"></view>
                    </view>
                </view>
            </view>

            <view class="my-field">
                <view class="uni-list-cell">
                    <view class="uni-form-item">
                        <view class="my-field_headeer" :class="{'error-color':phoneErrorClass}">手机号</view>
                        <input class="uni-input error-input-color" type="number" v-model="phone" name="phone"
                               placeholder="请输入手机号"
                               @input="clearInput('phone','phoneIcon',$event)"/>
                        <view class="uni-icon uni-icon-clear" v-show="phoneIcon"
                              @click="onClearIcon('phone','phoneIcon')"></view>
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

                            <get-code :phone="phone"></get-code>

                        </view>

                    </view>
                </view>
            </view>

            <view class="my-field">
                <view class="uni-list-cell">
                    <view class="uni-form-item">
                        <view class="my-field_headeer" :class="{'error-color':passwordErrorClass}">登录密码</view>
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


            <view class="my-field">
                <view class="uni-list-cell">
                    <view class="uni-form-item">
                        <view class="my-field_headeer" :class="{'error-color':channelNumErrorClass}">渠道编码</view>
                        <input class="uni-input" type="text" v-model="channelNum" name="channelNum"
                               placeholder="请输入渠道编码"
                               @input="clearInput('channelNum','channelNumIcon',$event)"/>
                        <view class="uni-icon uni-icon-clear" v-show="channelNumIcon"
                              @click="onClearIcon('channelNum','channelNumIcon')"></view>
                    </view>
                </view>
            </view>
            <view class="check-wrap">
                <view class="checkbox-wrap">
                    <checkbox-group name="checkbox">
                        <label class="user-xieyi">
                            <checkbox class="checkbox" name="checkbox" value="true" color="#007aff"/>
                            已阅读并同意
                        </label>
                    </checkbox-group>
                </view>

                <view class="navigator">
                    <navigator url="/pages/regist-agree/regist-agree">《用户协议》</navigator>

                </view>
            </view>
            <my-button form-type="submit">注册</my-button>
        </form>
        <yu-toast
                :message="message"
                verticalAlign="center"
                ref="toast"
        ></yu-toast>
    </view>
</template>

<script>

    import inputMixin from "../../common/js/mixins/inputMixin"
    import myButton from "../../components/my-button/my-button"
    import getCode from "../../components/get-code/get-code"
    import yuToast from "../../components/yu-toast/yu-toast"
    import {SUCCESS_CODE} from "../../common/js/const"
    import {registerApi} from "../../api/user"
    import Validate from "../../common/js/validate/Validate"

    export default {
        name: "register",
        mixins: [inputMixin],
        data() {
            return {
                name: "",
                nameIcon: false,
                nameErrorClass: false,

                phone: "",
                phoneIcon: false,
                phoneErrorClass: false,

                password: "",
                passwordIcon: false,
                showPassword: true,
                passwordErrorClass: false,

                confirmPassword: "",
                confirmPasswordIcon: false,
                showConfirmPassword: true,
                confirmPasswordErrorClass: false,

                channelNum: "",  // 渠道编码
                channelNumIcon: false,
                channelNumErrorClass: false,

                smsCode: "",  // 短信编码
                smsCodeIcon: false,
                smsCodeErrorClass: false,

                message: ""
            }
        },
        methods: {

            // 获取数据
            formSubmit(e) {
                console.log(e)
                const formValue = e.detail.value
                const validate = new Validate(
                    {
                        form: formValue,
                        rules: {
                            name: {
                                required: true,
                                maxlength: 15,
                            },
                            phone: {
                                required: true,
                                phone: true,
                            },
                            password: {
                                required: true,
                                maxlength: 15,
                                minlength: 6
                            },
                            confirmPassword: {
                                required: true,
                            },
                            channelNum: {
                                required: true,
                            },
                            smsCode: {
                                required: true,
                                digits: true
                            },
                        },
                        messages: {
                            name: {
                                required: "姓名不能为空",
                                maxlength: "姓名长度不能超过15",
                            },
                            phone: {
                                required: "手机号不能为空",
                                phone: "手机号格式不正确",
                            },
                            password: {
                                required: "密码不能为空",
                                maxlength: "密码长度不能超过15",
                                minlength: "密码长度不能小于6位"
                            },
                            confirmPassword: {
                                required: "确认密码不能为空",
                            },
                            channelNum: {
                                required: "渠道编码不能为空",

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
                    // uni.showToast({
                    //     title: err,
                    //     icon: "none"
                    // })
                    this.message = err
                    this.$refs.toast.show()
                    return
                }
                if (formValue.password !== formValue.confirmPassword) {
                    // uni.showToast({
                    //     title: "两次密码不一致",
                    //     icon: "none"
                    // })

                    this.message = "两次密码不一致"
                    this.$refs.toast.show()
                    return
                }

                if (formValue.checkbox.length === 0) {
                    // uni.showToast({
                    //     title: "需要勾选用户协议",
                    //     icon: "none"
                    // })
                    this.message = "需要勾选用户协议"
                    this.$refs.toast.show()
                    return
                }
                this.register(formValue)
            },

            // 注册
            register(formValue) {

                uni.showLoading({
                    title: "加载中...",
                    mask: true,
                })

                registerApi(formValue).then(res => {
                    console.log(res)
                    uni.hideLoading()
                    if (res.status === SUCCESS_CODE) {
                        const data = res.data

                        // 注册成功并且登录成功
                        this.$store.commit("login", data)
                        uni.switchTab({
                            url: "/pages/index/index"
                        })
                    } else {
                        uni.showToast({
                            title: res.msg,
                            icon: "none"
                        })
                    }

                }).catch(res => {
                    uni.hideLoading()
                })
            }

        },
        components: {
            myButton,
            getCode,
            yuToast
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

    .check-wrap {
        display flex
        padding upx(30)
        background #ffffff
        .checkbox-wrap{
            flex 0 0 upx(250)
        }
        .navigator{
            flex 1
            color #0A98D5
            padding upx(6) 0
        }
    }

    .user-xieyi {
        padding-top upx(10)
    }


</style>
