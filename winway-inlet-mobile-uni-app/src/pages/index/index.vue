<template>
  <view class="pages-index">
    <view class="img-wrap">
      <image class="bg-img" src="../../static/image/banner-bg@3x.png"></image>
      <view class="icon-wrap">
        <navigator class="wrap" url="/pages/declaration/declaration">
          <image class="icon" src="../../static/image/baodan@3x.png"></image>
          <view class="desc">一键报单</view>
        </navigator>
        <navigator class="wrap" url="/pages/my-draft/my-draft">
          <image class="icon" src="../../static/image/caogao@3x.png"></image>
          <view class="desc">我的草稿</view>
        </navigator>

        <navigator class="wrap" url="/pages/self-assessment/self-assessment">
          <image class="icon" src="../../static/image/guzhi@3x.png"></image>
          <view class="desc">自助估值</view>
        </navigator>
      </view>
    </view>

    <view class="body-wrap mar-top40">
      <view class="body-header">
        <text class="iconfont icon-biaoti"></text>
        <text class="title">进度查询</text>
      </view>
      <view class="body">
        <view class="progress-wrap" @click="onShowOrderPage(1)">
          <view class="number active">{{myAchievement.stayAssessed}}</view>
          <view class="desc">待评估</view>
        </view>
        <view class="progress-wrap" @click="onShowOrderPage(2)">
          <view class="number active">{{myAchievement.alreadyAssessed}}</view>
          <view class="desc">已评估</view>
        </view>
        <view class="progress-wrap" @click="onShowOrderPage(3)">
          <view class="number active">{{myAchievement.appointmentYes}}</view>
          <view class="desc">已预约</view>
        </view>
        <!--<view class="progress-wrap">-->
        <!--<view class="number active">{{myAchievement.appointmentNo || 0}}</view>-->
        <!--<view class="desc">预约中</view>-->
        <!--</view>-->
        <view class="progress-wrap" @click="onShowOrderPage(5)">
          <view class="number">{{myAchievement.approvalIn}}</view>
          <view class="desc">尽调中</view>
        </view>
        <view class="progress-wrap" @click="onShowOrderPage(6)">
          <view class="number">{{ myAchievement.approvalAdopt}}</view>
          <view class="desc">已签约</view>
        </view>
        <view class="progress-wrap" @click="onShowOrderPage(7)">
          <view class="number">{{ myAchievement.approvalRefuse}}</view>
          <view class="desc">已否决</view>
        </view>
        <!--<navigator class="progress-wrap"  >-->
        <!--<view class="number iconfont icon-gengduo"></view>-->
        <!--<view class="desc">更多</view>-->
        <!--</navigator>-->
      </view>
    </view>
    <view class="body-wrap mar-top40">
      <view class="body-header">
        <text class="iconfont icon-biaoti"></text>
        <text class="title">我的业绩</text>
      </view>
      <view class="body">
        <view class="yezhi-wrap">
          <view class="number">{{orderSchedule.inlet || 0}}</view>
          <view class="desc">本月进件</view>
        </view>
        <view class="yezhi-wrap">
          <view class="number">{{orderSchedule.approval || 0}}</view>
          <view class="desc">本月审批</view>
        </view>
        <view class="yezhi-wrap">
          <view class="number">{{orderSchedule.loan || 0}}</view>
          <view class="desc">本月放款</view>
        </view>
      </view>
    </view>

    <view class="body-wrap mar-top40 mar-bottom40" v-show="productList.length">
      <view class="body-header border-none">
        <text class="iconfont icon-biaoti"></text>
        <text class="title">产品推荐</text>
      </view>
      <view class="body">
        <scroll-view scroll-x="true" scroll-with-animation="true">
          <view class="scroll-view" :style="{'width':scrollWidth}">
            <image class="scroll-img" v-for="(item,index) in productList" :key="index"
                   :src="item.picture" @click="onClickProduct(item)"></image>
          </view>
        </scroll-view>
      </view>
    </view>


  </view>
</template>

