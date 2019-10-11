import _ from "./lodash.core.min"

class Validate {
    constructor(options) {
        const _this = this;
        this._options = {
            form: {},  // form表单的值
            rules: {},
            messages: {},
        }
        this._options = _.assignIn(this._options, options)

        this._options.rulesMethods = {
            required(value) {
                console.log(value.length > 0)
                return value.length > 0
            },
            email: function (value) {
                return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
            },
            number: function (value) {
                return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
            },
            digits: function (value) {
                return /^\d+$/.test(value);
            },
            phone: function (value) { // 验证手机号
                return /^1\d{10}$/.test(value)
            },
            idCard(value) {
                return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
            },
            // http://jqueryvalidation.org/minlength-method/
            min: function (value, param) {
                return value >= param;
            },
            max: function (value, param) {
                return value <= param;
            },
            range: function (value, param) {
                return (value >= param[0] && value <= param[1]);
            },

            // http://jqueryvalidation.org/minlength-method/
            minlength: function (value, param) {
                var length = _.isArray(value) ? value.length : value.length;
                return length >= param;
            },

            // http://jqueryvalidation.org/maxlength-method/
            maxlength: function (value, param) {
                var length = _.isArray(value) ? value.length : value.length;
                return length <= param;
            },

            // http://jqueryvalidation.org/rangelength-method/
            rangelength: function (value, param) {
                var length = _.isArray(value) ? value.length : value.length
                return (length >= param[0] && length <= param[1]);
            },

            equalTo: function (value, param) {
                var val = _this._options.form[param]
                return value === val;
            },


        }
        this._options.key = ""
        this._options.error = ""
        this._options.errors = []


    }


    /**
     * 表单验证设置form的属性值
     * @param form Object key value
     */
    setForm(form) {
        this._options.form = form
    }

    setMessages(messages) {
        this._options.messages = messages
    }

    setRules(rules) {
        this._options.rules = rules
    }

    /**
     * 添加规则
     * @param name
     * @param ruleFunc
     */
    addMethod(name, ruleFunc) {
        this._options.rulesMethods[name] = ruleFunc
    }

    /**
     * 检查验证是否通过
     * true 验证通过
     * false 验证不通过
     */
    valid() {
        const form = this._options.form
        const rules = this._options.rules
        const rulesMethods = this._options.rulesMethods
        const messages = this._options.messages
        const errors = this._options.errors

        for (let formKey in form) {
            let formValue = form[formKey]
            for (let ruleKey in rules[formKey]) {
                let ruleValue = rules[formKey][ruleKey]  // 规则参数

                if (!rulesMethods[ruleKey]) {
                    throw new Error(ruleKey + " 验证方法不存在,你需要动态添加规则方法！")
                }
                if (!rulesMethods[ruleKey](formValue, ruleValue)) {
                    this._options.errors = []
                    // 验证不通过,存起来
                    errors.push({
                        [formKey]: messages[formKey][ruleKey]
                    })
                    break
                }
            }

            if (errors.length > 0) {
                // 获取第一项的错误
                const errIndex0 = errors[0]
                for (let key in errIndex0) {
                    this._options.error = errIndex0[key]
                    this._options.key = key
                }
            } else {
                this._options.error = ""
                this._options.key = ""
            }


        }
        console.log("error", errors)
        return errors.length === 0

    }

    /**
     * 获取错误规则集合
     * @returns {Array}
     */
    getErrors() {
        return this._options.errors
    }

    /**
     * 获取首个错误
     * @returns {*}
     */
    getError() {
        return this._options.error
    }

    getKey() {
        return this._options.key
    }


}

export default Validate
