<template>
    <view class="my-field">
        <view class="uni-list-cell">
            <view class="uni-form-item">
                <view class="my-field_headeer">{{label}}</view>
                <input class="uni-input"
                       :value="value"
                       :type="type"
                       :placeholder="placeholder"
                       :password="password"
                       :maxlength="maxlength"

                />
                <slot>
                    <view class="uni-icon uni-icon-clear" v-show="showClearIcon" @click="onClearIcon"></view>

                </slot>
            </view>

        </view>
        <view v-if="isPassword" class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']"
              @click.prevent="onChangePassword"></view>

    </view>
</template>

<script>
    export default {
        name: "field",
        inheritAttrs: false,
        props: {
            label: String,
            value: String,
            type: String,
            placeholder: String,
            maxlength: [Number],
            password: Boolean,
            isPassword: Boolean,

        },
        data() {
            return {
                showPassword: true,
                showClearIcon: false,
            }
        },
        computed: {},

        methods: {
            onInput(e) {
                console.log(e)
                const format1 = e.target.value
                this.$emit('input', format1);
                if (format1.length > 0) {
                    this.showClearIcon = true;
                } else {
                    this.showClearIcon = false;
                }
            },
            onChangePassword: function () {
                this.showPassword = !this.showPassword;

                this.$emit("showPassword", this.showPassword)
            },
            onClearIcon() {
                this.showClearIcon = false;
                this.$emit("input", "")
                this.$emit("clear")
            },


        },

    }
</script>


<style lang="stylus" scoped>
    @import "../../common/css/util.styl"

</style>
