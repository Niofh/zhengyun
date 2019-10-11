# uni-fang

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 文档总结
[uni-app文档](https://uniapp.dcloud.io/matter)

[引入mpvue组件技巧](https://ask.dcloud.net.cn/article/19727)

[微信小程序效果集合](https://blog.csdn.net/anda0109/article/details/76922875)

[mp-wxParse 微信小程序富文本解析组件](http://npm.taobao.org/package/mpvue-wxparse)

[css 常用技巧](https://juejin.im/post/5c2b5cb8e51d45673971d582)

[微信小程序中用户登录和登录态维护](https://www.jianshu.com/p/c5f6c98b2685)

[微信小程序request封装](https://www.jianshu.com/p/f9c1d2fde321)

[微信小程序loadsh引入错误解决](http://blog.dongsj.cn/20180827-lodash-in-miniprogram.html)

[css前缀封装](https://www.jianshu.com/p/215085db5e4e)

[微信小程序授权教程](https://blog.csdn.net/abcwanglinyong/article/details/80267901)

### uni的坑
1. 组件不能自定义v-model
2. checkbox和radio 改变大小只能用transform: scale(0.9,0.9)
3. 组件上不能写class
4. view 默认有一个1px像素间距
5. 不能组件嵌套组件事件 列如：$emit触发事件
6. input 要加class样式 `uni-input` 不然样式有问题
7. 导航栏44px Tabbar50px
8. 不支持vue过滤器



