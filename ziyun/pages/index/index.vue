<template>
	<view class="index-page">
		<image class="logo" src="/static/imgs/banner.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="stylus">
	.index-page{
		.logo{
			width:100%
			height 376rpx
		}
	}
</style>
