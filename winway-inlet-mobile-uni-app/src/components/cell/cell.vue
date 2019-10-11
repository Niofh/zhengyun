<template>
    <view class="uni-list-cell" :hover-class="hoverClass" :hover-stay-time="70"
          @click="onClick">
        <view class="uni-list-cell-navigate  "
              :class="{'uni-navigate-right':isLink,'uni-navigate-badge':isBadge}"
        >
                {{title}}
                <slot></slot>
        </view>
    </view>
</template>

<script>
    export default {
        name: "cell",
        props: {
            title: {
                type: String,
                default: ''
            },
            isLink: Boolean,
            isBadge: Boolean,
        },
        data() {
            return {
                hoverClass: this.isLink ? "uni-list-cell-hover" : ""
            }
        },
        methods: {
            onClick() {
                if(this.isLink){
                    this.$emit("click")
                }
            }
        }
    }
</script>


<style lang="stylus" scoped>

</style>
