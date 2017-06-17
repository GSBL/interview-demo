<template>
    <section class="fund-section">
        <div class="slogn"></div>
        <div class="fund-box">
            <div class="fund-top">
                <slot name="fund-top">
                </slot>
            </div>
            <div class="fund-board">
                <div class="slider-wapper" id="fund_slider"
                @touchstart="onStart" @touchmove="onMove"@touchend="onEnd" @touchcancel="onCancel">
                    <ul class="slider-content fund-info">
                        <li v-for="item in fundItems">
                            <em class="tag">{{item.tag}}</em>
                            <p class="fund-name">{{item.fundName}}</p>
                            <p class="fund-rate">{{item.fundRate}}</p>
                            <p class="rate">
                                <strong>{{item.rate}}</strong>%
                            </p>
                            <div class="spec-info">
                                <p class="Lock-up-period">锁定期<span>{{item.specInfo.lockUpPeriod}}天</span></p>
                                <p class="purchase-amount">起购金额(元)<span>{{item.specInfo.purchaseAmount}}</span></p>
                                <p class="risk-level">风险等级<span>{{item.specInfo.riskLevel}}</span></p>
                            </div>
                        </li>
                    </ul>
                    <ol class="slider-order">
                        <li v-for='(item,index) in fundItems' :class="{current:(item.isCurrent)}">{{index}}</li>
                    </ol>
                </div>
            </div>
        </div>
        <div class="btn-wapper">
            <a href="javascript:;" class="button to-see">
                <slot>
                    去看看                
                </slot>
            </a>
        </div>
    </section>
</template>

<script type="text/javascript">
let win = window,
    touch = {},
    containerELem = null,
    orderBarElem = null,
    contentElem = null,
    childLen = 0,
    childWidth = 0,
    totalWidth = 0,
    index = 0,
    curIndex = 0,
    translateX = 0,
    diffX = 0,
    diffY = 0,
    isScrolling = false,
    duration = 300,
    follow = false,
    scrollDisabled = false,
    distance = childWidth*0.4


function translate(elem,distance,duration) {
    if (elem.style.transform === undefined) {
        elem.style.webkitTransform = 'translateX(' + distance + '%)'
    } else {
        elem.style.transform = 'translateX(' + distance + '%)'
    }
    if (elem.style.transition === undefined) {
        elem.style.webkitTransitionDuration = duration+"ms"
    } else {
        elem.style.transitionDuration = duration+"ms"
    }
}

function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) > Math.abs(y1 - y2) ? (x1 > x2 ? "left" : "right") : (y1 > y2 ? "up" : "down")
}

