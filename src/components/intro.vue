<template>
  <div class="intro">
    <h3 class="intro-title">
        <slot name="intro-title">
            <span>理财通&nbsp;&nbsp;|&nbsp;&nbsp;腾讯官方理财平台</span>
        </slot>
    </h3>
    <ul class="product-intro">
        <li>
            <div class="profit">
            <i></i>
            </div>
            <div class="detail">
                <p class="detail-abstract">稳健收益</p>
                <slot name="income">
                    <p>理财通已为1000万用户带来超过30亿收益</p>
                </slot>
            </div>
        </li>
        <li>
            <div class="safe">
            <i></i>
            </div>
            <div class="detail">
                <p class="detail-abstract">安全保障</p>
                <slot name="safe">
                    <p>首创资金安全卡，腾讯安全专家为你保驾护航</p>
                </slot>
            </div>
        </li>
        <li>
            <div class="flexible">
            <i></i>
            </div>
            <div class="detail">
                <p class="detail-abstract">灵活存取</p>
                <slot name="flexible">                
                    <p>资金随时存取，微信每日看收益</p>
                </slot>
            </div>
        </li>
    </ul>
</div> 
</template>

<script type="text/javascript">
  export default {
    data(){
      return {}
    }
  }
</script>

<style type="text/css" lang="less">
@import "../assets/style/utils-rem.less";
.intro {
  .px2rem(height,560);
  background-color: #0088cc;
  color: #57b9ea;
  .intro-title {
    .px2rem(font-size,24);
    .px2rem(line-height,24);
    .px2rem(padding,40,0);
    font-weight: normal;
    text-align: center;
    /*position: relative;*/
    &:before {
      content: "";
      position: absolute;
      /*display: block;*/
      width: 100%;
      height: 1px;
      .px2rem(margin,12,0,0,-(640-308)/2);
      background-color: #0077b3;
    }
    span {
      .px2rem(width,312);
      display: inline-block;
      position: relative;
      z-index: 1;
      background-color: #0088cc;

    }

  }
  .product-intro {
    li {
      .px2rem(height,118);
      width: 100%;
      font-size: 0;
      div {
        display: inline-block;
        vertical-align: middle;
      }
      &:after { 
        content: "";
        display: inline-block;
        height: 100%;
        width: 0;
        vertical-align: middle;
      }
    }
    .profit, .safe, .flexible {
      text-align: center;
      .px2rem(height,90);
      .px2rem(width,90);
      .px2rem(margin,0,48,0,30);
      .px2rem(border-radius,46);
      background-color: #017ebd;
      &:after { 
        content: "";
        display: inline-block;
        height: 100%;
        width: 0;
        vertical-align: middle;
      }
      i {
        display: inline-block;
        vertical-align: middle;
        .px2rem(height,60);
        .px2rem(width,72);
      }
    }
    .profit {
      i {
        background-image: url('../assets/img/icons.png');
        background-repeat: no-repeat;
        .px2rem(background-size,224,60);
        .px2rem(background-position,-4,0);
      }
    }
    .flexible {
      i {
        background-image: url('../assets/img/icons.png');
        background-repeat: no-repeat;
        .px2rem(background-size,224,60);
        .px2rem(background-position,-78,0);
      }
    }
    .safe {
      i {
        background-image: url('../assets/img/icons.png');
        background-repeat: no-repeat;
        .px2rem(background-size,224,60);
        .px2rem(background-position,-150,0);
      }
    }
    .detail {
      .px2rem(width,640-168-28);
      .px2rem(line-height,40);
      p {
        .px2rem(font-size,22);

      }
      p:last-child {
        .px2rem(padding-bottom,14);
      }
      .detail-abstract {
        .px2rem(font-size,30);
      }
      border-bottom: 1px solid #0077b3;
    }
  }
}
</style>