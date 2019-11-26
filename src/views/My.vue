<template>
  <div class="my">
    <!-- 头部 -->
    <div class="header">
      <span class="title">我的</span>
      <div class="icon-box">
        <span class="icon1 iconfont icon-shezhi" @click="showSetting()"></span>
        <span class="icon2 iconfont icon-shinshopxiaoxi" @click="showNotice()"></span>
      </div>
    </div>

    <!-- 主体大盒子 -->
    <div class="container" ref="cont">
      <div class="wrapper">
        <!-- 头像部分 -->
        <div class="top">
          <div class="head-box" @click="login">
            <div class="head-left left1" v-show="!$store.state.isLogin"></div>
            <div class="head-left left2" v-show="$store.state.isLogin"></div>
            <div class="head-right">
              <div class="head-name" v-show="$store.state.isLogin">{{this.$store.state.currentName}}</div>
              <div class="head-name" v-show="!$store.state.isLogin">未登录</div>
              <div class="head-page" v-show="!$store.state.isLogin">点击登录</div>
              <div class="head-page" v-if="$store.state.isLogin">
                <span v-show="!$store.state.vipTime">普通用户</span>
                <span class="vipcolor" v-show="$store.state.vipTime">年度VIP会员</span>
              </div>
            </div>
          </div>

          <div class="head-select">
            <div class="menu" @click="showWant()">
              <span v-show="!$store.state.isLogin">0</span>
              <span v-show="$store.state.isLogin">{{$store.state.likePerformList.length}}</span>
              <span class="menu-type">想看的演出</span>
            </div>
            <div class="menu" @click="showFocus()">
              <span v-show="!$store.state.isLogin">0</span>
              <span v-show="$store.state.isLogin">{{$store.state.likeStarList.length}}</span>
              <span class="menu-type">我的关注</span>
            </div>
            <div class="menu" @click="showDiscuss()">
              <span v-show="!$store.state.isLogin">0</span>
              <span v-show="$store.state.isLogin">0</span>
              <span class="menu-type">待评价演出</span>
            </div>
            <div class="menu" @click="showCoupon()">
              <span v-show="!$store.state.isLogin">0</span>
              <span v-show="$store.state.isLogin">1</span>
              <span class="menu-type">优惠券</span>
            </div>
          </div>
        </div>

        <!-- vip开通 -->
        <div class="vip">
          <div class="vip-huiyuan">
          </div>
          <div
            class="vip-explain"
            v-show="!this.$store.state.vipTime && this.$store.state.isLogin"
          >含760元演出红包</div>
          <div
            class="vip-explain"
            v-show="this.$store.state.vipTime && this.$store.state.isLogin"
          >{{this.$store.state.vipTime}}</div>
          <div class="vip-explain" v-show="!this.$store.state.isLogin">请登录</div>
          <div
            class="vip-open"
            @click="showVip()"
            v-show="!this.$store.state.isLogin || !this.$store.state.vipTime"
          >立即开通</div>
          <div
            class="vip-open"
            @click="showVip()"
            v-show="this.$store.state.isLogin && this.$store.state.vipTime"
          >我要续费</div>
        </div>

        <!-- 内容区 -->
        <div class="content">
          <div class="content-bg"></div>

          <div class="list-cell border-1px" @click="showOrder()">
            <span class="cell-icon-left iconfont icon-icon-"></span>
            <span class="cell-content">我的订单</span>
            <span class="cell-icon-right iconfont icon-you"></span>
          </div>
          <div class="white-space"></div>

          <div class="list-cell border-1px" @click="showMan()">
            <span class="cell-icon-left iconfont icon-ren"></span>
            <span class="cell-content">常用观影人</span>
            <span class="cell-icon-right iconfont icon-you"></span>
          </div>

          <div class="list-cell border-1px" @click="showAddress()">
            <span class="cell-icon-left iconfont icon-buoumaotubiao23"></span>
            <span class="cell-content">收货地址</span>
            <span class="cell-icon-right iconfont icon-you"></span>
          </div>

          <div class="list-cell border-1px" @click="showXiaomi()">
            <span class="cell-icon-left iconfont icon-kefu"></span>
            <span class="cell-content">在线客服</span>
            <span class="cell-icon-right iconfont icon-you"></span>
          </div>
          <div class="list-cell border-1px" @click="showWallet()">
            <span class="cell-icon-left iconfont icon-qianbao"></span>
            <span class="cell-content">电子钱包</span>
            <span class="cell-icon-right iconfont icon-you"></span>
          </div>
          <div class="list-cell border-1px" @click="showHour()">
            <span class="cell-icon-left iconfont icon-gongyi1"></span>
            <span class="cell-content">3小时公益</span>
            <span class="cell-icon-right iconfont icon-you"></span>
          </div>

          <div class="white-content"></div>
        </div>
      </div>
    </div>
    <router-view></router-view>

    <transition name="slide">
      <Setting v-if="isSetting" @s-hide="hideSetting" @s-close="closeSetting()" />

      <Notice v-if="isNotice" @n-hide="hideNotice" />

      <Order v-if="isOrder" @o-hide="hideOrder" />

      <Xiaomi v-if="isXiaomi" @x-back="hideXiaomi" />

      <Wallet v-if="isWallet" @w-back="hideWallet" />

      <ThreeHour v-if="isHour" @t-back="hideHour" />

      <Vip v-if="isVip" @v-back="hideVip" />

      <Coupon v-if="isCoupon" @c-hide="hideCoupon" />

      <Discuss v-if="isDiscuss" @d-hide="hideDiscuss" />

      <Focus v-if="isFocus" @f-hide="hideFocus" />

      <Want v-if="isWant" @w-hide="hideWant" />
    </transition>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Setting from "../components/My/Setting";
