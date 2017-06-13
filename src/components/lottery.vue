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
                    <li v-for="prize in prizes">
                        <div class="prize" v-if="!!prize">
                             <img :width="prize.width" :src="prize.src" :alt="prize.desc">
                            <p :class="prize.size">{{prize.desc}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <ul class="dots" v-for="item in dotsUl" :class="'dots-' + item.direction">
                <li v-for="i in item.num"></li>
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
            	dotsUl: [
            		{
            			direction: "top",
            			num: 12
            		},
            		{
            			direction: "right",
            			num: 10
            		},
            		{
            			direction: "bottom",
            			num: 12
            		},{
            			direction: "left",
            			num: 10
            		}
            	]
            }
        }
    }
</script>

<style lang="less">
@import "../assets/style/utils-rem.less";

@keyframes spot{
	0% {
		background-color: rgba(255,255,255,.3);

	}
	50% {
		background-color: rgba(255,255,255,1);

	}
	100% {
		background-color: rgba(255,255,255,.3);

	}
}
@-webkit-keyframes spot{
	0% {
		background-color: rgba(255,255,255,.3);

	}
	50% {
		background-color: rgba(255,255,255,1);

	}
	100% {
		background-color: rgba(255,255,255,.3);

	}
}

@keyframes click {
	0% {
		transform: translate(-50%,-50%);

	}
	50% {
		transform: translate(-50%,-50.5%);
		box-shadow: inset 0 -9px 0 #ff5035,0 3px 0 #ffd6c9;
	}
	100% {
		transform: translate(-50%,-50%);

	}
}
	.lottery-section {
		.lottery-top{
			color: #fff;
			text-align: left;
			.px2rem(height,68);
			.px2rem(padding,10,0,10,118);
			background-color: #0080c1;
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
				.px2rem(margin,-36,0,0,-86);
				background-image: url("../assets/img/num.png");
				background-repeat: no-repeat;
				.px2rem(background-size,76,206);
				.px2rem(background-position,0,-100);
			}
		}
		.lottery-content {
			.px2rem(margin,34);
			.px2rem(height,640- 68 - 72);
			.px2rem(padding,36);
			position: relative;
			.lottery-item {
				height: 100%;
			}
			.go-wapper {
				.px2rem(height,260);
				.px2rem(width,260);
				background-color: #fff;
				.px2rem(border-radius,130);
				position: absolute;
				top: 50%;
				left: 50%;
				-webkit-transform: translate(-50%,-50%);
				transform: translate(-50%,-50%);
				z-index: 1;
				&:before {
					position:absolute;
					.px2rem(width,288);
					.px2rem(height,126);
					.px2rem(margin,-72,0,0,-10);
					content: "";
					background: url("../assets/img/man_middle.png") no-repeat center center;
					background-size: 100%;
					z-index: -1;
				}
				.go-btn {
					.px2rem(height,226);
					.px2rem(width,226);
					background-color: #ff7654;
					.px2rem(border-radius,114);
					box-shadow: inset 0 -8px 0 #ff5035,0 4px 0 #ffd6c9;
					animation:click .5s ease infinite both;
					position: absolute;
					top: 50%;
					left: 50%;
					-webkit-transform: translate(-50%,-50%);
					transform: translate(-50%,-50%);
					text-align: center;
					em {
						/*font-family: "ProximaNova";*/
						.px2rem(font-size,76);
						.px2rem(line-height,76);
						.px2rem(margin-top,40);
						color: #fff;
						font-weight: bold;
						display:block;
					}
					p {
						color: #ffdd18;
						.px2rem(font-size,28);
						.px2rem(line-height,32);
						.px2rem(margin-top,10);
					}
				}
			}
			.prizes-box {
				width: 100%;
				.px2rem(height,125);
				font-size: 0;
				display: table;
				li {
					width: 25%;
					display: table-cell;
					text-align: center;
					vertical-align: middle;
					&:nth-child(6),&:nth-child(7),&:nth-child(10),&:nth-child(11) {
						visibility: hidden;
					}
					&:nth-child(even) {
						.prize {
							background-color: #25bcfb;
						}
					}
					&:nth-child(odd) {
						.prize {
							background-color: #3bcfff;
						}
					}

				}
				.prize {
					.px2rem(height,108);
					.px2rem(width,108);
					.px2rem(border-radius,10);
					display: inline-block;
					border: 1px solid #0080c1;
					overflow: hidden;
					img { 
						vertical-align: middle;
					}
					&:before {
						display: inline-block;
						content: "";
						height: 100%;
						vertical-align: middle;
					}
					p {
						.px2rem(font-size,20);
						.px2rem(line-height,22);
						.px2rem(border-bottom-left-radius,10);
						.px2rem(border-bottom-right-radius,10);
						.px2rem(width,110);
						background-color: rgba(0,0,0,.2);
						.px2rem(height,26);
						.px2rem(margin-top,-24);
						color: #fff;
						position: absolute;
						overflow: hidden;
					    text-overflow: ellipsis;
					    white-space: nowrap;
					}
					.large {
						.px2rem(font-size,24);
					}
					.small {
						.px2rem(font-size,18);
					}
					.smaller {
						.px2rem(font-size,16);
					}
				}
			}
			.dots {
				position: absolute;
				/*overflow: hidden;*/
				font-size: 0;
				li {
					.px2rem(width,20);
					.px2rem(height,20);
					.px2rem(border-radius,10);
				}
				li:nth-child(odd) {
					animation: spot .8s linear infinite .4s both;
				}
				li:nth-child(even) {
					animation: spot .8s linear infinite both;
				}
			}
			.dots-top,.dots-bottom {
				.px2rem(margin-left,-30);
				li {
					.px2rem(margin-left,30);
					display: inline-block;
				}
			}
			.dots-top, {
				top: 0;
				left: 0;
			}
			.dots-bottom {
				bottom: 0;
				left: 0;
			}
			.dots-left, .dots-right {
				li {
					.px2rem(margin-top,30);
				}
			}
			.dots-left {
				left: 0;
				.px2rem(top,20);
			}
			.dots-right {
				.px2rem(top,20);
				right: 0;
			}
		}
		.notice {
			background-color: rgba(5,134,200,.6);
			li {
				.px2rem(height,50);
				.px2rem(line-height,50);
				text-align: center;
				font-size: 0; 
			}
			span {
				.px2rem(font-size,28);
				color: #fff100;
				.px2rem(height,50);
				display: inline-block;
			}
			.user-name {
				width: 25%;
			}
			.winning-time {
				width: 30%;
			}
			.prize-intro {
				width: 43%;
			}
		}
		.share-box {
			text-align: center;
			.share-text {
				.px2rem(font-size,0);
				.px2rem(margin,40,36,26,36);
				.px2rem(height,44);
				background: url("../assets/img/share_text.png") no-repeat center center;
				background-size: 100%;
			}
			p {
				a {
					.px2rem(font-size,28);
					.px2rem(margin,0,28);
					color: #fff100;
					span {
					border-bottom: 1px solid #fff100;
					}
				}
				.px2rem(margin-bottom,26);
			}
		}
	}
	[data-dpr = "2"] .lottery-section .lottery-content .go-wapper .go-btn{
		box-shadow: inset 0 -18px 0 #ff5035,0 6px 0 #ffd6c9;
	}
	[data-dpr = "3"] .lottery-section .lottery-content .go-wapper .go-btn{
		box-shadow: inset 0 -27px 0 #ff5035,0 9px 0 #ffd6c9;

	}
</style>