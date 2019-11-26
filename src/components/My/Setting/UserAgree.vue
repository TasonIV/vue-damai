<template>
  <div class="setting">
    <div class="setting-header">
      <i class="set-icon iconfont icon-zuo" @click="back()"></i>
      用户协议
    </div>
    <div class="container">
      <div class="white-space border-1px"></div>
      <div class="cell-box" @click="showService()">
        <span class="word">麦芒会员服务协议</span>
        <i class="icon-right iconfont icon-you"></i>
      </div>
      <div class="white-space border-1px"></div>
      <div class="cell-box" @click="showQuestion()">
        <span class="word">会员权益规则</span>
        <i class="icon-right iconfont icon-you"></i>
      </div>
    </div>

    <transition name="slide">
      <Service v-if="isService" @s-back="hideService()" />
      <Question v-if="isQuestion" @q-back="hideQuestion()" />
    </transition>
  </div>
</template>

<script>
import Service from "../Agreement/Service";
import Question from "../Agreement/Question";

export default {
  components: {
    Service,
    Question
  },
  data: () => ({
    isService: false,
    isQuestion: false
  }),
  methods: {
    back() {
      this.$emit("u-hide");
    },
    showService() {
      this.isService = true;
    },
    hideService() {
      this.isService = false;
    },
    showQuestion() {
      this.isQuestion = true;
    },
    hideQuestion() {
      this.isQuestion = false;
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

