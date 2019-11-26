<template>
  <div class="setting">
    <div class="setting-header">
      <i class="set-icon iconfont icon-zuo" @click="back()"></i>
      账号安全
    </div>
    <div class="container">
      <div class="white-space border-1px"></div>
      <div class="cell-box">
        <span class="word">实名认证</span>
        <span class="icon-word">未认证</span>
        <i class="icon-right iconfont icon-you"></i>
      </div>
      <div class="white-space border-1px"></div>
      <div class="cell-box">
        <span class="word">更换手机号</span>
        <span class="icon-word">137****4452</span>
        <i class="icon-right iconfont icon-you"></i>
      </div>
      <div class="cell-box">
        <span class="word">登录密码</span>
        <span class="icon-word">设置登录密码</span>
        <i class="icon-right iconfont icon-you"></i>
      </div>
      <div class="cell-box">
        <span class="word">邮箱设置</span>
        <span class="icon-word">设置邮箱</span>
        <i class="icon-right iconfont icon-you"></i>
      </div>
      <div class="cell-box">
        <span class="word">第三方账号设置</span>
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
      this.$emit("s-hide");
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
      flex: 0 0 .4rem;
      width: .4rem;
      height: 1.1rem;
      line-height: 1.15rem;
      text-align: right;
      font-size: .24rem;
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