import Notice from "../components/My/Notice";
import Order from "../components/My/Order";
import Xiaomi from "../components/Message/Xiaomi";
import Wallet from "../components/My/Wallet";
import ThreeHour from "../components/My/ThreeHour";
import Vip from "../components/My/Vip";
import Coupon from "../components/My/Tab/Coupon"; // 优惠券
import Discuss from "../components/My/Tab/Discuss"; // 待评价演出
import Focus from "../components/My/Tab/Focus"; // 我的关注
import Want from "../components/My/Tab/Want"; // 想看的演出

export default {
  components: {
    Setting,
    Notice,
    Order,
    Xiaomi,
    Wallet,
    ThreeHour,
    Vip,
    Coupon,
    Discuss,
    Focus,
    Want
  },
  data() {
    return {
      isSetting: false,
      isNotice: false,
      isOrder: false,
      isXiaomi: false,
      isWallet: false,
      isHour: false,
      isVip: false,
      isCoupon: false,
      isDiscuss: false,
      isFocus: false,
      isWant: false
    };
  },
  methods: {
    _initBscroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.cont, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    hideXiaomi() {
      this.isXiaomi = false;
    },
    showXiaomi() {
      if (this.$store.state.isLogin) {
        this.isXiaomi = true;
      } else {
        this.$router.push("/sign");
      }
    },
    showSetting() {
      if (this.$store.state.isLogin) {
        this.isSetting = true;
      } else {
        this.$router.push("/sign");
      }
    },
    hideSetting() {
      this.isSetting = false;
    },
    hideOrder() {
      this.isOrder = false;
    },
    showOrder() {
      if (this.$store.state.isLogin) {
        this.isOrder = true;
      } else {
        this.$router.push("/sign");
      }
    },
    hideNotice() {
      this.isNotice = false;
    },
    showNotice() {
      if (this.$store.state.isLogin) {
        this.isNotice = true;
      } else {
        this.$router.push("/sign");
      }
    },
    hideWallet() {
      this.isWallet = false;
    },
    showWallet() {
      if (this.$store.state.isLogin) {
        this.isWallet = true;
      } else {
        this.$router.push("/sign");
      }
    },
    showHour() {
      if (this.$store.state.isLogin) {
        this.isHour = true;
      } else {
        this.$router.push("/sign");
      }
    },
    hideHour() {
      this.isHour = false;
    },
    showVip() {
      if (this.$store.state.isLogin) {
        this.isVip = true;
      } else {
        this.$router.push("/sign");
      }
    },
    hideVip() {
      this.isVip = false;
    },
    showWant() {
      if (this.$store.state.isLogin) {
        this.isWant = true;
      }
    },
    hideWant() {
      this.isWant = false;
    },
    showFocus() {
      if (this.$store.state.isLogin) {
        this.isFocus = true;
      }
    },
    hideFocus() {
      this.isFocus = false;
    },
    showCoupon() {
      if (this.$store.state.isLogin) {
        this.isCoupon = true;
      }
    },
    hideCoupon() {
      this.isCoupon = false;
    },
    showDiscuss() {
      if (this.$store.state.isLogin) {
        this.isDiscuss = true;
      }
    },
    hideDiscuss() {
      this.isDiscuss = false;
    },
    showMan() {
      if (this.$store.state.isLogin) {
        this.$router.push("/my/man");
      } else {
        this.$router.push("/sign");
      }
    },
    showAddress() {
      if (this.$store.state.isLogin) {
        this.$router.push("/my/address");
      } else {
        this.$router.push("/sign");
      }
    },
    login() {
      if (!this.$store.state.isLogin) {
        this.$router.push("/sign");
      }
    },
    closeSetting() {
      this.isSetting = false;
    }
  },
  mounted() {
    this._initBscroll();
  },
  updated(){
    this._initBscroll();
  }
};
</script>

