<template>
  <view class="product">
    <!--<view style="height: 30px">上拉刷新</view>-->

    <scroll-view class="scroll-wrap" scroll-y :style="{'height':windowHeight+'px'}" v-show="list.length!==0"
                 @scrolltolower="loadMore()">
      <view class="item" v-for="(value,key) in list" :key="key">
        <my-list :img-src="value.picture"
                 :title="value.productName" :content="value.synopsis"
                 @click="onClick(value)">
        </my-list>
      </view>


      <view class="uni-tab-bar-loading">
        <uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
      </view>
    </scroll-view>
    <view class="no-data of-ver-center" v-show="loadingType===2&&list.length===0">
      <no-data></no-data>
    </view>


  </view>
</template>

<script>
  import myList from "../../components/list/list"
  import noData from "../../components/notData/index"
  import uniLoadMore from "../../components/uni-load-more"
  import {getProductListApi} from "../../api/product"
  import {LoadingType} from "../../common/js/const"


  export default {
    name: "product",
    data() {
      return {
        list: [],
        pageIndex: 0,
        pageSize: 10,
        totalPageCount: 0,
        loadingText: {
          contentdown: "上拉显示更多",
          contentrefresh: "正在加载...",
          contentnomore: "没有更多数据了"
        },
        loadingType: LoadingType.LOADING,
        windowHeight: 0,
      }
    },
    onLoad() {

      this.getProductList()

      // 获取系统信息
      const res = uni.getSystemInfoSync()

      this.windowHeight = res.windowHeight

    },
    computed: {},
    methods: {
      onClick(item) {
        if(item.h5Url){
          uni.navigateTo({
            url: "/pages/webview/webview?url=" + item.h5Url + "&name=产品详情"
          })
        }
      },
      getProductList() {

        this.loadingType = LoadingType.LOADING
        getProductListApi({
          pagesIndex: this.pageIndex,
          pageSize: this.pageSize,
        }).then(res => {
          if (res.status === this.$SUCCESS_CODE) {


            const records = res.data.records
            this.totalCount = res.data.totalCount
            this.totalPageCount = res.data.totalPageCount

            if (this.pageIndex === 0) {
              this.list = res.data.records
            } else {
              this.list = this.list.concat(res.data.records)
            }

            this.pageIndex = this.pageIndex + 1
            if (this.pageIndex >= this.totalPageCount) {
              this.loadingType = LoadingType.NO_DATA;
            } else {
              if (records.length === 0) {
                this.loadingType = LoadingType.UP_LOADING;
              }
            }
          }
        })
      },
      /*上拉加载*/
      loadMore() {
        if (this.loadingType !== LoadingType.LOADING) {
          return
        }
        this.pageIndex = this.pageIndex + 1
        this.getProductList()
      },

    },
    components: {
      myList,
      noData,
      uniLoadMore
    }
  }
</script>


<style lang="stylus" scoped>
  @import "../../common/css/util.styl"
  .product-header {
    padding upx(30) upx(20) upx(20)
    font-size upx(26)
    color #9aa7c0
  }

  .uni-media-list-logo {
    width upx(120)
    height upx(120)
    .logo-img {
      border-radius 50%
    }
  }

  .uni-media-list-text-top {
    font-weight 600
  }

  .no-data {
    top 40%
  }

  .scroll-wrap {
    height 100%
    .item {
      background #ffffff
    }

  }

  .uni-list:after {
    /*background-color #ffffff*/

  }


</style>
