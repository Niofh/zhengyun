
### 用法

```javascript
const v = new Validate({
    form: {
        username: "3",
        password: "q1111",
        aPassword: "q1111"
    },
    rules: {
        // 规则定义
        username: {
            required: true,
            range: [2, 6]
        },
        password: {
            required: true,
        },
        aPassword: {
            required: true,
            equalTo: "password"
        }
    },
    messages: {
        username: {
            required: "用户名必填",
            range: "输入范围0 ~ 6 之间"
        },
        password: {
            required: "密码必填",
        },
        aPassword: {
            required: "重复密码必填",
            equalTo: "重复密码不一致"
        }
    }

})

// 添加规则
v.addMethod("phone", function (value, param) {
    return /^\d+$/.test(value)
})

// api 
setOptions()  // 设置所有参数
setForm()
console.log(v.valid())  // 验证
console.log(v.getErrors()) // 获取错误信息
```
