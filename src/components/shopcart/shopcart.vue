<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleList">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount > 0}">
              <i class="icon-shopping_cart"  :class="{'highlight': totalCount > 0}"></i>
            </div>
            <div class="num" v-show="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight': totalPrice > 0}">¥{{totalPrice}}</div>
          <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" :class="{'enough': totalPrice >= minPrice}" @click="pay">
          <div class="pay">{{payDesc}}</div>
        </div>
        <div class="ball-container">
          <transition-group name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div v-for="ball in balls" :key="ball" v-show="ball.show" class="ball">
              <div class="inner inner-hook"></div>
            </div>
          </transition-group>
        </div>
        <transition name="fold">
          <div class="cart-list" v-show="showCartList">
            <div class="list-header">
              <span class="header-left">购物车</span>
              <span class="header-right" @click="clearCart">清除</span>
            </div>
            <div class="list-content" ref="listContent">
              <ul>
                <li v-for="food in selectFoods" class="food">
                  <span class="name">{{food.name}}</span>
                  <div class="price">
                    <span>¥{{food.count*food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol @removeFood="removeFood" :food="food"></cartcontrol>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="showCartList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol';

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
		    dropBalls: [],
        showList: true
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
      },
      showCartList() {
  		  if (this.totalCount) {
  		    let show = !this.showList;
  		    if (show) {
  		      this.$nextTick(() => {
  		        if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.listContent, {
                  click: true
                });
              } else {
  		          this.scroll.refresh();
              }
            });
          }
  		    return show;
        } else {
  		    this.showList = true;
          return false;
        }
      }
  	},
    methods: {
      removeFood(Food) {
        this.$emit('removeFood', Food);
      },
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
      },
      toggleList() {
  		  if (this.totalCount) {
          this.showList = !this.showList;
        } else {
  		    return;
        }
      },
      clearCart() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
        this.selectFoods.splice(0, this.selectFoods.length);
      },
      pay() {
  			if (this.totalPrice < this.minPrice) {
  				return;
        } else {
  				window.alert(`支付${this.totalPrice}元`);
        }
      },
      beforeDrop(el) {
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
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0, 0, 0)';
          el.style.transform = 'translate3d(0, 0, 0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0, 0, 0)';
          inner.style.transform = 'translate3d(0, 0, 0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    },
    components: {
      cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
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
          &.drop-enter-active
            transition: all 0.4s  cubic-bezier(0.3, -0.7, 1, 0.44)
            .inner
              width: 16px
              height: 16px
              border-radius: 50%
              background: rgb(0, 160, 220)
              transition: all 0.4s linear
      .cart-list
        position: absolute
        top: 0
        left: 0
        width: 100%
        z-index: -1
        transform: translate3d(0, -100%, 0)
        opacity: 1
        &.fold-enter-active, &.fold-leave-active
          transition: all 0.5s
        &.fold-enter, &.fold-leave-to
          transform: translate3d(0, 0, 0)
          opacity: 0
        .list-header
          height: 40px
          line-height: 40px
          padding: 0 18px
          background: #f3f5f7
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          .header-left
            font-size: 14px
            font-weight: 200
            color: rgb(7, 17, 27)
          .header-right
            float: right
            font-size: 12px
            color: rgb(0, 160, 220)
        .list-content
          padding: 0 18px
          max-height: 217px
          overflow: hidden
          background: #fff
          .food
            position: relative
            padding: 12px 0
            box-sizing: border-box
            border-1px(rgba(7, 17, 27, 0.1))
            .name
              line-height: 24px
              font-size: 14px
              color: rgb(7, 17, 27)
            .price
              position: absolute
              right: 90px
              bottom: 12px
              line-height: 24px
              font-size: 14px
              font-weight: 700px
              color: rgb(240, 20, 20)
            .cartcontrol-wrapper
              position: absolute
              right: 0
              bottom: 6px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    opacity: 1
    background: rgba(7 , 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
      background: rgba(7 , 17, 27, 0)
</style>
