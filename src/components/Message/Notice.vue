<template>
  <div class="recommend">
    <!-- 头部 -->
    <div class="header border-1px">
      <span class="close iconfont icon-zuo" @click="back()"></span>
      <span class="title">一些通知</span>
    </div>

    <div class="wrapper">没有通知消息</div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$emit("n-back");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../public/scss/index.scss";
@import "../../../public/scss/mixin.scss";

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
  background-color: #fff;
  @include scale-border-bottom(rgba(7, 17, 27, 0.3));

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

.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  font-size: 0.35rem;
  color: #666;
}
</style>
