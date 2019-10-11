<template>
    <view class="get-code">
        <button class="code-btn" type="default" size="mini" @click="onClick" :disabled="disabled">{{codeName}}</button>
    </view>
</template>

<script>
    import {sendSmsCodeApi} from "../../api/user"

    const CODE_NAME = '获取验证码'
    export default {
        name: "get-code",
        props: {
            number: {
                type: Number,
                default: 60
            },
            url: String,
            phone: String,
            errorMsg: {
                type: String,
                default: "手机号格式不正确"
            },
            codeType: {
                type: String,
                default: "default"
            }, // 验证码类型 default（默认：注册）、login ：登录、security_mobile：安全(变更手机号码)
        },
        data() {
            return {
                codeName: CODE_NAME,
                disabled: false,
                time: null
            }
        },
        methods: {
            onClick() {

                if (!/^1\d{10}$/.test(this.phone)) {
                    uni.showToast({
                        title: this.errorMsg,
                        icon: "none"
                    })
                    return
                }
                this.getCodeAjax()
            },

            setInterval() {
                let num = this.number
                this.clearInterval()
                this.disabled = true
                this.codeName = num + "秒重新获取"

                this.time = setInterval(() => {
                    num--
                    this.codeName = num + "秒重新获取"
                    if (num <= 0) {
                        this.clearInterval()
                    }
                }, 1000)
            },
            getCodeAjax() {
                sendSmsCodeApi(this.url, this.phone, this.codeType).then(res => {
                    console.log(res)
                    if (res.status === this.$SUCCESS_CODE) {
                        this.setInterval()
                    }

                })
            },
            clearInterval() {
                this.disabled = false
                this.codeName = CODE_NAME
                clearInterval(this.time)
            }
        }
    }
</script>


<style lang="stylus" scoped>

</style>
