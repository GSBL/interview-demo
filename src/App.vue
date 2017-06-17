<template>
  <div id="app">
    <header>
    <img class="logo" src="./assets/img/logo.png" alt="理財通"/>
    </header>
    <div class="content">
        <m-fund :fund-options="fundOptions">
            <h3 slot="fund-top">理财狂欢</h3>
            <p slot="fund-top">高收益产品限量抢</p>
            去看看
        </m-fund>
        <m-lottery>
            <h3 slot="lottery-top">呼朋唤友抢iPhone 6s</h3>
            <p slot="lottery-top">金条免费抽</p>              
        </m-lottery>
    </div>
    <footer>
     <m-intro>
        <p slot="income">理财通已为1100万用户带来超过30亿收益</p>
     </m-intro>
    </footer>
  </div>
</template>

<script>
  import fund from './components/fund.vue'
  import lottery from './components/lottery.vue'
  import intro from './components/intro.vue'
  export default {
    data () {
      return {
        fundOptions: {
            follow: true
        }
      }
    },
    components: {
      'm-fund':fund,
      'm-lottery':lottery,
      'm-intro': intro
    }
  }
</script>

<style lang="less">
  @import "./assets/style/index.less";
</style>
