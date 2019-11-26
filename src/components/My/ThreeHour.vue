<template>
  <div class="recommend">
    <!-- 头部 -->
    <div class="header border-1px">
      <span class="close iconfont icon-zuo" @click="back()"></span>
      <span class="title">3小时公益</span>
    </div>
    <div class="container">
      <img style="width:100%;height:100%" src="../../../public/images/realname_error.png" />敬请期待~
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: 1,
    isRemind: true
  }),
  methods: {
    back() {
      this.$emit("t-back");
    },
    changeActive(n) {
      this.active = n;
    },
    hideRemind() {
      this.isRemind = false;
    }
  }
};
</script>

<style scoped lang="scss">
.recommend {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f0f0f0;
  z-index: 20;
}

.header {
  padding: 0 0.3rem;
  height: 1rem;
  text-align: center;
  background: #fff;

  .close {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 1rem;
    height: 1rem;
    font-size: 0.4rem;
    line-height: 1rem;
    text-align: center;
  }

  .title {
    font-size: 0.42rem;
    vertical-align: middle;
    position: relative;
    top: -0.14rem;
  }
}

.container {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%);
  font-size: 0.32rem;
  text-align: center;
  color: #666;
}
</style>
