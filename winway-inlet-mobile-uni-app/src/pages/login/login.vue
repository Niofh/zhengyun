<template>
  <view class="page-login">
    <view class="welcome-text">欢迎回来！</view>

    <form @submit="formSubmit">

      <view class="my-field">
        <view class="uni-list-cell">
          <view class="uni-form-item">
            <view class="my-field_headeer" :class="{'error-color':phoneErrorClass}">手机号</view>
            <input class="uni-input" type="number" name="phone" v-model="phone" placeholder="请输入手机号"
                   @input="clearInput('phone','phoneIcon',$event)"/>
            <view class="uni-icon uni-icon-clear" v-show="phoneIcon"
                  @click="onClearIcon('phone','phoneIcon')"></view>
          </view>
        </view>
      </view>

      <view class="my-field">
        <view class="uni-list-cell">
          <view class="uni-form-item">
            <view class="my-field_headeer" :class="{'error-color':passwordErrorClass}">密码</view>
            <input class="uni-input" v-model="password" name="password" placeholder="请输入密码"
                   :password="showPassword"
                   @input="clearInput('password','passwordIcon',$event)"/>
            <view class="uni-icon uni-icon-clear" v-show="passwordIcon"
                  @click="onClearIcon('password','passwordIcon')"></view>
          </view>
        </view>
        <view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']"
              @click.prevent="onChangePassword('showPassword')"></view>
      </view>

      <my-button form-type="submit">登录</my-button>
    </form>

    <view class="navigator-wrap">
      <view class="item">
        <navigator url="/pages/forget-password/forget-password">忘记密码</navigator>
      </view>

      <view class="item">
        <navigator url="/pages/register/register" open-type="navigate">注册账号</navigator>
      </view>


    </view>

    <!--<view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">-->
      <!--<image class="image" src="../../static/image/weixin.png" @tap="oauth('weixin')"></image>-->
    <!--</view>-->

  </view>
</template>

<script>
  import myButton from "../../components/my-button/my-button"
  import inputMixin from "../../common/js/mixins/inputMixin"
  import Validate from "../../common/js/validate/Validate"
  import {loginApi} from "../../api/user"

  export default {
    name: "login",
    mixins: [inputMixin],
    data() {
      return {
        phone: "",
        phoneIcon: false,
        phoneErrorClass: false,

        password: "",
        passwordIcon: false,
        showPassword: true,
        passwordErrorClass: false,

        hasProvider: true,
        positionTop: 0,
        route: ""
      }
    },
    onLoad(option) {
      console.log(option)

      this.initPosition()
      if (option.redirect) {
        this.route = option.redirect
      } else {
        this.route = ""
      }

    },
    methods: {
      login() {
        uni.showLoading({
          title: "加载中...",
          mask: true,
        })

        this.$store.dispatch("login", {
          phone: this.phone,
          password: this.password,
          route: this.route
        })


      },
      formSubmit(e) {
        const formValue = e.detail.value

        const validate = new Validate(
          {
            form: formValue,
            rules: {
              phone: {
                required: true,
                phone: true,
              },
              password: {
                required: true,
                maxlength: 15,
                minlength: 6
              },

            },
            messages: {

              phone: {
                required: "手机号不能为空",
                phone: "手机号格式不正确",
              },
              password: {
                required: "密码不能为空",
                maxlength: "密码长度不能超过15位",
                minlength: "密码长度不能小于6位"
              },

            }

          }
        )


        if (this.errorKey) {
          this[this.errorKey + "ErrorClass"] = false
        }
        if (!validate.valid()) { // 表单验证
          const err = validate.getError()
          this.errorKey = validate.getKey()
          this[this.errorKey + "ErrorClass"] = true
          uni.showToast({
            title: err,
            icon: "none"
          })
          return
        }
        this.login()
      },
      initPosition() {
        /**
         * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
         * 反向使用 top 进行定位，可以避免此问题。
         */
        this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
        console.log(this.positionTop)
      },
      /**
       * 授权登录
       * @param value  ['weixin','qq']
       */
      oauth(value) {
        //#ifndef H5
        // 除了h5页面 其他都能用
        uni.login({
          provider: value,
          success: (res) => {
            console.log(res, "res")
            uni.getUserInfo({ // 获取用户信息
              provider: value,
              success: (infoRes) => {
                console.log(infoRes)

                // 根据不同平台请求ajax地址，微信小程序 https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html

                //#ifdef MP-WEIXIN

                //#endif


                /**
                 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
                 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
                 */
                // this.toMain(infoRes.userInfo.nickName);


              }
            });
          },
          fail: (err) => {
            console.error('授权登录失败：' + JSON.stringify(err));
          }
        });

        //#endif
      },
    },
    components: {
      myButton
    }
  }
</script>

<style lang="stylus">
  page {
    background #ffffff
  }
</style>
<style lang="stylus" scoped>
  @import "../../common/css/util.styl"

  .welcome-text {
    padding upx(30) upx(30)
    font-size: upx(28)
    color #9aa7c0
    background-color #efeff4
  }

  .navigator-wrap {
    padding upx(0) upx(30)
    display flex
    flex-direction: row;
    justify-content space-between
    .item {
      padding upx(20) 0
      color #1873df
    }
  }

  .oauth-row {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align center

  }

  .oauth-row .image {
    width: upx(64)
    height: upx(64)
  }
</style>
