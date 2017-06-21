<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount > 0}">
            <i class="icon-shopping_cart"  :class="{'highlight': totalCount > 0}"></i>
          </div>
          <div class="num" v-show="totalCount">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight': totalPrice > 0}">¥{{totalPrice}}</div>
        <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="{'enough': totalPrice >= minPrice}">
        <div class="pay">{{payDesc}}</div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls" v-show="ball.show" transition="drop" class="ball">
          <div class="inner inner-hook"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  	props: {
  		selectFoods: {
  			type: Array,
        default() {
  				return [];
        }
      },
	    deliveryPrice: {type: Number, default: 0},
      minPrice: {type: Number, default: 0}
    },
    data() {
  		return {
  			balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
		    dropBalls: []
      };
    },
    computed: {
  		totalPrice() {
  			let totalPrice = 0;
  			this.selectFoods.forEach((food) => {
  				totalPrice += food.price * food.count;
        });
  			return totalPrice;
      },
      totalCount() {
  		  let totalCount = 0;
  		  this.selectFoods.forEach((food) => {
          totalCount += food.count;
  		  });
	      return totalCount;
      },
      payDesc() {
  			if (this.totalPrice === 0) {
		      return `¥${this.minPrice}起送`;
        } else if (this.totalPrice < this.minPrice) {
  				let diff = this.minPrice - this.totalPrice;
		      return `还差¥${diff}起送`;
	      } else {
		      return '去结算';
	      }
      }
  	},
    methods: {
  		drop(el) {
  			for (let i = 0; i < this.balls.length; i++) {
  				let ball = this.balls[i];
  				if (!ball.show) {
  					ball.show = true;
  					ball.el = el;
  					this.dropBalls.push(ball);
  					return;
          }
        }
      }
    },
    transitions: {
  		drop: {
  			beforeEnter(el) {
  				let count = this.balls.length;
          while (count--) {
  					let ball = this.balls[count];
  					if (ball.show) {
  						let rect = ball.el.getBoundingClientRect();
              let x = rect.left - 32;
              let y = -(window.innerHeight - rect.top - 22);
              el.style.display = '';
              el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
              el.style.transform = `translate3d(0, ${y}px, 0)`;
              let inner = el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
              inner.style.transform = `translate3d(${x}px, 0, 0)`;
            }
          }
        },
        enter(el) {
  				/* eslint-disable no-unused-vars */
  				let rf = el.offsetHeight;
  				this.$nextTick(() => {
            el.style.webkitTransform = 'translate3d(0, 0, 0)';
            el.style.transform = 'translate3d(0, 0, 0)';
			      let inner = el.getElementsByClassName('inner-hook')[0];
			      inner.style.webkitTransform = 'translate3d(0, 0, 0)';
			      inner.style.transform = 'translate3d(0, 0, 0)';
          });
        },
        afterEnter(el) {
  				let ball = this.dropBalls.shift();
	        if (ball) {
		        ball.show = false;
	          el.style.display = 'none';
          }
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      color: #80858a
      .content-left
        flex: 1
        font-size: 10px
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255,255,255,0.1)
          font-size: 16px
          font-weight: 700
          line-height: 24px
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        text-align: center
        background: #2b333b
        .pay
          height: 48px
          line-height: 48px
          font-size: 12px
          font-weight: 700
        &.enough
          background: #00b43c
          color: #fff
      .ball-container
        .ball
          position: fixed
          left: 32px
          bottom: 22px
          z-index: 200
          &.drop-transition
            transition: all 0.4s cubic-bezier(0.54, -0.82, 1, 0.44)
            .inner
              width: 16px
              height: 16px
              border-radius: 50%
              background: rgb(0, 160, 220)
              transition: all 0.4s linear
</style>