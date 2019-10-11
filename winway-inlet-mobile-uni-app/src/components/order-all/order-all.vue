<template>
    <view class="order-all">
        <view class="item-list">
            <view class="item item-header of-1px-bottom">
                <view class="item-left">基本信息</view>
                <view class="item-right"></view>
                <view class="item-icon" @click="onToggle('toggle0')">
                    <uni-icon :type="toggle0?'arrowdown':'arrowup'" size="24"></uni-icon>
                </view>
            </view>

            <block>
                <view class="block-detail" v-show="toggle0">
                    <view class="item">
                        <view class="item-left">订单编号：</view>
                        <view class="item-right">{{orderInfo.orderNum}}</view>
                    </view>
                    <view class="item">
                        <view class="item-left">客户姓名：</view>
                        <view class="item-right">{{orderInfo.loanName}}</view>
                    </view>


                    <view class="image-list ">
                        <view class="item ">
                            <view class="item-left">身份证：</view>
                            <view class="item-right">
                                <scroll-view scroll-x>
                                    <view class="scroll-list">
                                        <image class="image" v-for="(img,index) in cardList" :key="index"
                                               :src="img" @click="onLookImg(img,cardList)"></image>
                                    </view>

                                </scroll-view>

                            </view>
                        </view>
                        <view class="item ">
                            <view class="item-left">房产证：</view>
                            <view class="item-right">
                                <scroll-view scroll-x>
                                    <view class="scroll-list">

                                        <image class="image" v-for="(img,index) in houseList" :key="index" :src="img"
                                               @click="onLookImg(img,houseList)"></image>

                                    </view>

                                </scroll-view>

                            </view>
                        </view>

                    </view>

                    <view class="item">
                        <view class="item-left">备注：</view>
                        <view class="item-right ">
                            {{orderInfo.remark}}
                        </view>
                    </view>

                </view>

            </block>
        </view>


        <view class="item-list" v-if="orderInfo.orderStatus>=orderStatus.YI_PING_GU">
            <view class="block"></view>
            <view class="item item-header of-1px-bottom">
                <view class="item-left">评估信息</view>
                <view class="item-right"></view>
                <view class="item-icon" @click="onToggle('toggle')">
                    <uni-icon :type="toggle?'arrowdown':'arrowup'" size="24"></uni-icon>
                </view>
            </view>

            <block>
                <view class="block-detail" v-show="toggle">
                    <view class="item">
                        <view class="item-left">最大可贷金额：</view>
                        <view class="item-right red">{{orderInfo.maxLoanMoney}} 元</view>
                    </view>

                </view>
            </block>


        </view>


        <view class="item-list" v-if="orderInfo.orderStatus===orderStatus.YI_FOU_JUE">
            <view class="block"></view>
            <view class="item item-header of-1px-bottom">
                <view class="item-left">已否决</view>
                <view class="item-right"></view>
                <view class="item-icon" @click="onToggle('toggle5')">
                    <uni-icon :type="toggle5?'arrowdown':'arrowup'" size="24"></uni-icon>
                </view>
            </view>

            <block>
                <view class="block-detail" v-show="toggle5">
                    <view class="item" v-if="orderInfo.vetoRemark">
                        <view class="item-left">否决信息：</view>
                        <view class="item-right ">{{orderInfo.vetoRemark}}</view>
                    </view>
                </view>
            </block>


        </view>


        <view class="item-list" v-if="yueyueInfoShow">
            <view class="block"></view>
            <view class="item item-header of-1px-bottom">
                <view class="item-left">预约信息</view>
                <view class="item-right"></view>
                <view class="item-icon" @click="onToggle('toggle1')">
                    <uni-icon :type="toggle1?'arrowdown':'arrowup'" size="24"></uni-icon>
                </view>
            </view>

            <block>
                <view class="block-detail" v-show="toggle1">
                    <view class="item">
                        <view class="item-left">客户姓名：</view>
                        <view class="item-right ">{{orderInfo.loanName}}</view>
                    </view>

                    <view class="item">
                        <view class="item-left">客户电话：</view>
                        <view class="item-right ">{{orderInfo.customerPhone}}</view>
                    </view>
                    <view class="item">
                        <view class="item-left">尽调地址：</view>
                        <view class="item-right ">{{orderInfo.researchAddress}}</view>
                    </view>
                    <view class="item">
                        <view class="item-left">尽调时间：</view>
                        <view class="item-right ">{{orderInfo.bespeakTime}}</view>
                    </view>
                </view>
            </block>


        </view>


        <view class="item-list" v-if="jintiaoInfoShow">
            <view class="block"></view>

            <view class="item item-header of-1px-bottom">
                <view class="item-left">尽调人信息</view>
                <view class="item-right"></view>
                <view class="item-icon" @click="onToggle('toggle2')">
                    <uni-icon :type="toggle2?'arrowdown':'arrowup'" size="24"></uni-icon>
                </view>
            </view>

            <block>
                <view class="block-detail" v-show="toggle2">
                    <view class="item">
                        <view class="item-left">尽调人：</view>
                        <view class="item-right ">{{orderInfo.researchName}}</view>
                    </view>

                    <view class="item">
                        <view class="item-left">联系电话：</view>
                        <view class="item-right ">{{orderInfo.researchPhone}}</view>
                    </view>
                    <view class="item">
                        <view class="item-left">尽调反馈：</view>
                        <view class="item-right ">{{orderInfo.confirmTime}}</view>
                    </view>

                </view>
            </block>


        </view>


        <view class="item-list" v-if="orderInfo.orderStatus===orderStatus.YI_QIAN_YUE">
            <view class="block"></view>
            <view class="item item-header of-1px-bottom">
                <view class="item-left">签约信息</view>
                <view class="item-right"></view>
                <view class="item-icon" @click="onToggle('toggle3')">
                    <uni-icon :type="toggle3?'arrowdown':'arrowup'" size="24"></uni-icon>
                </view>
            </view>

            <block>
                <view class="block-detail" v-show="toggle3">
                    <view class="item">
                        <view class="item-left">签约单号：</view>
                        <view class="item-right ">{{orderInfo.signingNum}}</view>
                    </view>

                    <view class="item">
                        <view class="item-left">客户姓名：</view>
                        <view class="item-right ">{{orderInfo.loanName}}</view>
                    </view>
                    <view class="item">
                        <view class="item-left">放款金额：</view>
                        <view class="item-right red">{{orderInfo.finalReviewConfirmMoney}}元</view>
                    </view>
                    <view class="item" v-if="orderInfo.loanTime">
                        <view class="item-left">放款时间：</view>
                        <view class="item-right "> {{orderInfo.loanTime}}</view>
                    </view>
                    <view class="item">
                        <view class="item-left">借款年利率：</view>
                        <view class="item-right ">{{orderInfo.interestRate}}%</view>
                    </view>
                    <view class="item">
                        <view class="item-left">借款期限：</view>
                        <view class="item-right ">{{orderInfo.loanTerm}}月</view>
                    </view>
                </view>
            </block>


        </view>
        <view class="block"></view>
        <view class="item-list">
            <view class="item item-header of-1px-bottom">
                <view class="item-left">处理进度</view>
                <view class="item-right"></view>
                <view class="item-icon" @click="onToggle('toggle4')">
                    <uni-icon :type="toggle4?'arrowdown':'arrowup'" size="24"></uni-icon>
                </view>
            </view>

            <block>
                <view class="block-detail" v-show="toggle4">
                    <view class="item">
                        <view class="item-left">下单时间：</view>
                        <view class="item-right ">{{orderInfo.createTime}}</view>
                    </view>

                    <view class="item" v-if="orderInfo.evaluateTime">
                        <view class="item-left">评估时间：</view>
                        <view class="item-right ">{{orderInfo.evaluateTime}}</view>
                    </view>
                    <view class="item" v-if="orderInfo.bespeakTime">
                        <view class="item-left">提交预约：</view>
                        <view class="item-right ">{{orderInfo.bespeakTime}}</view>
                    </view>
                    <view class="item" v-if="orderInfo.confirmTime">
                        <view class="item-left">尽调反馈：</view>
                        <view class="item-right ">{{orderInfo.confirmTime}}</view>
                    </view>
                    <view class="item" v-if="orderInfo.loanTime">
                        <view class="item-left">放款时间：</view>
                        <view class="item-right "> {{orderInfo.loanTime}}</view>
                    </view>
                    <view class="item" v-if="orderInfo.finalReviewTime">
                        <view class="item-left">审核时间：</view>
                        <view class="item-right ">{{orderInfo.finalReviewTime}}</view>
                    </view>

                </view>
            </block>


        </view>

        <view v-if="yuyuebtnShow">
            <my-button :margin-top="20" @click="onClickYuyueUrl(orderInfo)">立即预约下户
            </my-button>
        </view>


        <view style="height: 10px"></view>

    </view>