<style scoped lang="scss">
@import "../../public/scss/index.scss";
@import "../../public/scss/mixin.scss";

.header {
  padding: 0 0.3rem;
  height: 1.1rem;
  text-align: center;
  position: relative;
  color: #fff;
  background-color: #1b182b;
  // background-color: #fff;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  .title {
    font-size: 0.46rem;
    vertical-align: middle;
    position: relative;
    top: -0.1rem;
  }

  .icon-box {
    position: absolute;
    top: 0;
    right: 0;
    width: 2rem;
    height: 1.1rem;
    text-align: center;
    line-height: 1.1rem;
    // background-color: #ddd;
    display: flex;

    .icon1 {
      flex: 1;
      font-size: 0.44rem;
    }

    .icon2 {
      flex: 1;
      font-size: 0.46rem;
      margin-right: 0.1rem;
    }
  }
}

.container {
  // width: 100%;
  height: 100vh;
}

.top {
  padding: 1.6rem 0.3rem 1.2rem;
  // background-color: #f0f0f0;
  font-size: 0.4rem;
  color: #fff;
}

.head-box {
  display: flex;
  padding-bottom: 0.5rem;

  .head-left {
    flex: 0 0 1.6rem;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    // background-color: #e94;
    // background: url("../../public/images/touxiang.png") no-repeat center center;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;

    &.left1 {
      background-image: url("../../public/images/tou.png");
    }

    &.left2 {
      background-image: url("../../public/images/touxiang.png");
    }
  }

  .head-right {
    flex: 1;
    padding: 0.3rem 0.4rem;

    .head-name {
      font-size: 0.38rem;
      padding-bottom: 0.26rem;
    }

    .head-page {
      font-size: 0.24rem;
    }
  }
}
.vipcolor {
  // color: #e7bba2;
  color: #ffbe99;
}

.head-select {
  display: flex;

  .menu {
    flex: 1;
    text-align: center;

    span {
      display: block;
      font-size: 0.32rem;
    }

    .menu-type {
      font-size: 0.24rem;
      padding-top: 0.2rem;
    }
  }
}

.vip {
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 1.2rem;
  border-radius: 10px;
  background: url("../../public/images/vip_level_bg_1.png") no-repeat center
    center;
  background-size: 100%;
  z-index: 2;

  .vip-huiyuan {
    width: 1.6rem;
    height: 0.36rem;
    // background-color: #ddd;
    position: absolute;
    top: 0.16rem;
    left: 1.8rem;
    background: url("../../public/images/vip_level_tag_0.webp") no-repeat center
      center;
    background-size: 76%;
  }

  .vip-explain {
    font-size: 0.24rem;
    color: #e7bba2;
    position: absolute;
    top: 0.7rem;
    left: 1.96rem;
  }

  .vip-open {
    position: absolute;
    top: 50%;
    right: 0.4rem;
    transform: translateY(-50%);
    padding: 0.1rem 0.26rem;
    border-radius: 0.26rem;
    font-size: 0.3rem;
    color: #522912;
    background-color: #e7bba2;
  }
}

.content {
  padding-top: 0.6rem;
  background-color: #fff;
  position: relative;

  .list-cell {
    padding: 0.43rem 0;
    margin: 0 0.3rem;
    font-size: 0.32rem;
    @include scale-border-bottom(rgba(7, 17, 27, 0.2));

    .cell-icon-left {
    }

    .cell-content {
      padding-left: 0.2rem;
    }

    .cell-icon-right {
      float: right;
    }
  }
}

.white-space {
  width: 100%;
  height: 0.24rem;
  background-color: #f0f0f0;
}

.white-content {
  width: 100%;
  height: 3rem;
  box-sizing: content-box;
  background-color: #f0f0f0;
}

.content-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 130%;
  background-color: #f0f0f0;
  z-index: -1;
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
