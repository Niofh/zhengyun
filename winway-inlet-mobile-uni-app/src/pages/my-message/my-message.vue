<template>
    <view class="my-message">
        <view class="product-header">消息列表</view>
        <view class="uni-list">
            <my-list-swiper :list="list" @click="onClick" @delete="onDelete"></my-list-swiper>
        </view>
        <uni-load-more :loading-type="loadingType" :content-text="contentText"></uni-load-more>
    </view>
</template>

<script>
    import myListSwiper from "../../components/list-swiper/list-swiper"
    import uniLoadMore from "../../components/uni-load-more"
    import {deleteMessageApi, getMessageApi} from "../../api/my-message"
    import {LoadingType} from "../../common/js/const"

    export default {
        name: "my-message",
        data() {
            return {
                refreshing: false, // 是否在刷新
                isOne: true,   // 是否第一次加载
                loadingType: LoadingType.LOADING,
                contentText: {
                    contentdown: "上拉显示更多",
                    contentrefresh: "正在加载...",
                    contentnomore: "没有更多数据了"
                },
                pageIndex: 0,
                pageSize: 30,
                totalPageCount: 0,

                list: [],


            }
        },
        onLoad() {

            this.getData()
        },
        onShow() {
            if (!this.isOne) {
                this.refreshing = true;
                this.pageIndex = 0
                this.getData();
            }

        },
        onNavigationBarButtonTap(options) {
            if (options.index === 0) {

                const idList = []

                this.list.forEach((item) => {
                    if (item.status === 1) {
                        idList.push(item.id)
                    }
                })
                console.log(idList)

                if (idList.length === 0) {
                    uni.showToast({
                        "title": "没有已读消息",
                        icon: "none"
                    })
                    return
                }

                this.deleteMsg(idList, "是否删除全部已读消息")

            }
        },
        onPullDownRefresh() {
            console.log("下拉刷新");
            this.refreshing = true;
            this.pageIndex = 0
            this.getData();
        },
        onReachBottom() {
            console.log("上拉加载刷新");
            if (this.loadingType !== LoadingType.LOADING) {
                return
            }
            this.getData()
        },

        methods: {
            /*改变数据结构，listSwiper组件需要*/
            changeList() {
                return this.list.map(item => {
                    return {
                        id: item.messageId,
                        content: item.content,
                        title: item.title,
                        status: item.messageStatus,
                        img: item.messageStatus ? '../../static/image/message_read.png' : '../../static/image/message_unread.png',
                        left: 'transform:translateX(-0px)'
                    }
                })
            },
            getData() {
                this.loadingType = LoadingType.LOADING;
                getMessageApi({
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                }).then(res => {
                    this.isOne = false
                    if (res.status === this.$SUCCESS_CODE) {
                        const data = res.data
                        if (this.refreshing) {
                            // 如果是下拉刷新的话
                            this.refreshing = false;

                            this.list = data.records
                            if (this.list.length === 0) {
                                this.loadingType = LoadingType.NO_DATA
                            }
                            if (this.pageIndex >= this.totalPageCount - 1) {
                                this.loadingType = LoadingType.NO_DATA
                            }
                            uni.stopPullDownRefresh()

                        } else {
                            // 上拉加載
                            this.totalPageCount = data.totalPageCount
                            if (this.pageIndex === 0) {
                                this.list = data.records
                            } else {
                                this.list = this.list.concat(data.records)

                            }
                            this.pageIndex = this.pageIndex + 1

                            console.log(this.pageIndex)
                            if (this.pageIndex >= this.totalPageCount) {
                                this.loadingType = LoadingType.NO_DATA
                            }else{
                              if (data.records.length === 0) {
                                this.loadingType = LoadingType.UP_LOADING;
                              }
                            }
                        }

                        this.list = this.changeList(this.list)

                    } else {
                        this.loadingType = LoadingType.NO_DATA
                    }
                })
            },

            onClick(item) {
                uni.navigateTo({
                    url: "/pages/my-message-detail/my-message-detail?id=" + item.id
                })
            },
            onDelete({item}) {

                this.deleteMsg([item.id], "是否删除该条消息？")
            },

            /**
             * 删除消息
             * @param idList 删除的消息的id 数组
             * @param msg  提示信息
             */
            deleteMsg(idList, msg) {
                const _this = this
                uni.showModal({
                    title: "提示",
                    content: msg,
                    success(res) {
                        if (res.confirm) {
                            deleteMessageApi({ids: idList.toString()}).then(res => {
                                if (res.status === _this.$SUCCESS_CODE) {

                                    _this.list = _this.list.filter((item, index) => {
                                        return idList.indexOf(item.id) < 0
                                    })


                                    uni.showToast({
                                        "title": "删除成功",
                                        icon: "success"
                                    })
                                } else {
                                    uni.showToast({
                                        "title": "删除失败",
                                        icon: "none"
                                    })
                                }
                            })

                        } else if (res.cancel) {

                            console.log('用户点击取消');
                        }
                    }
                })
            }
        },
        components: {
            myListSwiper,
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

</style>