</template>

<script>
    import uniIcon from "../../components/uni-icon"
    import myButton from "../../components/my-button/my-button"
    import {OrderStatusEnum, SubOrderStatusEnum} from "../../common/js/enum"

    export default {
        name: "order-all",
        props: {
            isDetail: Boolean,  // 是否是详情
            orderInfo: Object,  // 订单信息
            cardList: Array,
            houseList: Array,
            orderId: String,
        },
        data() {
            return {
                toggle0: true,
                toggle: true,
                toggle1: true,
                toggle2: true,
                toggle3: true,
                toggle4: true,
                toggle5: true,
                orderStatus: OrderStatusEnum
            }
        },
        onLoad() {
        },
        computed: {
            // 预约信息是否显示
            yueyueInfoShow() {
                console.log(this.orderInfo,"this.orderInfo")
                const status = this.orderInfo.orderStatus
                const subStatus = this.orderInfo.subOrderStatus


                if (status === this.orderStatus.YI_PING_GU) { // 已评估
                    if (subStatus === SubOrderStatusEnum.WEI_YU_YUE) { // 未预约不显示
                        return false
                    }

                    return true
                }
                if (status > this.orderStatus.YI_PING_GU) {
                    return true

                }
                return false
            },
            // 尽调信息是否显示
            jintiaoInfoShow() {
                const status = this.orderInfo.orderStatus
                if (status === this.orderStatus.YI_FOU_JUE) { // 否决不显示
                    return false
                }

                if (status > this.orderStatus.YI_PING_GU) {
                    return true
                }
                return false
            },
            // 预约按钮
            yuyuebtnShow() {
                const status = this.orderInfo.orderStatus
                const subStatus = this.orderInfo.subOrderStatus

                if (status === this.orderStatus.YI_PING_GU && subStatus === SubOrderStatusEnum.WEI_YU_YUE) {
                    return true
                }
                return false
            }

        },
        methods: {


            onToggle(toggleName) {

                this[toggleName] = !this[toggleName]
            },
            onClickYuyueUrl(orderInfo) {
                uni.navigateTo({
                    url: "/pages/my-order-pinggu/my-order-pinggu?orderId=" + orderInfo.orderId + "&loanIdCard=" + orderInfo.loanIdCard + "&loanName=" + orderInfo.loanName
                })
            },
            onLookImg(imgUrl, imgList) {
                uni.previewImage({
                    current: imgUrl,
                    urls: imgList,
                })
            }
        },
        components: {
            uniIcon,
            myButton
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../common/css/util.styl"
    .block {
        background-color #efeff4
        height upx(30)
    }

    .item-list, .image-list {
        background-color #ffffff
        .item {
            padding upx(20)
            display flex
            font-size upx(28)
            color: #8595b5
            .item-left {
                flex 0 0 upx(214)
                line-height upx(56)
            }
            .item-right {
                flex 1
                line-height upx(56)

                &.red {
                    color: #fe574f
                }
                .image {
                    width upx(100)
                    height upx(100)
                }
            }
            .item-icon {
                padding-top upx(10)
            }
            &.item-header {
                color: #484a74
            }
        }
    }

    .image-list {
        .item {
            .item-left {
                flex 0 0 upx(214)
                line-height upx(100)
            }
            .item-right {
                .scroll-list {
                    width upx(400)
                    display flex
                }
                .image {
                    margin-right upx(10)
                    flex 0 0 upx(100)
                    width upx(100)
                    height upx(100)
                }
            }
        }

    }


</style>
