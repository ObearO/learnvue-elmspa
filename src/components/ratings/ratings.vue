<template>
  <div class="ratings" ref="ratings">
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
      <ratingselect @select="select" @toggleContent="toggle" :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul v-show="ratings.length">
          <transition-group name="fade">
            <li class="rating-item" v-for="rating in ratings" :key="rating" v-show="needShow(rating.text,rating.rateType)">
              <div class="avatar">
                <img :src="rating.avatar" alt="" width="28" height="28">
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score"></star>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span class="icon-thumb_up"></span>
                  <span class="item" v-for="item in rating.recommend">{{item}}</span>
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
              </div>
            </li>
          </transition-group>
        </ul>
        <div class="no-ratings" v-show="!ratings.length">暂无评论</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	import star from 'components/star/star';
  import BScroll from 'better-scroll';
	import split from 'components/split/split';
	import ratingselect from 'components/ratingselect/ratingselect';
  import {formatDate} from 'common/js/date';

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
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
			});
		},
    events: {

    },
    methods: {
      needShow(text, rateType) {
        if (!text && this.onlyContent) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return this.selectType === rateType;
        }
      },
      select(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggle() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
		components: {
			star,
			split,
			ratingselect
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

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
      .rating-wrapper
        padding 0 18px
        .rating-item
          display flex
          padding 18px 0
          border-1px(rgba(7, 17, 27, 0.1))
          &.fade-enter-active, &.fade-leave-active
            transition: all 0.2s ease
            opacity 1
          &.fade-enter,&.fade-leave-to
            opacity 0
          .avatar
            flex 0 0 28px
            width 28px
            margin-right 12px
            img
              border-radius 50%
          .content
            position relative
            flex 1
            .name
              margin-bottom 4px
              line-height 12px
              font-size 10px
              color rgb(7, 17, 27)
            .star-wrapper
              margin-bottom 6px
              font-size 0
              .delivery
                display inline-block
                vertical-align top
                line-height 12px
                font-size 10px
                font-weight 200
                color rgb(147, 153, 159)
              .star
                display inline-block
                vertical-align top
                margin-right 6px
            .text
              margin-bottom 8px
              font-size 12px
              line-height 18px
              color rgb(7, 17, 27)
            .recommend
              font-size 0
              line-height 16px
              .icon-thumb_up, .item
                display inline-block
                margin 0 8px 4px 0
              .icon-thumb_up
                font-size 12px
                color rgb(0, 160 ,220)
              .item
                padding 0 6px
                border 1px solid rgba(7, 17, 27, 0.1)
                border-radius 2px
                font-size 9px
                color rgb(147, 153, 159)
                background #fff
            .time
              position absolute
              top 0
              right 0
              line-height 12px
              font-size 10px
              font-weight 200
              color rgb(147, 153, 159)
</style>
