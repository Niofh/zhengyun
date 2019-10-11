<template>
    <view class="cell-group">
        <slot></slot>
    </view>
</template>

<script>
    export default {
        name: "cell-group"
    }
</script>


<style lang="stylus" scoped>
    .cell-group {
        background #ffffff
    }
</style>
