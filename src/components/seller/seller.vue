<template>
  <div class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="name">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">{{seller.ratingCount}}</span>
          <span class="text">{{seller.sellCount}}</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="desc">起送价</h2>
            <div class="content">
              {{seller.minPrice}}
              <span class="unit">元</span>
            </div>
          </li>
          <li class="info">
            <h2 class="desc">商家配送</h2>
            <div class="content">
              {{seller.deliveryPrice}}
              <span class="unit">元</span>
            </div>
          </li>
          <li class="info">
            <h2 class="desc">平均配送时间</h2>
            <div class="content">
              {{seller.deliveryTime}}
              <span class="unit">分钟</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	import star from 'components/star/star';
//	import BScroll from 'better-scroll';
	import split from 'components/split/split';

//	let ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
    },
    components: {
      star,
      split
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
