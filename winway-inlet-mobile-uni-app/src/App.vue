<script>


    import {TOKEN} from "./common/js/const"

    export default {
        onLaunch: function () {


            // #ifdef  H5
            try {
                const token = uni.getStorageSync(TOKEN)
                console.log(token, "token")
                if (token) {
                    this.$store.dispatch("getUserInfo", token)
                } else {
                    uni.reLaunch({
                        url: "/pages/login/login"
                    })
                }
            } catch (e) {


            }
            // #endif



            console.log('App Launch ')
        },
        onShow: function () {
            console.log('App Show')
        },
        onHide: function () {
            console.log('App Hide')
        }
    }
</script>

<style lang="stylus">
    /*每个页面公共css */
    @import "common/uni.css"

    @import "common/css/base.styl"


</style>