export default {
    data () {
         return {
            fundItems: [
                {
                    tag: "限量",
                    fundName: "光大永明定活保168",
                    fundRate: "预期年化收益率",
                    rate: 6.1,
                    specInfo: {
                        lockUpPeriod: 66,
                        purchaseAmount: 1000,
                        riskLevel: "中",
                    },
                    isCurrent: true
                },
                {
                    tag: "限量",
                    fundName: "光大永明定活保168",
                    fundRate: "预期年化收益率",
                    rate: 8.4,
                    specInfo: {
                        lockUpPeriod: 55,
                        purchaseAmount: 800,
                        riskLevel: "中",
                    },
                    isCurrent: false

                },
                {
                    tag: "限量",
                    fundName: "光大永明定活保168",
                    fundRate: "预期年化收益率",
                    rate: 6.7,
                    specInfo: {
                        lockUpPeriod: 60,
                        purchaseAmount: 1030,
                        riskLevel: "中",
                    },
                    isCurrent: false

                },
                {
                    tag: "限量",
                    fundName: "光大永明定活保168",
                    fundRate: "预期年化收益率",
                    rate: 6.1,
                    specInfo: {
                        lockUpPeriod: 66,
                        purchaseAmount: 1000,
                        riskLevel: "中",
                    },
                    isCurrent: false

                },
                {
                    tag: "限量",
                    fundName: "光大永明定活保168",
                    fundRate: "预期年化收益率",
                    rate: 6.1,
                    specInfo: {
                        lockUpPeriod: 66,
                        purchaseAmount: 1000,
                        riskLevel: "中",
                    },
                    isCurrent: false

                }
            ],
            options: this.fundOptions
        }   
    },
    props:{
        fundOptions: {
            type: Object
        }
    },
    mounted() {
        containerELem = document.getElementById("fund_slider")
        orderBarElem = containerELem.children[1]
        contentElem = containerELem.children[0]
        childLen = contentElem.children.length
        childWidth = contentElem.firstElementChild.clientWidth
        totalWidth = childLen * childWidth
        duration = this.options.duration || 300
        follow = this.options.follow || false
        scrollDisabled = this.options.scrollDisabled || false
        distance = this.options.distance || childWidth*0.4
  
    },
    methods: {
        onStart(e) {
            diffX = 0
            diffY = 0
            if (e.touches.length == 1) {
                let curTouch = e.touches[0]
                curIndex = Math.abs(translateX / childWidth) + 1
                if (touch.x2) {
                    touch.x2 = undefined
                    touch.y2 = undefined
                }
                touch.x1 = curTouch.pageX
                touch.y1 = curTouch.pageY
                touch.time = +new Date()
            }
        },
        onMove(e) {
            if (e.changedTouches.length == 1) {
                if (scrollDisabled){
                    e.preventDefault()
                }
                let curTouch = e.changedTouches[0]
                touch.x2 = curTouch.pageX
                touch.y2 = curTouch.pageY
                diffX = touch.x2 - touch.x1
                diffY = touch.y2 - touch.y1
                isScrolling = Math.abs(diffX) < Math.abs(diffY) 
                if (!isScrolling) {
                    e.preventDefault()
                }
                if (!isScrolling && follow) {
                    let outOfBounds = curIndex <= 1 && diffX > 0 || curIndex == childLen && diffX < 0
                    diffX =  diffX/(outOfBounds ? (Math.abs(diffX) / childWidth + 1) : 1)
                    translate(contentElem,(translateX +diffX)* 100 / totalWidth,0)
                }
            }
        },
        onEnd(e) {
            let opts = this.options
            if (e.changedTouches.length == 1) {
                let period = +new Date() - touch.time
                let outOfBounds = curIndex <= 1 && diffX > 0 || curIndex == childLen && diffX < 0
                if (!isScrolling){
                    if ((Number(period) < 250 && Math.abs(diffX)> 20 || Math.abs(diffX)> distance) && !outOfBounds) {
                            let direction = swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)
                            if (direction == "left") {
                                translateX -= childWidth
                                index = Math.abs(translateX / childWidth) || 0
                                translate(contentElem, translateX * 100 / totalWidth,duration)
                                opts.callback && opts.callback(index)
                            } else if (direction == "right") {
                                translateX += childWidth
                                index = Math.abs(translateX / childWidth) || 0
                                translate(contentElem, translateX * 100 / totalWidth,duration)
                                opts.callback && opts.callback(index)
                            }
                            this.fundItems.forEach(function(item,i){
                                if(item.isCurrent){
                                    item.isCurrent = false
                                }
                                if(i == index){
                                    item.isCurrent = true
                                }
                            })
                            // orderBarElem.querySelector('.current').className = ""
                            // orderBarElem.children[index].className += "current"
                    }else {
                        index = Math.abs(translateX / childWidth) || 0
                        translate(contentElem, translateX * 100 / totalWidth,duration)
                        opts.callback && opts.callback(index)
                    }
                }
            }
        },
        onCancel(e) {
            translate(contentElem, translateX * 100 / totalWidth,duration)
            touch = {}
        }
    }
}

</script>

<style lang="less">
@import "../assets/style/utils-rem.less";

@-webkit-keyframes scale{
    50%{ 
        -webkit-transform:scale(2);
    }
    100%{ 
        -webkit-transform:scale(1);
    }
}

