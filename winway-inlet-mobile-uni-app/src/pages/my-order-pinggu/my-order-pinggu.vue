<template>
  <view class="order-pinggu">
    <form @submit="onSubmit">
      <view class="self-list">
        <picker @change="bindPickerChange" :value="productIndex" :range="productList" range-key="name">
          <view class="my-field">
            <view class="uni-list-cell">
              <view class="uni-form-item">
                <view class="my-field_headeer">产品名称</view>
                <input class="uni-input" type="text" placeholder="请选择产品类型"
                       :value="productList[productIndex].name"
                       disabled/>
                <uni-icon type="arrowdown" size="24" color="#bebdbd"></uni-icon>
              </view>
            </view>
          </view>
        </picker>

      </view>
      <view class="page-header">
        客户资料
      </view>
      <view class="self-list">
        <view class="my-field">
          <view class="uni-list-cell">
            <view class="uni-form-item">
              <view class="my-field_headeer">姓名</view>
              <input class="uni-input" type="text" disabled placeholder="请输入姓名" v-model="customerName"
                     name="customerName"
                     @input="clearInput('customerName','customerNameIcon',$event)"/>
              <view class="uni-icon uni-icon-clear" v-show="customerNameIcon"
                    @click="onClearIcon('customerName','customerNameIcon')"></view>
            </view>
          </view>
        </view>
        <view class="my-field">
          <view class="uni-list-cell">
            <view class="uni-form-item">
              <view class="my-field_headeer">身份证号</view>
              <input class="uni-input" type="idcard" disabled placeholder="请输入身份证号" v-model="customerIdCard"
                     name="customerIdCard"
                     @input="clearInput('customerIdCard','customerIdCardIcon',$event)"/>
              <view class="uni-icon uni-icon-clear" v-show="customerIdCardIcon"
                    @click="onClearIcon('customerIdCard','customerIdCardIcon')"></view>
            </view>
          </view>
        </view>
        <view class="my-field">
          <view class="uni-list-cell">
            <view class="uni-form-item">
              <view class="my-field_headeer">手机号</view>
              <input class="uni-input" type="number" placeholder="请输入手机号" v-model="customerPhone"
                     name="customerPhone"
                     @input="clearInput('customerPhone','customerPhoneIcon',$event)"/>
              <view class="uni-icon uni-icon-clear" v-show="customerPhoneIcon"
                    @click="onClearIcon('customerPhone','customerPhoneIcon')"></view>
            </view>
          </view>
        </view>
      </view>
      <view class="page-header">
        预约信息
      </view>

      <view class="self-list">
        <picker @change="dateChange" mode="date">
          <view class="my-field">
            <view class="uni-list-cell">
              <view class="uni-form-item">
                <view class="my-field_headeer">预约日期</view>
                <input class="uni-input" type="text" placeholder="请选择预约日期" v-model="date" name="date"
                       disabled/>
                <uni-icon type="arrowdown" size="24" color="#bebdbd"></uni-icon>
              </view>
            </view>
          </view>
        </picker>

        <picker @change="timeChange" mode="time">
          <view class="my-field">
            <view class="uni-list-cell">
              <view class="uni-form-item">
                <view class="my-field_headeer">预约时间</view>
                <input class="uni-input" type="text" placeholder="请选择预约时间" v-model="time" name="time"
                       disabled/>
                <uni-icon type="arrowdown" size="24" color="#bebdbd"></uni-icon>
              </view>
            </view>
          </view>
        </picker>

        <view class="my-field">
          <view class="uni-list-cell border-none">
            <view class="uni-form-item">
              <view class="my-field_headeer">预约地址</view>

              <!--<input class="uni-input" type="text" placeholder="请输入预约地址" v-model="researchAddress"-->
              <!--name="researchAddress"-->
              <!--@input="clearInput('researchAddress','researchAddressIcon',$event)"/>-->
              <!--<view class="uni-icon uni-icon-clear" v-show="researchAddressIcon"-->
              <!--@click="onClearIcon('researchAddress','researchAddressIcon')"></view>-->
            </view>
          </view>

          <view class="item-textarea">
               <textarea class="textarea" placeholder-class="placeholder-class"  name="researchAddress" v-model="researchAddress" maxlength="40"
                         placeholder="请输入预约地址，最多40个字符"></textarea>

          </view>


        </view>
      </view>
      <my-button :margin-top="30" form-type="submit">立即预约</my-button>
    </form>

    <yu-toast verticalAlign="center" :disabled="disabled" :message="message" ref="toast"></yu-toast>
  </view>
</template>

