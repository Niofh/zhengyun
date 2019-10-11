<template>
    <view class="product-details">
        <view class="uni-padding-wrap">
            <wxParse :content="article" @preview="preview" @navigate="navigate"/>
        </view>
    </view>
</template>

<script>
    // 文档http://npm.taobao.org/package/mpvue-wxparse
    import wxParse from '../../components/mpvue-wxparse/src/wxParse.vue'

    export default {
        name: "product-details",
        data() {
            return {
                article: `<div>234324234234 <span>2324234哈哈啊哈 水电费为范围分为</span></div>`
            }
        },
        onLoad(options) {

            console.log(options)
        },
        methods:{
            preview(src, e) {
                // do something
                console.log("src: " + src);
            },
            navigate(href, e) {
                // 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
                console.log("href: " + href);
                uni.showModal({
                    content : "点击链接为：" + href,
                    showCancel:false
                })
            }
        },
        components:{
            wxParse
        }
    }
</script>
<style lang="stylus">
    @import url("../../components/mpvue-wxparse/src/wxParse.css");
    page{
        background #ffffff
    }
</style>

<style lang="stylus" scoped>
</style>
