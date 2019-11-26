<template>
  <div class="recommend">
    <!-- 头部 -->
    <div class="header border-1px">
      <span class="close iconfont icon-zuo" @click="hideCoupon()"></span>
      <span class="title">优惠券</span>
    </div>
    <div class="tabbar">
      <div class="focus" @click="changeActive(1)">
        未使用
        <span class="line" :class="{active:active==1}"></span>
      </div>
      <div class="reply" @click="changeActive(2)">
        已过期
        <span class="line" :class="{active:active==2}"></span>
      </div>
      <div class="reply" @click="changeActive(3)">
        已使用
        <span class="line" :class="{active:active==3}"></span>
      </div>
    </div>
    <div class="cell-box" v-show="active == 1">
      <div class="cell">
        <div class="left">
          <div class="price">
            <span>￥</span>20
          </div>
          <div class="man">满380可用</div>
        </div>
        <div class="center">
          <div class="cen-title">【大麦双11优惠券】</div>
          <div class="cen-time">有效期：2019.06.16-2019.12.16</div>
        </div>
        <div class="right">
          <div class="use">去使用</div>
        </div>
      </div>
    </div>
    <div class="container" v-show="active == 2">
      <img src="../../../../public/images/common_error_ticket_empty.webp" />暂无相关内容
    </div>
    <div class="container" v-show="active == 3">
      <img src="../../../../public/images/common_error_ticket_limit.webp" />暂无相关内容
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: 1
  }),
  methods: {
    hideCoupon() {
      this.$emit("c-hide");
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

.cell-box {
  padding: 0.4rem;
  font-size: 0.36rem;
}
.cell {
  height: 2rem;
  background: #fff;
  display: flex;

  .left {
    flex: 0 0 1.8rem;
    width: 1.8rem;
    height: 2rem;
    padding: .3rem;

    .price{
      font-size: .5rem;
      font-weight: bold;
      color: #ff4d8e;
      padding: .2rem 0;

      span{
        font-size: .22rem;
      }
    }

    .man{
      font-size: .2rem;
      color: #999;
    }

  }

  .center{
    flex: 1;

    .cen-title{
      font-size: .34rem;
      padding: .54rem 0 .31rem 0;
    }

    .cen-time{
      width: 3.4rem;
      font-size: .2rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #999;
    }
  }

  .right{
    flex: 0 0 1.6rem;
    width: 1.6rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .use{
      display: inline-block;
      padding: .1rem .2rem;
      font-size: .26rem;
      border:1px solid #ff4d8e;
      border-radius: .4rem;
      color: #ff4d8e;
    }
  }
}
</style>
