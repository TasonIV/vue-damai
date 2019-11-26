<template>
  <div class="recommend">
    <!-- 头部 -->
    <div class="header border-1px">
      <span class="close iconfont icon-zuo" @click="hideOrder()"></span>
      <span class="title">我的订单</span>
    </div>
    <div class="tabbar">
      <div class="focus" @click="changeActive(1)">
        全部
        <span class="line" :class="{active:active==1}"></span>
      </div>
      <div class="reply" @click="changeActive(2)">
        待付款
        <span class="line" :class="{active:active==2}"></span>
      </div>
      <div class="reply" @click="changeActive(3)">
        待收货
        <span class="line" :class="{active:active==3}"></span>
      </div>
    </div>
    <div class="container" v-show="active == 1">
      <img src="../../../public/images/common_error_net.webp" /> 暂无相关内容
    </div>
    <div class="container" v-show="active == 2">
      <img src="../../../public/images/common_error_ticket_empty.webp" />暂无相关内容
    </div>
    <div class="container" v-show="active == 3">
      <img src="../../../public/images/common_error_ticket_limit.webp" />暂无相关内容
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: 1
  }),
  methods: {
    hideOrder() {
      this.$emit("o-hide");
    },
    changeActive(n) {
      this.active = n;
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

.tabbar {
  display: flex;
  height: 1rem;
  font-size: 0.34rem;
  text-align: center;
  line-height: 1rem;
  background-color: #fff;

  .focus {
    flex: 1;
    position: relative;
  }

  .reply {
    flex: 1;
    position: relative;
  }

  .line {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0.6rem;
    height: 0.04rem;

    &.active {
      background-color: #ff4d8e;
    }
  }
}

.container {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%);
  font-size: 0.35rem;
  text-align: center;
  color: #666;
  img {
    width: 4rem;
    height: 4rem;
  }
}
</style>
