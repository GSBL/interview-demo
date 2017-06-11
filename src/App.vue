<template>
  <div id="app">
    <header>
    <img class="logo" src="./assets/img/logo.png" alt="理財通"/>
    </header>
    <div class="content">
        <m-found></m-found>
        <m-lottery></m-lottery>
    </div>
    <footer>
      <div class="intro">
          <h3 class="intro-title">
              <span>理财通&nbsp;&nbsp;|&nbsp;&nbsp;腾讯官方理财平台</span>
          </h3>
          <ul class="product-intro">
              <li>
                  <div class="profit">
                  <i></i>
                  </div>
                  <div class="detail">
                      <p class="detail-abstract">稳健收益</p>
                      <p>理财通已为1000万用户带来超过30亿收益</p>
                  </div>
              </li>
              <li>
                  <div class="safe">
                  <i></i>
                  </div>
                  <div class="detail">
                      <p class="detail-abstract">安全保障</p>
                      <p>首创资金安全卡，腾讯安全专家为你保驾护航</p>
                  </div>
              </li>
              <li>
                  <div class="flexible">
                  <i></i>
                  </div>
                  <div class="detail">
                      <p class="detail-abstract">灵活存取</p>
                      <p>资金随时存取，微信每日看收益</p>
                  </div>
              </li>
          </ul>
      </div>
    </footer>
  </div>
</template>

<script>
  import found from './components/found.vue'
  import lottery from './components/lottery.vue'
  export default {
    data () {
      return {

      }
    },
    components: {
      'm-found':found,
      'm-lottery':lottery
    }
  }
</script>
