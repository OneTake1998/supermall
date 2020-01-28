<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  components: {},

  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default() {
        return 0;
      }
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  mounted() {
    //1.创建BScrolll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    //2.监听位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", postion => {
        // console.log(postion);
        this.$emit("scroll", postion);
      });
    }

    //3.监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    }

    // console.log(this.scroll);
  },
  methods: {
    scrollTo(x = 0, y = 0, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0 ;
    }
  }
};
</script>
<style  scoped>
</style>