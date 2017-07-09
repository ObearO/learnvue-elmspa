<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="subCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
	import Vue from 'vue';

	export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
		    if (!event._constructed) {
		      return;
	      }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('ball', event.target);
        if (this.food.count === 1) {
	        this.$emit('addFood', this.food);
        }
      },
      subCart(event) {
	      if (!event._constructed) {
		      return;
	      }
	      this.food.count--;
	      if (this.food.count < 1) {
          this.$emit('removeFood', this.food);
        }
      }
    }
 };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .cart-decrease, .cart-increase
      vertical-align: top
      display inline-block
      padding: 6px
      transform translate3D(0, 0, 0)
      opacity 1
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s ease-out
      &.move-enter, &.move-leave-to
        opacity 0
        transform translate3D(24px, 0, 0)
        .inner
          transform: rotate(90deg)
      .inner
        display: inline-block
        height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s ease-out
        transform: rotate(0)
    .cart-count
      display inline-block
      vertical-align: top
      padding: 6px 0
      width: 12px
      text-align: center
      line-height: 24px
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-increase
      padding: 6px
      height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
</style>
