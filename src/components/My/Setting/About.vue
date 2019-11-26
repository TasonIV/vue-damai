<template>
  <div class="setting">
    <div class="setting-header">
      <i class="set-icon iconfont icon-zuo" @click="back()"></i>
      关于大麦
    </div>
    <div class="container">
      <div class="img-box">
        <img src="../../../../public/images/aliuser_logo.webp" alt />
      </div>
      <div class="name">
        <p>@by TasonIV</p>
        <p>仅用作学习交流使用</p>
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
      this.$emit("a-hide");
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

  .img-box {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%);
    width: 2.4rem;
    img {
      width: 100%;
      //   height: 100%;
    }
  }

    .name{
        font-size: .24rem;
        position: absolute;
        top: 42%;
        left: 50%;
        transform: translate(-50%);

        p{
            padding-bottom: .2rem;
            text-align: center;
        }
    }
}
</style>

