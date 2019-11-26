<template>
  <div class="recommend">
    <!-- 头部 -->
    <div class="header border-1px">
      <span class="close iconfont icon-zuo" @click="back()"></span>
      <span class="title">大麦VIP会员</span>
    </div>
    <div class="container">
      <div class="content">
        <div class="cell">
          <div class="cell-left"></div>
          <div class="cell-right">
            <div class="name">麦子17Bi3</div>
            <div class="huiyuan" v-show="!this.$store.state.vipTime">会员未开通</div>
            <div class="huiyuan" v-show="this.$store.state.vipTime">{{$store.state.vipTime}}</div>
          </div>
          <div class="jifen">
            积分
            <i class="ji-icon iconfont icon-you"></i>
          </div>
        </div>
        <div class="card">
          <span class="xianshi">限时特惠</span>
          <div class="card-box">
            <span class="money">￥</span>
            <span class="price">129</span>
            <span class="order-price">原价￥199</span>
          </div>
          <span class="day">有效期：365天</span>
        </div>
      </div>
      <div class="bg">
        <img src="../../../public/images/vip-bg.png" alt />
      </div>
    </div>

    <div class="footer">
      <div class="xieyi">
        <input type="checkbox" v-model="isChecked" />
        我已阅读并同意
        <span @click="showService()">《大麦网付费会员协议》</span>和
        <span @click="showQuestion()">《权益规则》</span>
      </div>
      <div class="btn" @click="buy()">￥129立即购买</div>
    </div>

    <transition name="slide">
      <Service v-if="isService" @s-back="hideService()" />
      <Question v-if="isQuestion" @q-back="hideQuestion()" />
    </transition>
  </div>
</template>

<script>
import Service from "./Agreement/Service";
import Question from "./Agreement/Question";
import { Toast, Dialog } from "vant";

export default {
  components: {
    Service,
    Question
  },
  data: () => ({
    isChecked: false,
    isService: false,
    isQuestion: false
  }),
  methods: {
    back() {
      this.$emit("v-back");
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
    },
    buy() {
      if (!this.isChecked) {
        Toast("请仔细阅读并同意协议"); // 提示框
      } else {
        Dialog.confirm({
          title: "付款确认",
          message: "是否确认支付￥129？",
          beforeClose(action, done) {
            // 异步弹窗
            if (action === "confirm") {
              setTimeout(done, 1000);
            } else {
              done();
            }
          }
        })
          .then(() => {
            this.$store.commit("openVip")
            Dialog.alert({
              title: "开通成功",
              message: `会员到期时间为 ${this.$store.state.vipTime}`
            }).then(() => {
              this.back();
            });
          })
          .catch(() => {
            // console.log("取消按钮");
          });
      }
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
  background-color: #e7bba2;
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
  position: fixed;
  top: 1rem;
  left: 0;
  right: 0;
  bottom: 1.9rem;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.content {
  padding: 0.3rem 0.5rem 2rem 0.5rem;
  position: relative;

  .cell {
    display: flex;

    .cell-left {
      flex: 0 0 1.3rem;
      width: 1.3rem;
      height: 1.3rem;
      border: 2px solid rgb(245, 142, 83);
      border-radius: 50%;
      background-image: url("../../../public/images/tou.png");
      background-position: center center;
      background-size: cover;
    }

    .cell-right {
      flex: 1;
      padding: 0 0.34rem;

      .name {
        font-size: 0.34rem;
        padding: 0.3rem 0 0.2rem 0;
      }
      .huiyuan {
        font-size: 0.24rem;
        color: #4d311a;
      }
    }

    .jifen {
      flex: 0 0 1.3rem;
      width: 1.3rem;
      height: 1.3rem;
      font-size: 0.24rem;
      color: #4d311a;
      text-align: right;

      .ji-icon {
        font-size: 0.2rem;
        vertical-align: middle;
      }
    }
  }

  .card {
    position: absolute;
    bottom: -40%;
    left: 0.5rem;
    right: 0.5rem;
    height: 3rem;
    border-radius: 10px;
    overflow: hidden;
    background: url("../../../public/images/vip-nian.png") center center
      no-repeat;
    background-size: cover;

    .xianshi {
      padding: 0.08rem 0.1rem;
      // width: 1rem;
      // height: .4rem;
      position: absolute;
      top: 0.3rem;
      right: 0.3rem;
      font-size: 0.22rem;
      border-radius: 4px;
      background-color: #e7bba2;
    }

    .card-box {
      position: absolute;
      top: 1.1rem;
      left: 0.2rem;
      font-size: 0.4rem;
      color: #e7bba2;

      .money {
      }
      .price {
        font-size: 0.6rem;
      }
      .order-price {
        padding-left: 0.2rem;
        font-size: 0.26rem;
        text-decoration: line-through;
      }
    }
    .day {
      position: absolute;
      bottom: 0.3rem;
      right: 0.3rem;
      font-size: 0.26rem;
      color: #d4c3b2;
    }
  }
}

.bg {
  padding-top: 2rem;
  background-color: #fff;

  img {
    width: 100%;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2rem;
  font-size: 0.24rem;
  box-shadow: 0 0 4px 0 rgba(0, 17, 27, 0.1);
  background-color: #fff;
  padding: 0.3rem 0.5rem;

  .xieyi {
    padding-bottom: 0.2rem;

    input {
      vertical-align: middle;
    }

    span {
      color: rgb(207, 138, 78);
    }
  }

  .btn {
    height: 0.9rem;
    font-size: 0.36rem;
    text-align: center;
    line-height: 0.9rem;
    border-radius: 0.5rem 0.5rem 0.5rem 0;
    color: #e7bba2;
    background-color: #000;
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
