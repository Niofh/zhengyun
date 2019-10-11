<template>
  <view class="pages-my-order">

    <scroll-view id="tab-bar" class="my-scroll-list " scroll-x="true" :scroll-left="scrollLeft">
      <view class="my-scroll-wrap of-1px-bottom">
        <view class="my-scroll-item" v-for="(tab,index) in tabBars" :key="tab.id"
              :id="tab.id"
              :data-current="index"
              :class="{active:index===tabIndex}"
              @click="tapTab(index)">
          {{tab.name}}
        </view>
      </view>

    </scroll-view>
    <swiper class="swiper-list" duration="200" :current="tabIndex" @change="onChangeTab" :circular="false">

      <swiper-item v-for="(tab,index1) in newsitems" :key="index1">

        <search-input placeholder="请输入客户姓名" :value="tab.loanName" @input="onSearchInput"
                      @confirm="onSearchConfirm"></search-input>

        <scroll-view :scroll-top="tab.scrollTop" class="list" scroll-y @scrolltolower="loadMore(index1)"
                     @scroll="onScroll">

          <view class="order-item" @click="onClickOrderDetali(order)" v-for="(order,orderIndex) in tab.data"
                :key="orderIndex">
            <!--<order-all :order-info="order"></order-all>-->
            <view class="flex-wrap of-1px-bottom">
              <view class="left">订单编号：</view>
              <view class="right">{{order.orderNum}}</view>
            </view>

            <view class="flex-wrap">
              <view class="left">订单状态：</view>

              <view class="right blue"> {{order.orderNameDesc }}</view>
            </view>


            <view class="flex-wrap">
              <view class="left">下单时间：</view>
              <view class="right">{{order.createTime}}</view>
            </view>

            <view class="flex-wrap" v-if="order.loanName">
              <view class="left">客户姓名：</view>
              <view class="right ">{{order.loanName}}</view>
            </view>

            <view class="flex-wrap" v-if="order.maxLoanMoney">
              <view class="left">可贷金额：</view>
              <view class="right red">{{order.maxLoanMoney}}元</view>
            </view>
            <view class="flex-wrap">
              <view class="left">备注：</view>
              <view class="right" >{{order.remark}}</view>
            </view>
            <view class="flex-wrap" v-if="yipingguStatus(order)">
              <view class="left">操作：</view>  <!--已评估才能尽调预约-->
              <view class="right" style="text-align: right">
                <button size="mini" @click.stop="onClickYuyueUrl(order)">尽调预约</button>
              </view>
            </view>


          </view>

          <view class="">
            <uni-load-more :loadingType="tab.loadingType" :contentText="loadingText"></uni-load-more>
          </view>

        </scroll-view>

      </swiper-item>

    </swiper>

  </view>
</template>

