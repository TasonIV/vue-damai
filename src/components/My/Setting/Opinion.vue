<template>
  <div class="setting">
    <div class="setting-header">
      <i class="set-icon iconfont icon-zuo" @click="back()"></i>
      我要反馈
    </div>
    <div class="container">
      <div class="type">请选择您的反馈类型</div>
      <div class="cell-box">
        <span class="word">【客服】在这里</span>
        <i class="icon-right iconfont icon-you"></i>
      </div>
      <div class="white-space border-1px"></div>
      <div class="cell-box">
        <span class="word">【建议】功能吐槽或建议</span>
        <i class="icon-right iconfont icon-you"></i>
      </div>
      <div class="cell-box">
        <span class="word">【黄牛】举报入口 ---已处理283个牛</span>
        <i class="icon-right iconfont icon-you"></i>
      </div>
      <div class="cell-box">
        <span class="word">【购票、订单】问题</span>
        <i class="icon-right iconfont icon-you"></i>
      </div>
      <div class="cell-box">
        <span class="word">【换验票】问题</span>
        <i class="icon-right iconfont icon-you"></i>
      </div>
      <div class="cell-box">
        <span class="word">【显示、内容】错误</span>
        <i class="icon-right iconfont icon-you"></i>
      </div>
      <div class="cell-box">
        <span class="word">【其他】</span>
        <i class="icon-right iconfont icon-you"></i>
      </div>
      <div class="cell-box">
        <span class="word">【投诉】</span>
        <i class="icon-right iconfont icon-you"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isSetting: true
  }),
  methods: {
    back() {
      this.$emit("o-hide");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../../public/scss/index.scss";
@import "../../../../public/scss/mixin.scss";

.setting {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 20;
  background-color: #f0f0f0;
}

.setting-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 1rem;
  font-size: 0.44rem;
  text-align: center;
  line-height: 1rem;
  background-color: #fff;

  .set-icon {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0.4rem;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
  }
}

.container {
  position: fixed;
  top: 1rem;
  left: 0;
  right: 0;
  bottom: 0;

  .type {
    padding: 0 0.3rem;
    height: 1rem;
    font-size: 0.26rem;
    line-height: 1.06rem;
  }

  .cell-box {
    height: 1.1rem;
    line-height: 1.1rem;
    display: flex;
    padding: 0 0.3rem;
    background-color: #fff;
    @include scale-border-bottom(rgba(7, 17, 27, 0.1));

    .icon-left {
      flex: 0 0 0.7rem;
      width: 0.7rem;
      height: 1.1rem;
      line-height: 1.1rem;
      text-align: left;
      font-size: 0.44rem;
      width: 100%;
    }

    .icon-right {
      flex: 0 0 0.4rem;
      width: 0.4rem;
      height: 1.1rem;
      line-height: 1.15rem;
      text-align: right;
      font-size: 0.24rem;
    }

    .word {
      flex: 1;
      font-size: 0.32rem;
    }

    .icon-word {
      font-size: 0.3rem;
      color: #999;
    }
  }
}

.white-space {
  width: 100%;
  height: 0.2rem;
  background-color: #f0f0f0;
}
</style>