@keyframes scale{
    50%{ 
        transform:scale(2);
    }
    100%{ 
        transform:scale(1);
    }
}
    .fund-section {
        .slogn {
            width: 100%;
            .px2rem(height,384);
            background: url("../assets/img/slogn.png") no-repeat center center;
            background-size: 100%;
            &:before,
            &:after{
                content: "";
                position: absolute;
                z-index: 3;
            }

            &:before{
                .px2rem(height,130);
                .px2rem(width,78);
                .px2rem(margin-top,384+30);
                background: url("../assets/img/left.png") no-repeat center center;
                background-size: 100%;
            }
            &:after{
                .px2rem(height,106);
                .px2rem(width,56);
                .px2rem(margin-top,384+4);
                .px2rem(margin-left,640 - 56); 
                background: url("../assets/img/right.png") no-repeat center center;
                background-size: 100%;
            }
        }
        .fund-box {
            .px2rem(margin,-108,24,0,24);
            .px2rem(padding,10);
            background-color:rgba(0,0,0,.5); 
            .px2rem(border-radius,10);
            .fund-top {
                color: #fff;
                text-align: left;
                .px2rem(padding,6,0,14,108);
                h3 {
                    .px2rem(font-size,32);
                    .px2rem(line-height,32);
                    font-weight: 700;
                    .px2rem(margin-bottom,4);
                }
                p {
                    .px2rem(font-size,28);
                    .px2rem(line-height,28);
                }
                &:before {
                    position: absolute;
                    content: "";
                    .px2rem(height,100);
                    .px2rem(width,76);
                    .px2rem(margin,-36,0,0,-76);
                    background-image: url("../assets/img/num.png");
                    background-repeat: no-repeat;
                    .px2rem(background-size,76,206);
                    .px2rem(background-position,-30,-2);
                }
            }
            .fund-board {
                position: relative;
                &:before ,&:after {
                    position: absolute;
                    width: 100%;
                    top: 0;
                    left: 0;
                    .px2rem(height,348);
                    .px2rem(border-radius,10);
                    content: "";
                    background-color: #fff;
                    border: 1px solid #d2d2d2;
                    outline: 1px solid transparent;
                    -webkit-backface-visibility:hidden;
                    backface-visibility:hidden;
                }
                &:before {
                    z-index: 1;
                    -webkit-transform: rotate(1.2deg);
                    transform: rotate(1.2deg);
                }
                &:after {
                    -webkit-transform: rotate(1.8deg);
                    transform: rotate(1.8deg);
                    z-index: 0;
                }
                .slider-wapper {
                    .px2rem(height,352);
                    .px2rem(border-radius,10);
                    background-color: #fff;
                    position: relative;
                    overflow: hidden;
                    -webkit-transform: rotate(-.2deg); 
                    transform: rotate(-.2deg); 
                    -webkit-backface-visibility:hidden;
                    backface-visibility:hidden;
                    outline: 1px solid transparent;
                    z-index: 2;
                    border: 1px solid #d2d2d2;
                    width: 100%;
                    .fund-info {
                        overflow: hidden;
                        position: relative;
                        .px2rem(width,572*5);
                        .px2rem(height,352 - 20-6);
                        text-align: center;
                        li {
                            float: left;
                            .px2rem(width,572);
                            overflow: hidden;
                            position: relative;
                            .px2rem(border-top-right-radius,10);
                        }
                        .tag {
                            position: absolute;
                            background-color: #eb5855;
                            .px2rem(height,144);
                            .px2rem(width,200);
                            .px2rem(right,-94);
                            .px2rem(top,-62);
                            .px2rem(font-size,28);
                            .px2rem(line-height,226);
                            -webkit-transform: rotate(45deg);
                            transform: rotate(45deg);   
                            color: #fff;
                        }
                        .fund-name {
                            .px2rem(font-size,24);
                            .px2rem(line-height,24);
                            .px2rem(margin-top,24);
                            color: #b3b3b3;
                        }
                        .fund-rate {
                            .px2rem(font-size,28);
                            .px2rem(line-height,34);
                            .px2rem(margin-top,6);
                            color: #ff3838;
                        }
                        .rate {
                            font-family: Helvetica;
                            .px2rem(margin-top,44);
                            .px2rem(font-size,64);
                            .px2rem(line-height,72);
                            color: #ff3838;
                            strong {
                                .px2rem(font-size,96);
                                font-weight: 100;
                            }

                        }
                        .spec-info {
                            color: #b3b3b3;
                            .px2rem(margin-top,26);
                            .px2rem(padding,0,34);
                            display: -webkit-box;     /* OLD - iOS 6-, Safari 3.1-6 */
                            display: -webkit-flex;   /* NEW - Chrome */
                            display: flex;      
                            .px2rem(font-size,24);
                            .px2rem(line-height,36);
                            span {
                                display: block;
                            }

                            .Lock-up-period {
                            }
                            .purchase-amount {
                                -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */
                                -webkit-flex: 1;          /* Chrome */
                                flex: 1;    
                            }
                            .risk-level {
                                span {
                                    color: #ff3838;
                                }
                            }
                        }
                    }
                }
                .slider-order {
                    width: 100%;
                    .px2rem(height,20);
                    .px2rem(margin-bottom,6);
                    text-align: center;
                    font-size: 0;
                    li {
                        display: inline-block;
                        vertical-align: middle;
                        .px2rem(width,12);
                        .px2rem(height,12);
                        border-radius: 50%;
                        background-color: #e5e5e5;
                        .px2rem(margin,0,6);
                    }
                    .current {
                        background-color: #eb5855;
                        -webkit-animation: scale .3s linear both;
                        animation: scale .3s linear both;
                    }
                } 
            }
        }
        .btn-wapper {
            .px2rem(padding,16,22,38,22);
            .to-see {
                width: 100%;
                display: block;
                .px2rem(line-height,90);
                .px2rem(font-size,42);
                text-align: center;
                background-color: #fef102;
                color: #df4733;
                .px2rem(border-radius,10);
                border-bottom: 6/64rem solid #ffa800; 
                box-shadow: 0 8/64rem 0 #0080c1;
            }

        }
    }
</style>