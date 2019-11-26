<template>
  <div class="message">
    <!-- 头部 -->
    <div class="header border-1px">
      <span class="close iconfont icon-zuo" @click="back()"></span>
      <span class="title">消息</span>
    </div>

    <div class="container border-1px" @click="componentShow(1)">
      <div class="icon-box">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weinituijianx" />
        </svg>
      </div>
      <div class="con-box">
        <div class="time">1天前</div>
        <div class="con-title">为你推荐</div>
        <div class="content">【大麦双11】好久不见老朋友，麦麦给您送礼啦！8888元观演金礼包/华为Mate30/限量送！</div>
      </div>
    </div>

    <div class="container border-1px" @click="componentShow(2)">
      <div class="icon-box">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tongzhi2" />
        </svg>
      </div>
      <div class="con-box">
        <div class="con-title">一些通知</div>
        <div class="content">暂时没有新通知:-O</div>
      </div>
    </div>

    <div class="container border-1px" @click="componentShow(3)">
      <div class="icon-box">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-huifu1-copy" />
        </svg>
      </div>
      <div class="con-box">
        <div class="con-title">关注与回复</div>
        <div class="content">暂时没有新通知:-O</div>
      </div>
    </div>

    <div class="container border-1px" @click="componentShow(4)">
      <div class="icon-box">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-kefu-9" />
        </svg>
      </div>
      <div class="con-box">
        <div class="con-title">我的小蜜</div>
        <div class="content">有哪些疑惑？让小蜜来为您解答吧！</div>
      </div>
    </div>
    <transition name="slide">
      <Recommend @r-back="componentHide" v-if="componentNum == 1" />
      <Notice @n-back="componentHide" v-if="componentNum == 2" />
      <Focus @f-back="componentHide" v-if="componentNum == 3" />
      <Xiaomi @x-back="componentHide" v-if="componentNum == 4" />
    </transition>
  </div>
</template>



<script>
import Recommend from "../Message/Recommend";
import Notice from "../Message/Notice";
import Focus from "../Message/Focus";
import Xiaomi from "../Message/Xiaomi";

export default {
  data: () => ({
    componentNum: null
  }),
  components: {
    Recommend,
    Notice,
    Focus,
    Xiaomi
  },
  methods: {
    back() {
      this.$emit("n-hide");
    },
    componentShow(item) {
      this.componentNum = item;
      console.log(item);
    },
    componentHide() {
      this.componentNum = null;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../public/scss/index.scss";
@import "../../../public/scss/mixin.scss";

.message {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 99;

  .header {
    padding: 0 0.3rem;
    height: 1rem;
    text-align: center;
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

  .container {
    width: 100%;
    height: 1.9rem;
    // background-color: #ddd;
    padding: 0 0.2rem;
    display: flex;
    @include scale-border-bottom(rgba(7, 17, 27, 0.1));

    .icon-box {
      flex: 0 0 1.8rem;
      width: 1.8rem;
      height: 1.8rem;
      // background-color: #e49;
      font-size: 1.2rem;
      text-align: center;
      line-height: 1.8rem;
    }

    .con-box {
      flex: 1;
      padding-top: 0.26rem;
      position: relative;

      .time {
        position: absolute;
        right: 0;
        top: 0.5rem;
        font-size: 0.24rem;
        color: #777;
      }

      .con-title {
        height: 0.6rem;
        width: 5rem;
        margin: 0.2rem;
        margin-bottom: 0.1rem;
        font-size: 0.36rem;
        line-height: 0.6rem;
        // background-color: #ddd;
      }

      .content {
        height: 0.4rem;
        width: 5rem;
        margin: 0 0.2rem;
        font-size: 0.28rem;
        color: #999;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}

// 动画
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s linear;
}

.slide-enter-to,
.slide-leave {
  transform: translateX(0);
  opacity: 1;
}
</style>
