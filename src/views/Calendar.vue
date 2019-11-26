<template>
  <div class="calendar">
    <div class="header">
      <div class="cal-icon iconfont icon-zuo" @click="$router.go(-1)"></div>演出日历
    </div>

    <div class="img-box">
      <img src="../../public/images/realname_error.png" alt />
    </div>
    <div class="text">敬请期待~</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import "../../public/scss/index.scss";
@import "../../public/scss/mixin.scss";

.calendar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  background-color: #fff;
}

.header {
  height: 1rem;
  font-size: 0.42rem;
  line-height: 1rem;
  text-align: center;
  position: relative;
  @include scale-border-bottom(rgba(7, 17, 27, 0.1));

  .cal-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
  }
}

  .img-box {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%);
      width: 4rem;

      img{
          width: 100%;
      }
  }

  .text{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%);
      font-size: .36rem;
      color: #f378a5;
  }

</style>
