<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="over-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="over-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star';

	export default {
		props: {
			seller: {
				type: Object
			}
		},
    components: {
		  star
    }
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratings
    position absolute
    top 174px
    left 0
    bottom 0
    width 100%
    overflow hidden
    .ratings-content
      padding 18px 0
      .overview
        display flex
        .over-left
          flex 0 0 137px
          padding 6px 0
          width 137px
          border-right 1px solid rgba(7, 17, 27, 0.1)
          text-align center
          .score
            margin-bottom 6px
            line-height 28px
            font-size 24px
            color rgb(255, 153, 0)
          .title
            margin-bottom 8px
            line-height 12px
            font-size 12px
            color rgb(7, 17, 27)
          .rank
            line-height 10px
            font-size 10px
            color: rgb(147, 153, 159)
        .over-right
          flex 1
          padding 6px 0 6px 24px
          .score-wrapper
            margin-bottom 8px
            line-height 18px
            font-size 0
            .title
              display inline-block
              vertical-align top
              font-size 12px
              color rgb(7, 17, 27)
            .star
              display inline-block
              margin 0 12px
              vertical-align top
            .score
              display inline-block
              vertical-align top
              font-size 12px
              color: rgb(255, 153, 0)
          .delivery-wrapper
            line-height 18px
            font-size 0
            .title
              display inline-block
              vertical-align top
              font-size 12px
              color rgb(7, 17, 27)
            .delivery
              display inline-block
              vertical-align top
              margin-left 12px
              font-size 12px
              color rgb(147, 153, 159)
</style>
