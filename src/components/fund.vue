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
@import "../assets/style/fund.less";
</style>