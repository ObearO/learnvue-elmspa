<template>
  <div class="seller" v-el:seller>
    <div class="seller-content">
      <div class="overview">
        <h1 class="name">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="service-desc">起送价</h2>
            <div class="content">
              {{seller.minPrice}}<span class="unit">元</span>
            </div>
          </li>
          <li class="block">
            <h2 class="service-desc">商家配送</h2>
            <div class="content">
              {{seller.deliveryPrice}}<span class="unit">元</span>
            </div>
          </li>
          <li class="block">
            <h2 class="service-desc">平均配送时间</h2>
            <div class="content">
              {{seller.deliveryTime}}<span class="unit">分钟</span>
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与参与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li v-for="item in seller.supports" class="activate">
            <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
            <span class="text">{{seller.supports[$index].description}}</span></li>
        </ul>
      </div>
      <split></split>
      <div class="pics" v-show="seller.pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" v-el:pics>
          <ul class="pic-list" v-el:pic>
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90" alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <div class="title">商家信息</div>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	import star from 'components/star/star';
	import BScroll from 'better-scroll';
	import split from 'components/split/split';
	import shopcart from 'components/shopcart/shopcart';
	import {saveToLocal, loadFromLocal} from 'common/js/store';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    ready() {
      this._initScroll();
      this._initPics();
    },
    watch: {
      'seller'() {
        this._initScroll();
        this._initPics();
      }
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    methods: {
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$els.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$els.pic.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$els.pics, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      },
      toggleFavorite(event) {
        if (!event.constructor) {
          return;
        } else {
          this.favorite = !this.favorite;
          saveToLocal(this.seller.id, 'favorite', this.favorite);
        }
      }
    },
    components: {
      star,
      split,
      shopcart
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position absolute
    top 174px
    left 0
    bottom 0
    width 100%
    overflow hidden
    .overview
      padding 18px
      .name
        margin-bottom 8px
        font-size 14px
        line-height 14px
        color rgb(7, 17, 27)
      .desc
        padding-bottom 18px
        font-size 0
        border-1px(rgba(7, 17, 27, 0.1))
        .star
          display inline-block
          vertical-align top
        .text
          display inline-block
          vertical-align top
          margin 0 4px 0 8px
          line-height 18px
          font-size 10px
          color rgb(77, 85, 93)
      .remark
        display flex
        padding-top 18px
        .block
          flex 1
          text-align center
          border-right 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border-right none
          .service-desc
            padding 0
            margin-bottom 4px
            font-size 10px
            line-height 10px
            color rgb(147, 153, 159)
          .content
            font-size 24px
            line-height 24px
            font-weight 200
            color: rgb(7, 17, 27)
            .unit
              font-size 10px
      .favorite
        position absolute
        width: 40px
        top 18px
        right 10px
        text-align center
        font-size 0
        .icon-favorite
          display block
          margin-bottom 4px
          font-size 24px
          line-height 24px
          color #d4d6d9
          &.active
            color rgb(240, 20 ,20)
        .text
          font-size 10px
          line-height 10px
          color rgb(77, 85 ,93)
    .bulletin
      padding 18px 18px 0 18px
      .title
        font-size 14px
        line-height 14px
        color rgb(7, 17, 27)
      .content-wrapper
        padding 8px 12px 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .content
          font-size 12px
          line-height 24px
          font-weight 200
          color rgb(240, 20, 20)
      .supports
        .activate
          padding 16px 12px
          font-size 0
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            &::after
              border none
          .icon
            display: inline-block
            vertical-align: top
            margin-right 6px
            width: 16px
            height: 16px
            background-size: 16px 16px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_4')
            &.discount
              bg-image('discount_4')
            &.guarantee
              bg-image('guarantee_4')
            &.invoice
              bg-image('invoice_4')
            &.special
              bg-image('special_4')
          .text
            font-size 12px
            font-weight 200
            line-height 16px
            color: rgb(7, 17, 27)
    .pics
      padding 18px
      .title
        margin-bottom 12px
        font-size 14px
        line-height 14px
        color rgb(7, 17, 27)
      .pic-wrapper
        width 100%
        overflow hidden
        white-space nowrap
        .pic-list
          font-size 0
          .pic-item
            display inline-block
            margin-right 6px
            width 120px
            height 90px
            &:last-child
              margin 0
    .info
      padding 18px 18px 0 18px
      .title
        padding-bottom 12px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size 14px
        line-height 14px
        color rgb(7, 17, 27)
      ul
        .info-item
          padding 16px 12px
          font-size 12px
          font-weight 200
          line-height 16px
          color: rgb(7, 17, 27)
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            &::after
              border none
</style>
