<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" class="recommend-item" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {},
  data() {
    return {};
  }
};
</script>
<style  scoped>
.recommend {
  display: flex;
  text-align: center;
  font-size: 12px;

  padding: 5px 0 10px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: auto;
  margin: 5px;
}
.recommend-item img {
  max-width: 100%;
  margin-bottom: 3px;
}
</style>