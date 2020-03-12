<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->

    <cart-list />

    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartBottomBar from "./childComps/CartBottomBar";
import CartList from "./childComps/CartList";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: { NavBar, CartList, CartBottomBar },
  data() {
    return {};
  },
  computed: {
    //1.两种方法
    // ...mapGetters(['cartLength'])
    //2.
    ...mapGetters({
      length: "cartLength"
      // list: "carList"
    })
  }
};
</script>
<style  scoped>
.cart {
  height: 100vh;
  overflow: hidden;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>