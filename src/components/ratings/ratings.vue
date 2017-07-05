<template>
  <div class="ratings" v-el:ratings>
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
      <split></split>
      <ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
      <div class="ratings-wrapper">
        <ul v-show="ratings.length">
          <li class="rating-content" v-for="rating in ratings"></li>
        </ul>
        <div class="no-ratings" v-show="!ratings.length"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	import star from 'components/star/star';
  import BScroll from 'better-scroll';
	import split from 'components/split/split';
	import ratingselect from 'components/ratingselect/ratingselect';

	const ALL = 2;
  const ERR_OK = 0;
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				ratings: [],
				selectType: ALL,
				onlyContent: true
			};
		},
		created() {
			this.$http.get('/api/ratings').then((response) => {
				response = response.body;
				if (response.errno === ERR_OK) {
					this.ratings = response.data;
        }
			});
			this.$nextTick(() => {
        this.scroll = new BScroll(this.$els.ratings, {
          click: true
        });
      });
		},
		components: {
			star,
			split,
			ratingselect
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
      .overview
        padding 18px 0
        display flex
        .over-left
          flex 0 0 37%
          padding 6px 0
          width 37%
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
          @media only screen and (max-width: 320px)
            padding-left 6px
          .score-wrapper
            margin-bottom 8px
            font-size 0
            .title
              display inline-block
              vertical-align top
              line-height 18px
              font-size 12px
              color rgb(7, 17, 27)
            .star
              display inline-block
              vertical-align top
              margin 0 12px
            .score
              display inline-block
              vertical-align top
              line-height 18px
              font-size 12px
              color: rgb(255, 153, 0)
          .delivery-wrapper
            font-size 0
            .title
              display inline-block
              vertical-align top
              line-height 18px
              font-size 12px
              color rgb(7, 17, 27)
            .delivery
              display inline-block
              vertical-align top
              line-height 18px
              margin-left 12px
              font-size 12px
              color rgb(147, 153, 159)
</style>
