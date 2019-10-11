<template>
    <view class="page-search">
        <view class="header">


            <search-input placeholder="请输入搜索的花园名称" :value="searchValue"></search-input>
        </view>
        <view class="search-list">
            <navigator class="item" hover-stay-time="100" url="/pages/self-assessment/self-assessment">
                龙岗区家和花园
            </navigator>
            <navigator class="item" hover-stay-time="100">
                龙岗区家和花园
            </navigator>
            <navigator class="item" hover-stay-time="100">
                龙岗区家和花园
            </navigator>
            <navigator class="item" hover-stay-time="100">
                龙岗区家和花园
            </navigator>

        </view>
    </view>
</template>

<script>
    import uniIcon from "../../components/uni-icon"
    import searchInput from "../../components/search-input/search-input"

    export default {
        name: "search",
        data(){
            return{
                searchValue:""
            }
        },
        components: {
            uniIcon,
            searchInput
        }
    }
</script>


<style lang="stylus" scoped>
    @import "../../common/css/util.styl"
    .header {

    }

    .search-list {
        background-color #ffffff
        .item {
            padding upx(30) upx(70)
            font-size: upx(28)
            border-bottom upx(1) solid #e7e7e7
            &:last-child {
                border-bottom 0
            }
        }
    }
</style>
