<template>
  <view class="page-my-draft">
    <search-input placeholder="请输入客户姓名" :value="loanName" @input="onSearchInput"
                  @confirm="onConfirm"></search-input>

    <view class="draft-list">
      <view class="item" v-for="(item,index) in list" :key="index" @click="onLookSee(item)">
        <view class="item-header of-1px-bottom">
          <view class="item-header_name">客户姓名</view>
          <view class="item-header_status">{{item.loanName}}</view>
        </view>
        <view class="item-body">
          <view class="item-body_cell">
            <view class="cell-title">报单时间</view>
            <view class="cell-value">{{item.createTime}}</view>
          </view>
          <view class="item-body_cell">
            <view class="cell-title">身份证号</view>
            <view class="cell-value">{{item.loanIdCard}}</view>
          </view>
          <view class="item-body_cell">
            <view class="cell-title">备注</view>
            <view class="cell-value">{{item.remark}}</view>
          </view>
          <view class="item-body_cell" v-if="item.recStatus===0">
            <view class="cell-title">状态</view>
            <view class="cell-value">已取消</view>
          </view>
          <view class="item-body_cell" v-if="item.recStatus===1">
            <view class="cell-title">操作</view>
            <view class="cell-value">
              <button size="mini" @click.stop="cancel(item)">取消</button>
            </view>
          </view>
        </view>
        <!--<view class="icon-arrow">-->
        <!--<uni-icon type="arrowdown" size="30" ></uni-icon>-->
        <!--</view>-->
      </view>

    </view>
    <uni-load-more :loading-type="loadingType" :content-text="loadingText"></uni-load-more>
  </view>
</template>

<script>
  import uniIcon from "../../components/uni-icon"
  import uniLoadMore from "../../components/uni-load-more"
  import searchInput from "../../components/search-input/search-input"
  import {getOrderPageListApi} from "../../api/product"
  import {LoadingType} from "../../common/js/const"
  import {objectToUrlString} from "../../common/util"
  import {OrderStatusEnum} from "../../common/js/enum"
  import {cancelOrderApi} from "../../api/order"

  export default {
    name: "my-draft",
    data() {
      return {
        refreshing: false, // 是否在刷新
        loadingType: LoadingType.LOADING, // 0上拉加载  1 正在加载中  2 已经没有数据
        list: [],
        pageIndex: 0,
        pageSize: 10,
        totalPageCount: 0,
        loanName: "", // 客户姓名
        loadingText: {
          contentdown: "上拉显示更多",
          contentrefresh: "正在加载...",
          contentnomore: "没有更多数据"
        },
      }
    },

    onPullDownRefresh() {
      console.log("下拉刷新");
      this.refreshing = true;
      this.pageIndex = 0
      this.getOrderPageList();
    },
    onReachBottom() {
      console.log("上拉加载刷新");
      if (this.loadingType !== LoadingType.UP_LOADING) {
        return
      }

      this.getOrderPageList()

    },
    onLoad() {

      this.getOrderPageList()
    },
    methods: {

      getOrderPageList() {
        this.loadingType = LoadingType.LOADING;

        getOrderPageListApi({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          loanName: this.loanName,
          orderStatus: OrderStatusEnum.CAO_GAO
        }).then(res => {
          this.loadingType = LoadingType.UP_LOADING
          if (res.status === this.$SUCCESS_CODE) {
            const data = res.data
            if (this.refreshing) {
              // 如果是下拉刷新的话
              this.refreshing = false;

              this.list = res.data.records
              if (this.list.length === 0) {
                this.loadingType = LoadingType.NO_DATA
              }

              if (this.pageIndex >= this.totalPageCount - 1) {
                this.loadingType = LoadingType.NO_DATA
              }
              uni.stopPullDownRefresh()

            } else {
              // 上拉加載

              if (this.pageIndex === 0) {
                this.list = res.data.records
              } else {
                this.list = this.list.concat(res.data.records)

              }
              this.totalPageCount = data.totalPageCount
              this.pageIndex = this.pageIndex + 1
              if (this.pageIndex >= this.totalPageCount) {
                this.loadingType = LoadingType.NO_DATA
              } else {
                this.loadingType = LoadingType.UP_LOADING
              }
            }

          } else {
            this.loadingType = LoadingType.NO_DATA
          }
        })
      },
      onSearchInput(value) {
        this.loanName = value

        if (!this.loanName) {
          this.pageIndex = 0
          this.getOrderPageList()
        }
      },
      onConfirm(value) {
        this.loanName = value
        this.pageIndex = 0
        this.list = []
        this.getOrderPageList()
      },
      onLookSee(item) {
        if (item.recStatus === 0) {  // 已取消
          return
        }
        const params = {
          orderId: item.orderId,
          loanName: item.loanName,
          loanIdCard: item.loanIdCard,
          remark: item.remark,
        }

        uni.navigateTo({

          url: "/pages/declaration/declaration?" + objectToUrlString(params)
        })
      },
      cancel(order) {
        const _this = this
        uni.showModal({
          title: "提示",
          content: "是否取消该草稿",
          success(res) {
            if (res.confirm) {
              cancelOrderApi({orderId: order.orderId}).then(res => {
                if (res.status === _this.$SUCCESS_CODE) {
                  order.recStatus = 0
                  uni.showToast({
                    icon: "none",
                    title: '取消成功',
                    duration: 2000
                  });
                } else {
                  uni.showToast({
                    icon: "none",
                    title: '取消失败',
                    duration: 2000
                  });
                }
              })
            }
          }
        })

      }
    },
    components: {
      uniIcon,
      uniLoadMore,
      searchInput
    }
  }
</script>


<style lang="stylus" scoped>
  @import "../../common/css/util.styl"
  .search {
    padding upx(18) upx(0)
    .search-wrap {
      position relative
      padding upx(4) upx(16)
      color: #999999
      display flex
      .icon {
        position absolute
        top upx(6)
      }
      .input {
        background-color #ffffff
        flex 1
        padding-left upx(50)
      }
      .clear {
        padding-left upx(10)
        line-height upx(50)
        color #0A98D5
      }
    }

  }

  .draft-list {

    .item {
      background-color #ffffff
      padding 0 upx(30)
      margin-bottom upx(30)
      .item-header {
        display flex
        padding upx(27) 0
        font-size: upx(30)
      }
      .item-header_name {
        flex 1
        color: #484a74
        font-weight bold
      }
      .item-body {
        font-size: upx(24)

        color: #8595b5
      }
      .item-body_cell {
        display flex
        padding upx(27) 0
        .cell-title {
          flex 0 0 upx(150)
        }
        .cell-value {
          flex 1
          text-align right
          line-height upx(45)
        }
      }
      .icon-arrow {
        text-align center
        color #c7c7c7
      }
    }
  }
</style>
