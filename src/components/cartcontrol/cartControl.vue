<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="subCart"></div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click="addCart"></div>
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
      },
      subCart(event) {
	      if (!event._constructed) {
		      return;
	      }
	      this.food.count--;
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
      height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
    .cart-count
      display inline-block
      vertical-align: top
      padding: 6px
      width: 12px
      line-height: 24px
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-increase
      color: rgb(0, 160, 220)
</style>