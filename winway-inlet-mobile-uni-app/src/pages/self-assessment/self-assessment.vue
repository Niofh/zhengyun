<template>
    <view class="self-assessment">
        <view class="header">
            请输入一下信息
        </view>

        <form >

            <view class="self-list">
                <picker @change="bindPickerChange" :value="index" :range="array">
                    <view class="my-field">
                        <view class="uni-list-cell">
                            <view class="uni-form-item">
                                <view class="my-field_headeer">省份</view>
                                <input class="uni-input" type="text" placeholder="请选择省份" :value="array[index]"
                                       disabled/>
                                <uni-icon type="arrowdown" size="24" color="#bebdbd"></uni-icon>
                            </view>
                        </view>
                    </view>
                </picker>

                <picker @change="bindPickerChange" :value="index" :range="array">
                    <view class="my-field">
                        <view class="uni-list-cell">
                            <view class="uni-form-item">
                                <view class="my-field_headeer">城市</view>
                                <input class="uni-input" type="number" placeholder="请选择城市" disabled
                                />
                                <uni-icon type="arrowdown" size="24" color="#bebdbd"></uni-icon>
                            </view>
                        </view>
                    </view>
                </picker>
            </view>


            <view class="self-list">
                <navigator class="my-field" url="/pages/search/search">
                    <view class="uni-list-cell">
                        <view class="uni-form-item">
                            <view class="my-field_headeer">楼盘</view>
                            <input class="uni-input" type="number" placeholder="请选择楼盘" disabled/>
                            <uni-icon type="arrowright" size="24" color="#bebdbd"></uni-icon>
                        </view>
                    </view>
                </navigator>
                <picker @change="bindPickerChange" :value="index" :range="array">
                    <view class="my-field">
                        <view class="uni-list-cell">
                            <view class="uni-form-item">
                                <view class="my-field_headeer">楼栋</view>
                                <input class="uni-input" type="number" placeholder="请选择楼栋" disabled
                                />
                                <uni-icon type="arrowdown" size="24" color="#bebdbd"></uni-icon>
                            </view>
                        </view>
                    </view>
                </picker>
                <picker @change="bindPickerChange" :value="index" :range="array">
                    <view class="my-field">
                        <view class="uni-list-cell">
                            <view class="uni-form-item">
                                <view class="my-field_headeer">房号</view>
                                <input class="uni-input" type="number" placeholder="请选择房号" disabled
                                />
                                <uni-icon type="arrowdown" size="24" color="#bebdbd"></uni-icon>
                            </view>
                        </view>
                    </view>
                </picker>
            </view>


            <view class="self-list">
                <view class="my-field">
                    <view class="uni-list-cell">
                        <view class="uni-form-item">
                            <view class="my-field_headeer">建筑面积</view>
                            <input class="uni-input" type="number" placeholder="请输入建筑面积"/>
                            <view class="my-field_last">㎡</view>
                        </view>
                    </view>
                </view>
            </view>

            <view class="reference">结果仅供参考</view>
            <div style="height: 100upx"></div>
            <my-button>快速估值</my-button>
        </form>

        <view class="my-data-alert" v-show="false">
            <view class="alert-wrap">
                <view class="bg-wrap">
                    <view class="alert-header">
                        <image class="bg-img" src="../../static/image/guzhi-bg@2x.png"></image>
                        <view class="title">自助评估结果</view>
                        <view class="sub-title">具体贷款金额请咨询业务人员</view>
                    </view>
                    <view class="alert-body">
                        <view class="money-name">估值金额</view>
                        <view class="self-money">￥10000</view>
                        <view class="self-address">估值条件：深圳市/嘉禾花园</view>
                    </view>
                    <view class="alert-foot">
                        <button class="btn" type="primary">我知道了</button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import uniIcon from "../../components/uni-icon"
    import myButton from "../../components/my-button/my-button"

    export default {
        name: "self-assessment",

        data() {
            return {
                product: "1111",
                array: ['中国', '美国', '巴西', '日本'],
                index: 0,
            }
        },
        mounted() {

        },
        methods: {
            bindPickerChange: function (e) {
                console.log('picker发送选择改变，携带值为', e.target.value)
                this.index = e.target.value
            },
        },
        components: {
            uniIcon,
            myButton,
        }
    }
</script>
<style lang="stylus">
    page{
        min-height 100%
    }
</style>

<style lang="stylus" scoped>
    @import "../../common/css/util.styl"

    .header {
        padding upx(30) upx(30)
        font-size: upx(28)
        color #9aa7c0
        background-color #efeff4
    }

    .self-list {
        margin-bottom upx(40)
        background-color #ffffff
    }

    .reference {
        color #9aa7c0
        padding 0 upx(30)
        font-size: upx(26)
    }

    .my-data-alert {
        position fixed
        left: 0
        top: 0
        right: 0
        bottom: 0
        background-color rgba(0, 0, 0, 0.8)
        z-index 20

        .alert-wrap {
            position absolute
            top 50%
            transform translateY(-50%)
            width 100%
            border-radius upx(10)
            padding 0 upx(30)
            box-sizing border-box
        }
        .bg-wrap{
            background-color #ffffff
        }
        .alert-header {
            position relative
            height upx(193)
            background-color: #deedff
            .bg-img {
                position absolute
                left: 50%
                top: 50%
                width upx(503)
                height upx(108)
                transform translate(-50%,-50%)
            }
            .title {
                position absolute
                left upx(218)
                top upx(40)
                font-size: upx(42)
                color: #1a66be
            }
            .sub-title{
                position absolute
                left upx(170)
                top upx(110)
                font-size: upx(28)
                color: #799dc6

            }
        }
        .alert-body{
            background-color #ffffff
            padding upx(40)
            .money-name{
                margin-bottom upx(36)
                font-size: upx(32)
                color: #1a66be
            }
            .self-money{
                padding-bottom upx(30)
                font-size: upx(40)
                color: #1a66be
                border-bottom upx(1) solid #efefef
            }
            .self-address{
                padding upx(52) 0
                font-size: upx(32)
                color: #1a66be
                border-bottom upx(1) solid #efefef
            }
        }
        .alert-foot{
            background-color #ffffff
            padding upx(50) 0
            .btn{
                width 50%
                background-color #1975e0
            }
        }
    }
</style>
