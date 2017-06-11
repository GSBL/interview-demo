<template>
    <section class="fund-section">
        <div class="slogn"></div>
        <div class="fund-box">
            <div class="fund-top">
                <h3>理财狂欢</h3>
                <p>高收益产品限量抢</p>
            </div>
            <div class="fund-board">
                <div class="slider-wapper" id="fund_slider">
                    <ul class="slider-content fund-info">
                        <li v-for="item in foundItems" :class="{visible:isVisible}">
                            <em class="tag">{{item.tag}}</em>
                            <p class="found-name">{{item.foundName}}</p>
                            <p class="fund-rate">{{item.foundRate}}</p>
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
                        <li v-for='index in 5' :class="{current:isCurrentIndex}">{{index}}</li>
                    </ol>
                </div>
            </div>
        </div>
        <div class="btn-wapper">
            <a href="javascript:;" class="button to-see">去看看</a>
        </div>
    </section>
</template>

<script type="text/javascript">
    export default {
        data () {
             return {
                foundItems: [
                    {
                        tag: "限量",
                        fundName: "光大永明定活保168",
                        foundRate: "预期年化收益率",
                        rate: 6.1,
                        specInfo: {
                            lockUpPeriod: 66,
                            purchaseAmount: 1000,
                            riskLevel: "中",
                        }
                    },
                    {
                        tag: "限量",
                        fundName: "光大永明定活保168",
                        foundRate: "预期年化收益率",
                        rate: 8.4,
                        specInfo: {
                            lockUpPeriod: 55,
                            purchaseAmount: 800,
                            riskLevel: "中",
                        }
                    },
                    {
                        tag: "限量",
                        fundName: "光大永明定活保168",
                        foundRate: "预期年化收益率",
                        rate: 6.7,
                        specInfo: {
                            lockUpPeriod: 60,
                            purchaseAmount: 1030,
                            riskLevel: "中",
                        }
                    },
                    {
                        tag: "限量",
                        fundName: "光大永明定活保168",
                        foundRate: "预期年化收益率",
                        rate: 6.1,
                        specInfo: {
                            lockUpPeriod: 66,
                            purchaseAmount: 1000,
                            riskLevel: "中",
                        }
                    },
                    {
                        tag: "限量",
                        fundName: "光大永明定活保168",
                        foundRate: "预期年化收益率",
                        rate: 6.1,
                        specInfo: {
                            lockUpPeriod: 66,
                            purchaseAmount: 1000,
                            riskLevel: "中",
                        }
                    },
                    {
                        tag: "限量",
                        fundName: "光大永明定活保168",
                        foundRate: "预期年化收益率",
                        rate: 6.1,
                        specInfo: {
                            lockUpPeriod: 66,
                            purchaseAmount: 1000,
                            riskLevel: "中",
                        }
                    }
                ],
                isVisible: false,
                isCurrentIndex: false

             }   
        }
    }
</script>