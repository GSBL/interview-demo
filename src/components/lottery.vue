<template>
	  <section class="lottery-section">
        <div class="lottery-top">
            <h3>呼朋唤友抢iPhone 6s</h3>
            <p>金条免费抽</p>
        </div>
        <div class="lottery-content">
            <div class="lottery-item">
                <div class="go-wapper">
                    <div class="go-btn">
                        <em>GO</em>
                        <p>
                            剩余
                            <var>{{remaining}}</var>
                            次
                            <br/>
                            机会
                        </p>
                    </div>
                </div>
               	<ul class="prizes-box" v-for="prizes in prizesUl ">
                    <li v-for="prize in prizes" v-if="!!prize">
                        <div class="prize">
                             <img :width="prize.width" :src="prize.src" :alt="prize.desc">
                            <p :class="prize.size">{{prize.desc}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <ul class="dots" v-for="direction in directions" :class="'dots-' + direction">
                <li v-for="i in 8"></li>
            </ul>
        </div>
        <ul class="notice">
            <li> 
                <span class="user-name">Vivian</span>
                <span class="prize-intro">抽中了10元红包</span>
                <span class="winning-time">1分钟前</span>
            </li>
        </ul>
        <div class="share-box">
            <p class="share-text">把活动发给好友/微信群获得抽奖机会</p>
            <p>
                <a href="javascript:;" class="my-prize">
                    <span>我的奖品</span>
                </a>
                <a href="javascript:;" class="rule">
                    <span>活动规则</span>
                </a>
            </p>
        </div>
    </section>
</template>

<script type="text/javascript">
    export default {
        data () {
            return {
            	remaining: 3,
            	prizesUl: [
            		[
	            		{
	            			width: 35,
	            			size: "normal",
	            			desc: "iPhone 5s",
	            			src: require("../assets/img/iphone.png")
	            		},
	            		{
	            			width: 28,
	            			size: "large",
	            			desc: "￥10",
	            			src: require("../assets/img/lucky.png")
	            		},
	            		{
	            			width: 25,
	            			size: "small",
	            			desc: "samsung",
	            			src: require("../assets/img/samsung.png")
	            		},
	            		{
	            			width: 28,
	            			size: "large",
	            			desc: "4999",
	            			src: require("../assets/img/iphone.png")
	            		}
	            	],
	            	[	
	            		{
	            			width: 28,
	            			size: "large",
	            			desc: "￥1.8",
	            			src: require("../assets/img/lucky.png")
	            		},
	            		null,
	            		null,
	            		{
	            			width: 28,
	            			size: "large",
	            			desc: "￥50",
	            			src: require("../assets/img/lucky.png")
	            		}
	            	],
	           		[
	            		{
	            			width: 28,
	            			size: "large",
	            			desc: "iPad",
	            			src: require("../assets/img/ipad.png")
	            		},
	            		null,
	            		null,
	            		{
	            			width: 35,
	            			size: "smaller",
	            			desc: "Apple Watch",
	            			src: require("../assets/img/iwatch.png")
	            		}
	            	],
	          		[
	            		{
	            			width: 28,
	            			size: "large",
	            			desc: "￥1.8",
	            			src: require("../assets/img/lucky.png")
	            		},
	            		{
	            			width: 42,
	            			size: "normal",
	            			desc: "定制金条",
	            			src: require("../assets/img/gold.png")
	            		},
	            		{
	            			width: 28,
	            			size: "large",
	            			desc: "￥1.8",
	            			src: require("../assets/img/lucky.png")
	            		},
	            		{
	            			width: 42,
	            			size: "normal",
	            			desc: "定制金条",
	            			src: require("../assets/img/gold.png")
	            		}
					]
            	],
            	directions: ["top","right","bottom","left"],
            	dotsNum: 8
            }
        }
    }
</script>