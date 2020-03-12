<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  components: {},
  data() {
    return {};
  },
  props: {},
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  methods: {
    show(message, duration = 500) {
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    }
  }
};
</script>
<style  scoped>
.toast {
  position: fixed;
  padding: 8px 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 9;
  border-radius: 15%;
}
</style>