<script>

  import {getProductPushListApi} from "../../api/product"
  import {getMyAchievementApi, getOrderScheduleApi} from "../../api/order"

  export default {
    data() {
      return {
        orderStatus: [
          {name: "待评估"} // 订单状态
        ],
        productList: [],
        orderSchedule: {
          "approval": 0,
          "inlet": 0,
          "loan": 0
        },
        myAchievement: {
          "alreadyAssessed": 0,
          "appointmentNo": 0,
          "appointmentYes": 0,
          "approvalAdopt": 0,
          "approvalIn": 0,
          "approvalRefuse": 0,
          "stayAssessed": 0
        },

      }
    },
    onLoad() {

      this.getProductPushList()

    },
    onShow() {

      this.getOrderSchedule()
      this.getMyAchievement()
    },
    computed: {
      scrollWidth() {
        return uni.upx2px(this.productList.length * 339) + "px"
      }
    },
    methods: {

      showMore99(value) {
        if (!value) {
          return 0
        }
        if (value > 99) {
          return "99+"
        }

        return value
      },

      onShowOrderPage(id) {
        this.$store.commit("setOrderTabbarId", id)
        uni.switchTab({
          url: '/pages/my-order/my-order'
        });
      },


      /*获取产品推出*/
      getProductPushList() {

        getProductPushListApi().then(res => {
          if (res.status === this.$SUCCESS_CODE) {
            this.productList = res.data
          }
        })

      },
      /*查询报单人订单进度*/
      getOrderSchedule() {
        const _this = this
        getOrderScheduleApi().then(res => {
          if (res.status === this.$SUCCESS_CODE) {
            const item = res.data

            item.stayAssessed = _this.showMore99(item.stayAssessed)
            item.alreadyAssessed = _this.showMore99(item.alreadyAssessed)
            item.appointmentYes = _this.showMore99(item.appointmentYes)
            item.approvalIn = _this.showMore99(item.approvalIn)
            item.approvalAdopt = _this.showMore99(item.approvalAdopt)
            item.approvalRefuse = _this.showMore99(item.approvalRefuse)

            this.myAchievement = item

          }
        })
      },
      /*查询报单人本月业绩*/
      getMyAchievement() {
        getMyAchievementApi().then(res => {
          if (res.status === this.$SUCCESS_CODE) {
            this.orderSchedule = res.data
          }
        })
      },


      /*查看产品*/
      onClickProduct(item) {
        uni.navigateTo({
          url: "/pages/webview/webview?url=" + item.h5Url + "&name=产品详情"
        })
      }
    }
  }
</script>


<style lang="stylus" scoped>
  @import "../../common/css/util.styl"
  .img-wrap {
    height upx(275)
    overflow hidden
  }

  .bg-img {
    position absolute
    width 100%
    height upx(275)
  }

  .icon-wrap {
    position relative
    top upx(66)
    z-index 1
    display flex
    .wrap {
      flex 1
      text-align center
      .icon {
        width upx(110)
        height upx(110)
      }
      .desc {
        margin-top upx(26)
        font-size upx(26)
        color: #ffffff

      }
    }

  }

  .body-wrap {
    background-color #ffffff
  }

  .body-header {
    margin-left upx(30)
    padding upx(30) 0
    border-bottom upx(1) solid #eeeff3
    &.border-none {
      border 0
    }
    .iconfont {
      color #0A98D5
    }
    .title {
      margin-left upx(28)
      font-size: upx(30)
      color: #333333
      font-weight bold
    }

  }

  .body {
    display flex
    flex-wrap: wrap;
    padding-bottom upx(50)
    .progress-wrap {
      width 33.33%
      margin-top upx(5)
      text-align center
      color: #333333
      .number {
        height upx(94)
        line-height upx(94)
        font-size upx(40)
        font-weight bold
        &.active {
          color: #f15a5a
        }
      }
      .desc {
        font-size: upx(26)
      }
    }
    .yezhi-wrap {
      flex 1
      margin-top upx(5)
      text-align center
      color: #333333
      .number {
        height upx(94)
        line-height upx(94)
        font-size upx(40)
        font-weight bold
        &.active {
          color: #f15a5a
        }
      }
      .desc {
        font-size: upx(26)
      }
    }
    .scroll-view {
      display flex
      .scroll-img {
        margin-left upx(30)
        width upx(360)
        height upx(190)
      }
    }
  }


</style>
