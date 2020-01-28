<template>
  <div class="wrapper">
    <ul class="content">
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Category",
  components: {},
  data() {
    return {
      scroll: null
    };
  },
  created() {},
  mounted() {
    this.scroll = new BScroll(".wrapper", {
      probeType: 3,
      pullUpLoad: true
    });

    this.scroll.on("scroll", postion => {
      console.log(postion);
    });

    this.scroll.on("pullingUp", () => {
      console.log("加载更多");
      this.scroll.finishUp();
    });
  }
};
</script>
<style  scoped>
.wrapper {
  background-color: aquamarine;
  height: 150px;
  /* overflow: hidden; */
}
</style>