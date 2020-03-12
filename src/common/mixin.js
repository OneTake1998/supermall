import {debouce} from './utils';
import BackTop from 'components/content/backTop/BackTop';
import {BACK_POSITION} from 'common/const';
import {POP, NEW, SELL} from "./const";
// import {POP, SELL, NEW} from "@/common/const";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListenner: null,
      refresh:null
    }
  },
  mounted() {
    //1.监听item中图片加载完成
    this.refresh = debouce(this.$refs.scroll.refresh, 100);

    //对监听的事件进行保存
    this.itemImgListenner = () => {
      this.refresh();
    };

    this.$bus.$on("imageLoad", this.itemImgListenner);

  }
}

export const backTopMixin = {
  data(){
      return{
          isShowBackTop: false,
      }
  },
  components:{
      BackTop,
  },
  methods:{
      backTop(){
          this.$refs.scroll.scrollTo(0, 0, 300);
      },
      listenShowBackTop(position){
          this.isShowBackTop = -position.y > BACK_POSITION;
      }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}