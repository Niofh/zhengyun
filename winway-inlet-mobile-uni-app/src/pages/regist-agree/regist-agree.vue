<template>
    <view class="about-us">
        <view class="uni-padding-wrap">
            <wxParse :content="article" @preview="preview" @navigate="navigate"/>
        </view>
    </view>
</template>

<script>
    // 文档http://npm.taobao.org/package/mpvue-wxparse
    import wxParse from '../../components/mpvue-wxparse/src/wxParse.vue'
    import {getRegistrationProtocolApi} from "../../api/about-us"

    export default {
        name: "about-us",
        data() {
            return {
                article: "<p></p>"
            }
        },
        onLoad(options) {
            this.getUs()
        },
        methods: {
            preview(src, e) {
                // do something
                console.log("src: " + src);
            },
            navigate(href, e) {
                // 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
                console.log("href: " + href);
                // uni.showModal({
                //     content: "点击链接为：" + href,
                //     showCancel: false
                // })
            },
            getUs() {
                getRegistrationProtocolApi().then(res => {
                    console.log(res)
                    if (res.status === this.$SUCCESS_CODE) {
                        this.article  = res.data.content


                    }
                })
            }
        },
        components: {
            wxParse
        }
    }
</script>
<style lang="stylus">
    @import url("../../components/mpvue-wxparse/src/wxParse.css");
    page {
        background #ffffff
    }
</style>


