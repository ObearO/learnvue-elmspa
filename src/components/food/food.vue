<template>
  <div class="food" v-show="showFlag" transition="move" v-el:food>
    <div class="food-content">
      <div class="img-header">
        <img :src="food.image" alt="">
        <div class="back" @click="leave()">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol';

  export default {
  	props: {
	    food: {
  			type: Object
      }
    },
    data() {
  		return {
  			showFlag: false
      };
    },
    methods: {
  		show() {
  			this.showFlag = true;
  			this.$nextTick(() => {
  				if (!this.scroll) {
  					this.scroll = new BScroll(this.$els.food, {
  						click: true
            });
          } else {
  					this.scroll.refresh();
          }
        });
      },
      leave() {
  			this.showFlag = false;
      }
    },
    components: {
  		cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background #fff
    &.move-transition
      transition all 0.2s linear
      opacity 1
      transform translate3d(0, 0, 0)
    &.move-enter, &.move-leave
      transform translate3d(100%, 0, 0)
      opacity 0.5
    .img-header
      position relative
      width 100%
      height 0
      padding-top 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0
        .icon-arrow_lift
          display block
          padding 10px
          font-size 20px
          color #fff
    .content
      position relative
      padding 18px
      .title
        font-size 14px
        font-weight 700
        color rgb(7,17,27)
        line-height 14px
      .detail
        margin-top 8px
        font-size 10px
        color rgb(147,153,159)
        line-height 10px
        .rating
          margin-left 12px
      .price
        margin-top 16px
        line-height 24px
        font-weight 700
        .now
          margin-right 8px
          font-size 14px
          color rgb(240,20,20)
        .old
          text-decoration line-through
          font-size 10px
          color rgb(147,153,159)
      .cartcontrol-wrapper
        position absolute
        right 12px
        bottom 12px
      .buy
        position absolute
        right 18px
        bottom 18px
        padding 6px 12px
        z-index 10
        height 24px
        line-height 12px
        font-size 10px
        box-sizing border-box
        border-radius 12px
        color #fff
        background-color rgb(0,160,220)
</style>