<template>
    <view class="order-detail">
        <order-all :orderInfo="orderInfo" :card-list="idCardList" :house-list="houseList" :order-id="orderId" ></order-all>
    </view>
</template>

<script>
    import orderAll from "../../components/order-all/order-all"
    import {getOrderDetailsApi} from "../../api/order"

    export default {
        name: "order-detail",
        data() {
            return {
                orderInfo: {},
                idCardList: [],
                houseList: [],
                orderId:"",
            }
        },
        onLoad(options) {
            this.getOrderDetails(options)
        },
        methods: {
            getOrderDetails(params) {
                getOrderDetailsApi(params).then(res => {
                    if (res.status === this.$SUCCESS_CODE) {
                        this.orderInfo = res.data
                        if(res.data.idCardBack){
                            this.idCardList.push(res.data.idCardBack)
                            this.idCardList.push(res.data.idCardPositive)
                            this.houseList.push(res.data.propertyPicture)
                        }

                    }
                })
            }
        },
        components: {
            orderAll
        }
    }
</script>


<style lang="stylus" scoped>

</style>
