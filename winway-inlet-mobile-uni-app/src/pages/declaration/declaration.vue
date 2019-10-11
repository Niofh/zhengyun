<template>
    <view class="pages-declaration">

        <view class="steps">
            <view class="step" :class="{'active':step===0}"></view>
            <view class="line">
                <view class="line-1"></view>
            </view>
            <view class="step" :class="{'active':step===1}"></view>
            <view class="line">
                <view class="line-1"></view>
            </view>
            <view class="step" :class="{'active':step===2}"></view>
        </view>

        <view class="wrap-list" v-show="step===0">
            <form @submit="formSubmit0">
                <view class="wrap-list_content">
                    <view class="item-list">
                        <view class="item">
                            <view class="item-input">
                                <view class="item-name">客户姓名</view>
                                <input placeholder-class="placeholder-class" class="uni-input item-value" name="loanName" v-model="loanName" type="text"
                                       placeholder="请输入客户姓名">
                            </view>
                            <view class="item-tips">客户姓名需与身份证号一致，不一致将被驳回</view>
                        </view>
                        <view class="item">
                            <view class="item-input">
                                <view class="item-name">身份证号</view>
                                <input placeholder-class="placeholder-class"  class=" uni-input item-value" name="loanIdCard" v-model="loanIdCard" type="text"
                                       placeholder="请输入身份证号">
                            </view>
                            <view class="item-tips">请输入18位身份证号码，有字母的以X代替</view>
                        </view>
                        <view class="item textarea">
                            <view class="item-input ">
                                <view class="item-name">备注内容</view>
                            </view>
                            <textarea placeholder-class="placeholder-class"  class="item-textarea" name="remark" v-model="remark" maxlength="20"
                                      placeholder="请输入备注内容"></textarea>
                            <view class="item-tips">最多20个字（选填）</view>
                        </view>
                    </view>
                    <button class="btn" formType="submit">下一步</button>

                </view>
            </form>

        </view>

        <view class="wrap-list" v-show="step===1">
            <form>
                <view class="wrap-list_content">
                    <view class="item-upload">
                        <view class="item-upload-name">客户身份证正面照片</view>
                        <view class="item-upload-btn">
                            <view class="item-wrap" v-show="!frontIDCardUrl" @click="uploadOne('frontIDCardUrl')">
                                <uni-icon type="plusempty" size="52"></uni-icon>
                                <view>人像面照片</view>
                            </view>

                            <view class="img-wrap" v-show="frontIDCardUrl">
                                <image class="img" mode="aspectFill" :src="frontIDCardUrl"></image>
                                <view class="icon" @click="cancelUpload('frontIDCardUrl')">
                                    <uni-icon type="clear" size="30"></uni-icon>
                                </view>
                            </view>
                        </view>
                        <view class="item-tips">请上传清晰的彩色图片，避免遮挡</view>


                        <view class="item-upload-name">客户身份证反面照片</view>
                        <view class="item-upload-btn">
                            <view class="item-wrap" v-show="!reverseIDCardUrl" @click="uploadOne('reverseIDCardUrl')">
                                <uni-icon type="plusempty" size="52"></uni-icon>
                                <view>国徽面照片</view>
                            </view>
                            <view class="img-wrap" v-show="reverseIDCardUrl">
                                <image class="img" :src="reverseIDCardUrl" mode="aspectFill"></image>
                                <view class="icon" @click="cancelUpload('reverseIDCardUrl')">
                                    <uni-icon type="clear" size="30"></uni-icon>
                                </view>
                            </view>
                        </view>
                        <view class="item-tips">请上传清晰的彩色图片，避免遮挡</view>

                    </view>
                    <button class="btn" @click="onStep1">下一步</button>
                </view>
            </form>
        </view>

        <view class="wrap-list" v-show="step===2">
            <view class="wrap-list_content">
                <view class="item-upload">
                    <view class="item-upload-name">客户房产证正面照片</view>
                    <view class="item-upload-btn" v-show="premisesPermitUrl">
                        <view class="img-wrap">
                            <image class="img" :src="premisesPermitUrl" mode="aspectFill"></image>
                            <view class="icon" @click="cancelUpload('premisesPermitUrl')">
                                <uni-icon type="clear" size="30"></uni-icon>
                            </view>
                        </view>
                    </view>


                    <view class="item-upload-btn" v-show="!premisesPermitUrl" @click="uploadOne('premisesPermitUrl')">
                        <view class="item-wrap">
                            <uni-icon type="plusempty" size="52"></uni-icon>
                            <view>上传照片</view>
                        </view>
                    </view>
                    <view class="item-tips">请上传清晰的彩色图片，避免遮挡</view>
                </view>
                <button class="btn" @click="onStep2">提交</button>
            </view>
        </view>
    </view>
