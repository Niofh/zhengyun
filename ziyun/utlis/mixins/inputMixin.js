export default {
    // 清除输入框mixin
    methods:{
        onChangePassword(showPass){
            this[showPass] = !this[showPass];
        },
        onClearIcon(name, icon) {
            this[name] = ""
            this[icon] = false
        },
        clearInput: function (name, icon, event) {
            this[name] = event.target.value;
            if (event.target.value.length > 0) {
                this[icon] = true;
            } else {
                this[icon] = false;
            }
        },
        onInput(icon) {
            this[icon] = true;
        }
    }
}