<script>
  import uniIcon from "../../components/uni-icon"
  import myButton from "../../components/my-button/my-button"
  import yuToast from "../../components/yu-toast/yu-toast"
  import inputMixin from "../../common/js/mixins/inputMixin"
  import {feedbackInfoSaveApi, getProductListNoPageApi} from "../../api/product"
  import Validate from "../../common/js/validate/Validate"
  import {prefixZero, getDate} from "../../common/util"

  export default {
    name: "order-pinggu",
    mixins: [inputMixin],
    data() {
      return {
        productList: [{name: ""}], // 产品列表
        productIndex: 0,


        customerName: "",
        customerNameIcon: false,

        customerPhone: "",
        customerPhoneIcon: "",

        customerIdCard: "",
        customerIdCardIcon: false,

        researchAddress: "",
        researchAddressIcon: false,


        date: "",
        time: "",
        message: "",

        orderId: "",
        disabled: false
      }
    },
    onLoad(options) {
      this.orderId = options.orderId
      this.customerName = options.loanName
      this.customerIdCard = options.loanIdCard
      this.getProductList()


    },
    computed: {
      productId() {
        return this.productList[this.productIndex].id
      },
      bespeakTime() {
        return this.date + " " + this.time
      }
    },
    methods: {
      bindPickerChange: function (e) {
        this.productIndex = e.target.value
      },
      dateChange(evt) {

        // 当前时间戳
        var currentTimestamp = parseInt(new Date().getTime());
        var date = evt.detail.value;
        var time = new Date(date).getTime()
        if (time < currentTimestamp) {

          this.message = "预约日期必须大于今天日期"
          this.$refs.toast.show()
          this.date = ""

          return
        }
        this.date = evt.detail.value;
      },
      timeChange(evt) {
        const date = new Date()
        this.time = evt.detail.value + ":" + prefixZero(date.getSeconds());
      },

      getProductList() {
        getProductListNoPageApi().then(res => {
          if (res.status === this.$SUCCESS_CODE) {
            res.data.unshift({name: "请选择产品名称", id: ""})
            console.log(res.data)
            this.productList = res.data
          }
        })
      },
      onSubmit(e) {
        const json = e.detail.value
        if (!this.productId) {
          // uni.showToast({
          //     title: "产品名称必选选择一个",
          //     icon: "none"
          // })
          this.message = "产品名称必选一个"
          this.$refs.toast.show()
          return
        }

        const validate = new Validate(
          {
            form: json,
            rules: {
              customerName: {
                required: true,
                maxlength: 15,
              },
              customerPhone: {
                required: true,
                phone: true,
              },
              customerIdCard: {
                required: true,
                idCard: true,
              },
              researchAddress: {
                required: true,
              },
              date: {
                required: true,
              },
              time: {
                required: true,
              },

            },
            messages: {
              customerName: {
                required: "姓名不能为空",
                maxlength: "名称长度不能超过15",
              },
              customerPhone: {
                required: "手机号不能为空",
                phone: "手机号格式不正确",
              },
              customerIdCard: {
                required: "身份证不能为空",
                idCard: "身份证格式不正确"
              },
              researchAddress: {
                required: "预约地址不能为空",
              },
              date: {
                required: "日期不能为空",
              },
              time: {
                required: "时间不能为空",
              },

            }

          }
        )

        if (!validate.valid()) { // 表单验证
          const err = validate.getError()
          this.errorKey = validate.getKey()
          this[this.errorKey + "ErrorClass"] = true
          // uni.showToast({
          //     title: err,
          //     icon: "none"
          // })

          this.message = err
          this.$refs.toast.show()
          return
        }
        console.log(json)
        json.bespeakTime = this.bespeakTime
        json.orderId = this.orderId
        json.productId = this.productId
        this.feedbackInfoSave(json)
      },

      // 预约尽调
      feedbackInfoSave(json) {
        const _this = this;
        uni.showLoading({
          title: "提交中...",
          mask: true
        })
        this.disabled = true
        feedbackInfoSaveApi(json).then(res => {

          if (res.status === this.$SUCCESS_CODE) {

            uni.showToast({
              title: "预约成功",
              icon: "success",
              success() {
                _this.$store.commit("setOrderTabbarId", 3) // 设置导航到已申请预约
                uni.switchTab({
                  url: "/pages/my-order/my-order"
                })
              }
            })

          } else {
            uni.showToast({
              title: res.msg,
              icon: "none"
            })
          }

        }).catch(() => {
          uni.hideLoading()
        }).finally(() => {
          this.disabled = false
        })
      }

    },
    components: {
      uniIcon,
      myButton,
      yuToast,
    }
  }
</script>


<style lang="stylus" scoped>
  @import "../../common/css/util.styl"
  .form-group {
    margin-top upx(10)
  }

  .page-header {
    padding upx(20) upx(30)
    font-size: upx(28)
    color: #9aa7c0
  }

  .item-textarea {
    width 100%
    padding 0 upx(24)
    background #ffffff
    box-sizing border-box
    .textarea {
      width 100%
      height upx(80)
    }
    .msg-tip {
      color #9aa7c0
      padding-bottom upx(10)
    }
  }

  .border-none::after {
    background-color: #fff
  }

</style>