</template>

<script>
    import uniIcon from "../../components/uni-icon"
    import Validate from "../../common/js/validate/Validate"
    import {getUploadUrlApi, saveOrderDraftApi, saveOrderFilesApi} from "../../api/product"
    import {uploadFile} from "../../common/js/fileUtils"

    export default {
        name: "declaration",
        data() {
            return {
                step: 0,

                loanName: "",
                loanIdCard: "",
                remark: "",

                orderId: "",         // 订单ID
                frontIDCardUrl: "",  //   身份证正面URL
                reverseIDCardUrl: "",  //  身份证反面URL
                premisesPermitUrl: "",  // 房产证URL

                fileData: { // 上传文件信息
                    ossServiceUrl: ""
                }
            }
        },
        onLoad(options) {
            this.orderId = ""
            if (options.orderId) {  // 如果订单存在
                this.orderId = options.orderId
                this.loanName = options.loanName
                this.loanIdCard = options.loanIdCard
                this.remark = options.remark
                uni.setNavigationBarTitle({
                    title: '继续录入'
                });
            }
            this.getUploadUrl()
        },
        methods: {
            getUploadUrl() {
                getUploadUrlApi().then(res => {
                    if (res.status === this.$SUCCESS_CODE) {
                        this.fileData = res.data
                    }
                })
            },
            formSubmit0(event) {
                console.log(event.detail.value)
                const formValue = event.detail.value
                const validate = new Validate({
                    form: formValue,
                    rules: {
                        loanName: {
                            required: true,

                        },
                        loanIdCard: {
                            required: true,
                            idCard: true
                        }
                    },
                    messages: {
                        loanName: {
                            required: "客户姓名必须填写！",
                        },
                        loanIdCard: {
                            required: "身份证必须填写！",
                            idCard: "身份证格式不正确"
                        }
                    }
                })
                if (!validate.valid()) {
                    const err = validate.getError()
                    console.log(err)
                    uni.showToast({
                        title: err,
                        icon: "none"
                    })
                    return
                }

                this.step = 1
                if (!this.orderId) {
                    this.saveDraft(formValue)  // 不存在才请求订单id
                }
            },

            /*保存草稿*/
            saveDraft(formValue) {
                saveOrderDraftApi(formValue).then(res => {
                    if (res.status === this.$SUCCESS_CODE) {
                        this.orderId = res.data.orderId
                    }
                })
            },

            /*第二步下一步*/
            onStep1() {
                const formValue = {
                    frontIDCardUrl: this.frontIDCardUrl,
                    reverseIDCardUrl: this.reverseIDCardUrl,
                }
                const validate = new Validate({
                    form: formValue,
                    rules: {
                        frontIDCardUrl: {
                            required: true,

                        },
                        reverseIDCardUrl: {
                            required: true,

                        }
                    },
                    messages: {
                        frontIDCardUrl: {
                            required: "身份证正面必传！",
                        },
                        reverseIDCardUrl: {
                            required: "身份证反面必传！",
                        }
                    }
                })
                if (!validate.valid()) {
                    const err = validate.getError()
                    uni.showToast({
                        title: err,
                        icon: "none"
                    })
                    return
                }
                this.step = 2
            },
            onStep2() {
                const formValue = {
                    premisesPermitUrl: this.premisesPermitUrl,
                }

                const validate = new Validate({
                    form: formValue,
                    rules: {
                        premisesPermitUrl: {
                            required: true,
                        },
                    },
                    messages: {
                        premisesPermitUrl: {
                            required: "房产证必传！",
                        },
                    }
                })
                if (!validate.valid()) {
                    const err = validate.getError()
                    uni.showToast({
                        title: err,
                        icon: "none"
                    })
                    return
                }

                if (!this.orderId) {
                    uni.showToast({
                        title: "提交失败，请重新报单",
                        icon: "none"
                    })
                }

                this.saveOrderFiles()
            },
            /*提交订单*/
            saveOrderFiles() {

              uni.showLoading({
                title: "提交中...",
                mask: true
              })
                saveOrderFilesApi({
                    orderId: this.orderId,         // 订单ID
                    frontIDCardUrl: this.frontIDCardUrl,  //   身份证正面URL
                    reverseIDCardUrl: this.reverseIDCardUrl,  //  身份证反面URL
                    premisesPermitUrl: this.premisesPermitUrl,  // 房产证URL
                    loanName: this.loanName,  // 房产证URL
                    loanIdCard: this.loanIdCard,  // 房产证URL
                    remark: this.remark,  // 房产证URL
                }).then(res => {
                    if (res.status === this.$SUCCESS_CODE) {
                        uni.showToast({
                            title: "报单成功",
                            icon: "success",
                            success() {
                                setTimeout(() => {
                                    uni.switchTab({
                                        url: "/pages/index/index"
                                    })
                                }, 2000)
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
            },


            /**
             * 上传方法单张方法
             * @param name 图片地址名称
             */
            uploadOne(name) {
                const _this = this
                uploadFile({
                    count: 1,
                    url: _this.fileData.ossServiceUrl,
                    formData: {
                        appid: _this.fileData.appid,
                        appsecret: _this.fileData.appsecret,
                    },
                    chooseSuccess(tempFilePaths, tempFiles) {

                    },
                    serverSuccess(data) {
                        if (data.data) {
                            _this[name] = data.data[0].url
                        }
                    }
                })
            },
            /**
             * 上传多张
             * @param name 图片地址名称
             */
            uploadMulti(name) {
                const _this = this
                uploadFile({
                    count: 9,
                    url: _this.fileData.ossServiceUrl,
                    formData: {
                        appid: _this.fileData.appid,
                        appsecret: _this.fileData.appsecret,
                    },
                    chooseSuccess(tempFilePaths, tempFiles) {

                    },
                    serverSuccess(data) {
                        if (data.data) {
                            console.log(data.data)
                            //_this[name] = data.data[0].url
                        }
                    }
                })
            },
            /*删除图片*/
            cancelUpload(name) {
                this[name] = ""
            }

        },
        components: {
            uniIcon
        }
    }
</script>
<style lang="stylus">
    page {
        background-color #0346c4
    }
</style>

<style lang="stylus" scoped>

    @import "../../common/css/util.styl"

    .steps {
        width 60%
        margin 0 auto
        padding-top upx(35)
        display flex
        .line {
            flex 1
            .line-1 {
                margin-top upx(12)
                width 100%
                height upx(1)
                background-color #04338f
            }
        }
        .step {
            width: upx(20)
            height: upx(20)
            border-radius 50%
            border upx(4) solid #04338f
            background-color: #04338f
            &.active {
                background-color: #1975e0
                border-color #ffffff
            }
        }
    }

    .wrap-list {
        padding upx(36)
    }

    .wrap-list_content {
        background-color #ffffff
        border-radius upx(10)
        .btn {
            background-color #ffffff
            border-radius 0
            &.active {
                color #1975e0
            }
            &::after {
                border-radius 0
                border-bottom 0
            }
        }
        padding-bottom upx(10)
    }

    .item-list {
        padding upx(36)
    }

    .item {
        margin-bottom upx(56)
        .item-input {
            display flex
            padding-bottom upx(40)
            border-bottom upx(1) solid #efefef
            background-color #ffffff
            .item-name {
                width: upx(200)
                line-height upx(54)
                color: #353535
                font-size: upx(30)
                font-weight 600
            }
            .item-value {
                padding 0
            }

        }
        .item-tips {
            margin-top upx(16)
            font-size: upx(24)
            color: #a7a7a7
        }
        &.textarea {
            .item-input {
                border none
            }
        }
        .item-textarea {
            width 100%
            height upx(80)
            border-bottom upx(1) solid #efefef
        }

    }

    .item-upload {
        padding upx(30)
        padding-top upx(10)
        .item-upload-name {
            margin-top upx(60)
            margin-bottom upx(38)
            color: #353535
            font-size: upx(30)
            font-weight 600
        }
        .item-upload-btn {
            margin-top upx(10)
            width 100%
            height upx(316)
            border upx(1) dashed #dddddd
            text-align center
            color #a7a7a7
            .item-wrap {
                padding upx(105) 0

            }
            .img-wrap {
                position relative
                .icon {
                    position absolute
                    top: upx(10)
                    right: upx(10)

                }
            }
            .img {
                width 100%
                height upx(316)
            }

        }
        .item-tips {
            margin-top upx(16)
            font-size: upx(24)
            color: #a7a7a7
        }
    }
</style>
