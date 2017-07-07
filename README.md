# interview-demo

##预览链接
[interview-demo](https://gsbl.github.io/interview-demo/dist/index.html)
## introduction
* 本项目是之前面试的时候遇到的一道题，进来开始学习`webpack`/`vue`/`ES6`，所以重新实现了一下。
* 主要组件包括展示基金内容的`fund`组件，抽奖`lottery`组件。主要交互在`fund`组件中。
* 遇到`rotate`属性在低端设备上出现锯齿的现象，解决办法如下：
``` bash
-webkit-backface-visibility:hidden;
backface-visibility:hidden;
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
