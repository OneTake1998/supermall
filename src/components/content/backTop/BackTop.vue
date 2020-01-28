<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  components: {},
  data() {
    return {};
  },
  methods: {
    // backClick() {
    //   console.log("回到顶部");
    //   this.$eimt("backClick")
    // }
  }
};
</script>
<style  scoped>
.back-top {
  position: fixed;
  right: 10px;
  bottom: 55px;
}
.back-top img {
  width: 43px;
  height: 43px;
}
</style>