<script>
  import util from "../../common/util"
  import uniLoadMore from "../../components/uni-load-more"
  import searchInput from "../../components/search-input/search-input"
  import orderAll from "../../components/order-all/order-all"
  import {LoadingType, OrderStatus} from "../../common/js/const"
  import {OrderStatusEnum, SubOrderStatusEnum} from "../../common/js/enum"
  import {getOrderPageListApi} from "../../api/product"

  export default {
    name: "my-order",
    data() {

      return {
        scrollLeft: 0, // 设置横向滚动的位置
        tabIndex: 0,
        tabBars: [
          {
            name: '全部',
            id: 'q0',
            orderStatus: "",
            subOrderStatus: "",
          },
          {
            name: '待评估',
            id: 'q1',
            orderStatus: OrderStatusEnum.DAI_PING_GU,
            subOrderStatus: "",
          },
          {
            name: '已评估',
            id: 'q2',
            orderStatus: OrderStatusEnum.YI_PING_GU,
            subOrderStatus: SubOrderStatusEnum.WEI_YU_YUE,
          },

          {
            name: '已申请预约',
            id: 'q3',
            orderStatus: OrderStatusEnum.YI_PING_GU,
            subOrderStatus: SubOrderStatusEnum.YI_YU_YUE,
          },
          {
            name: '已确认预约',
            id: 'q4',
            orderStatus: OrderStatusEnum.JIN_DIAO_ZHONG,
            subOrderStatus: SubOrderStatusEnum.QUE_REN_YUE_YUE,
            isComfirmStatus: 1,
          }, {
            name: '尽调中',
            id: 'q5',
            orderStatus: OrderStatusEnum.JIN_DIAO_ZHONG,
            subOrderStatus: "",
            isComfirmStatus: 2,
          },
          {
            name: '已签约',
            id: 'q6',
            orderStatus: OrderStatusEnum.YI_QIAN_YUE,
            subOrderStatus: "",
          },
          {
            name: '已否决',
            id: 'q7',
            orderStatus: OrderStatusEnum.YI_FOU_JUE,
            subOrderStatus: "",
          },
        ],
        isClickChange: false, // 是不是点击tabBar
        newsitems: [], // swiper数据  总数据
        loadingText: {
          contentdown: "上拉显示更多",
          contentrefresh: "正在加载...",
          contentnomore: "没有更多数据了"
        },
        YI_PING_GU: OrderStatusEnum.YI_PING_GU
      }
    },
    onLoad() {


      this.newsitems = this.randomfn()


    },

    onShow() {
      this.getData()
      this.$nextTick(() => {
        this.getIdLeft()
      })
      // this.h5ScrollLeft()
    },
    computed: {

    },
    methods: {

      yipingguStatus(order){
        return order.orderStatus===OrderStatusEnum.YI_PING_GU&&order.subOrderStatus===SubOrderStatusEnum.WEI_YU_YUE
      },
      /*尽调预约*/
      onClickYuyueUrl(orderInfo) {
        uni.navigateTo({
          url: "/pages/my-order-pinggu/my-order-pinggu?orderId=" + orderInfo.orderId + "&loanIdCard=" + orderInfo.loanIdCard + "&loanName=" + orderInfo.loanName
        })
      },

      /**
       * 生成swiper数据，处理每个item的上拉加载
       */
      randomfn() {
        this.tabBars.forEach((item, index) => {
          this.newsitems.push({
            id: item.id,
            name: item.name,
            loadingType: LoadingType.LOADING,
            pageIndex: 0,
            pageSize: 10,
            totalPageCount: 2,
            loanName: "",
            orderStatus: item.orderStatus,    // 订单状态
            subOrderStatus: item.subOrderStatus, // 订单子状态
            firstLoading: index === 0 ? true : false, // 是否第一次加载
            data: [],
            scrollTop: 0,
            oldScrollTop: 0,
            isComfirmStatus: item.isComfirmStatus // 是否预约申请，尽调
          })
        })
        return this.newsitems
      },

      /*单独对h5 tab问题*/
      h5ScrollLeft() {
        console.log(this.scrollLeft)
        // #ifdef  H5
        const dom = document.querySelector("#tab-bar")
        if (dom) {
          dom.querySelector("div.uni-scroll-view").querySelector("div.uni-scroll-view").scrollLeft = this.scrollLeft
        }
        // #endif
      },

      // tab选项勾选，移动距离
      getIdLeft() {

        const orderTabbarId = this.$store.state.orderTabbarId
        this.tabIndex = orderTabbarId
        console.log(orderTabbarId, "orderTabbarId")
        const select = uni.createSelectorQuery().select('#q' + orderTabbarId)
        const _this = this;
        select.boundingClientRect(data => {
          console.log("得到布局位置信息", data);
          _this.scrollLeft = data.left
          _this.h5ScrollLeft()

        }).exec();

      },


      async tapTab(index) { //点击tab-bar

        const swiperItem = this.newsitems[index]

        let tabBar = await this.getElSize("tab-bar"),
          tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
        this.scrollLeft = tabBarScrollLeft;
        this.isClickChange = true;
        this.tabIndex = index;

        // 请求过ajax不再请求
        // if (!swiperItem.firstLoading) {
        //   this.getData()
        // }

        this.$store.commit("setOrderTabbarId", this.tabIndex)
        swiperItem.data = []
        swiperItem.pageIndex = 0
        this.scrollTop0(swiperItem)

        this.getData()
      },

      async onChangeTab(e) {


        let index = e.detail.current;
        console.log(index, "index")
        if (typeof index !== "number") {
          return
        }
        if (this.isClickChange) {
          this.tabIndex = index;
          this.isClickChange = false;
          return;
        }


        let tabBar = await this.getElSize("tab-bar"),
          tabBarScrollLeft = tabBar.scrollLeft;
        let width = 0;

        for (let i = 0; i < index; i++) {
          let result = await this.getElSize(this.tabBars[i].id);
          width += result.width;
        }

        let winWidth = uni.getSystemInfoSync().windowWidth,
          nowElement = await this.getElSize(this.tabBars[index].id),
          nowWidth = nowElement.width;
        if (width + nowWidth - tabBarScrollLeft > winWidth) {
          this.scrollLeft = width + nowWidth - winWidth;
        }
        if (width < tabBarScrollLeft) {
          this.scrollLeft = width;
        }
        this.isClickChange = false;
        this.tabIndex = index; //一旦访问data就会出问题

        this.$store.commit("setOrderTabbarId", this.tabIndex)

        const swiperItem = this.newsitems[index]

        if (!swiperItem.firstLoading) {
          this.getData()
        }
      },

      getScrollLeft(index) {

      },
      getElSize(id) { //得到元素的size
        return new Promise((res, rej) => {
          uni.createSelectorQuery().select('#' + id).fields({
            size: true,
            scrollOffset: true
          }, (data) => {
            res(data);
          }).exec();
        });
      },

      onSearchInput(value) {
        const swiperItem = this.newsitems[this.tabIndex]
        swiperItem.loanName = value
        if (!value) {
          swiperItem.pageIndex = 0
          this.scrollTop0(swiperItem)
          this.getData()
        }
      },
      onSearchConfirm(value) {
        const swiperItem = this.newsitems[this.tabIndex]
        swiperItem.pageIndex = 0
        swiperItem.data = []
        this.scrollTop0(swiperItem)
        swiperItem.loanName = value
        this.getData()

      },
      onScroll(e) {
        const swiperItem = this.newsitems[this.tabIndex]
        swiperItem.oldScrollTop = e.detail.scrollTop
      },

      // 回到顶部
      scrollTop0(swiperItem) {
        swiperItem.scrollTop = swiperItem.oldScrollTop
        this.$nextTick(function () {
          swiperItem.scrollTop = 0
        });
      },

      /**
       * 查看详情
       **/
      onClickOrderDetali(order) {
        const urlParams = util.objectToUrlString({
          orderId: order.orderId,
          orderStatus: order.orderStatus,
        })
        uni.navigateTo({
          url: "/pages/order-detail/order-detail?" + urlParams
        })
      },

      loadMore(index) {
        // 获取每一项轮播图的数据
        const swiperItem = this.newsitems[index]

        if (swiperItem.loadingType !== LoadingType.LOADING) {
          return
        }

        this.tabIndex = index

        this.getData()
      },
      getData() {

        // 获取每一项轮播图的数据
        const swiperItem = this.newsitems[this.tabIndex]

        // 构造参数
        const params = {
          loanName: swiperItem.loanName,
          pageIndex: swiperItem.pageIndex,
          pageSize: swiperItem.pageSize,
          orderStatus: swiperItem.orderStatus,
        }
        if (swiperItem.subOrderStatus >= 0) {
          params.subOrderStatus = swiperItem.subOrderStatus
        }

        if (swiperItem.isComfirmStatus) {
          params.isComfirmStatus = swiperItem.isComfirmStatus
        }

        swiperItem.loadingType = LoadingType.LOADING
        getOrderPageListApi(params).then(res => {

          if (res.status === this.$SUCCESS_CODE) {
            //  this.loadingType = LoadingType.UP_LOADING;

            const data = res.data

            const records = data.records.map(item => {

              // item.orderName = OrderStatusEnum.getEnumName(item.orderStatus)
              // item.subOrderName = SubOrderStatusEnum.getEnumName(item.subOrderStatus)

              item.orderNameDesc = OrderStatusEnum.getEnumName(item.orderStatus)

              if (item.orderStatus === OrderStatusEnum.YI_PING_GU) {
                item.orderNameDesc = SubOrderStatusEnum.getEnumName(item.subOrderStatus)
              }
              if (item.orderStatus === OrderStatusEnum.JIN_DIAO_ZHONG) {
                if (item.isComfirmStatus === 1) {
                  // 已确认预约
                  item.orderNameDesc = SubOrderStatusEnum.getEnumName(SubOrderStatusEnum.QUE_REN_YUE_YUE)
                } else {

                  // 尽调中
                  item.orderNameDesc = OrderStatusEnum.getEnumName(OrderStatusEnum.JIN_DIAO_ZHONG)
                }
              }


              return item
            })

            swiperItem.totalPageCount = data.totalPageCount
            swiperItem.firstLoading = true

            if (swiperItem.pageIndex === 0) {
              swiperItem.data = records
            } else {
              swiperItem.data = swiperItem.data.concat(records)
            }

            swiperItem.pageIndex = swiperItem.pageIndex + 1
            if (swiperItem.pageIndex >= swiperItem.totalPageCount) {
              swiperItem.loadingType = LoadingType.NO_DATA;
            } else {
              if (records.length === 0) {
                swiperItem.loadingType = LoadingType.UP_LOADING;
              }
            }
          }

          console.log(swiperItem)
        })
      }
    }
    ,
    components: {
      uniLoadMore,
      searchInput,
      orderAll
    }
  }
</script>
<style lang="stylus">
  page {
    height 100%
  }
</style>

<style lang="stylus" scoped>
  @import "../../common/css/util.styl"
  .pages-my-order {
    display flex
    flex-direction: column;
    height: 100%;
  }

  .my-scroll-list {
    background-color #ffffff
    .my-scroll-wrap {
      display flex
    }
    .my-scroll-item {
      padding upx(30) 0
      width upx(160)
      flex 0 0 upx(160)
      font-size upx(26)
      text-align center
      &.active {
        color #1873df
        border-bottom upx(4) solid #1873df
      }
    }
  }

  .swiper-list {
    flex 1
    .list {
      height: calc(100% - 50px);

    }

    .order-item {
      margin-bottom upx(30)
      background #ffffff
    }
    .flex-wrap {
      padding upx(20)
      display flex
      font-size upx(28)
      color: #8595b5
      .left {
        flex 0 0 upx(214)
        line-height upx(56)
      }
      .right {
        flex 1
        line-height upx(56)
        /*text-align right*/
        &.red {
          color #fe574f
        }
        &.blue {
          color #1873df
        }
      }
    }
  }

</style>
