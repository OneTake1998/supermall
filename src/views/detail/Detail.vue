<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!-- <toast :message="message" :show="show" /> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
// import Toast from "components/common/toast/Toast";

import GoodsList from "components/content/goods/GoodsList";

import { itemListenerMixin, backTopMixin } from "common/mixin";
import { debouce } from "common/utils";
import { mapActions, mapGetters } from "vuex";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
    // Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      // message: "我人都傻了",
      // show: false
      // currentIndex: 0
    };
  },
  created() {
    //1.保存传入iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //2.1获取顶部的图片轮播数据

      let data = res.data.result;
      this.topImages = data.itemInfo.topImages;

      //2.2获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //2.3店铺信息
      this.shop = new Shop(data.shopInfo);

      //2.4商品详细
      this.detailInfo = data.detailInfo;

      //2.5商品参数
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //2.6评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //3.请求详情数据
    getRecommend().then(res => {
      this.recommends = res.data.data.list;
    });
    //4.给getThemeTopY赋值
    this.getThemeTopY = debouce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 40);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 40);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 50);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  mixins: [itemListenerMixin, backTopMixin],
  destoyed() {
    //2.取消全局事件的监听
    this.$bus.$off("itemImage", this.itemImgListenner);
  },
  methods: {
    ...mapActions(["addCart"]),
    addToCart() {
      //1.获取购物车展示数据
      let product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2.将商品添加到购物车
      // this.$store.commit('addCart',product)
      // this.$store.dispatch("addCart", product).then(res => console.log(res));
      this.addCart(product).then(res => {
        // console.log(this.$toast)
        this.$toast.show(res,700)
      });
    },
    imageLoad() {
      this.getThemeTopY();
      this.refresh();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      let positionY = -position.y;

      //2.将positionY的值和主题中的值进行对比
      let length = this.themeTopYs.length;

      //1.无最大值
      // for (let i = 0; i < length; i++) {
      //   if (
      //     this.$refs.nav.currentIndex !== i &&
      //     ((i < length - 1 &&
      //       positionY >= this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1]) ||
      //       (i === length - 1 && positionY >= this.themeTopYs[i]))
      //   ) {
      //     this.$refs.nav.currentIndex = i;
      //   }
      // }

      //2.设置最大值
      for (let i = 0; i < length - 1; i++) {
        if (
          this.$refs.nav.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.$refs.nav.currentIndex = i;
        }
      }

      //3.是否显示回到顶部
      this.listenShowBackTop(position);
    },
    backClick() {
      this.backTop();
    }
  }
};
</script>
<style  scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}
.content {
  height: calc(100vh - 93px);
}
</style>