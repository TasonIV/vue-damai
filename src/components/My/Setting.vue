<template>
  <div class="setting">
    <div class="setting-header">
      <i class="set-icon iconfont icon-zuo" @click="hideSetting()"></i>
      设置
    </div>
    <div class="container">
      <div class="white-space border-1px"></div>
      <div class="cell-box" @click="showSafe()">
        <!-- <i class="icon-left iconfont icon-lajitong"></i> -->
        <div class="icon-left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zhanghaoanquan1" />
          </svg>
        </div>
        <span class="word">账号安全</span>
        <i class="icon-right iconfont icon-you"></i>
        <!-- <span class="icon-word">已开启</span> -->
      </div>
      <div class="white-space border-1px"></div>
      <div class="cell-box" @click="empty()">
        <div class="icon-left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-qingkonghuancun" />
          </svg>
        </div>
        <span class="word">清空缓存</span>
        <i class="icon-right iconfont icon-you"></i>
        <!-- <span class="icon-word">已开启</span> -->
      </div>
      <div class="cell-box" @click="update()">
        <div class="icon-left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jianchagengxin" />
          </svg>
        </div>
        <span class="word">检查更新</span>
        <i class="icon-right iconfont icon-you"></i>
        <!-- <span class="icon-word">已开启</span> -->
      </div>
      <div class="white-space border-1px"></div>
      <div class="cell-box" @click="newMsg()">
        <div class="icon-left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tongzhi" />
          </svg>
        </div>
        <span class="word">接受新消息通知</span>
        <span class="icon-word" v-show="isMsg">已开启</span>
        <span class="icon-word" v-show="!isMsg">已关闭</span>
      </div>
      <div class="white-space border-1px"></div>
      <div class="cell-box" @click="showHide()">
        <div class="icon-left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bangzhu1" />
          </svg>
        </div>
        <span class="word">帮助中心</span>
        <i class="icon-right iconfont icon-you"></i>
        <!-- <span class="icon-word">已开启</span> -->
      </div>
      <div class="cell-box" @click="showAgree()">
        <div class="icon-left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xieyi" />
          </svg>
        </div>
        <span class="word">用户协议</span>
        <i class="icon-right iconfont icon-you"></i>
        <!-- <span class="icon-word">已开启</span> -->
      </div>
      <div class="cell-box" @click="showAbout()">
        <div class="icon-left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-guanyu" />
          </svg>
        </div>
        <span class="word">关于大麦</span>
        <i class="icon-right iconfont icon-you"></i>
        <!-- <span class="icon-word">已开启</span> -->
      </div>
      <div class="cell-box" @click="tishi()">
        <div class="icon-left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-kefudianhuaicon" />
          </svg>
        </div>
        <span class="word">客服电话</span>
        <span class="icon-word">1010-3721</span>
      </div>
      <div class="cell-box" @click="showOpinion()">
        <div class="icon-left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yijianfankui" />
          </svg>
        </div>
        <span class="word">意见反馈</span>
        <i class="icon-right iconfont icon-you"></i>
        <!-- <span class="icon-word">已开启</span> -->
      </div>
    </div>
    <div class="quit-box" v-if="$store.state.isLogin">
      <div class="quit" @click="quit()">退出登录</div>
    </div>
    <transition name="slide">
      <Safe v-if="isSafe" @s-hide="hideSafe()" />
      <Help v-if="isHelp" @h-hide="hideHelp()" />
      <UserAgree v-if="isAgree" @u-hide="hideAgree()" />
      <About v-if="isAbout" @a-hide="hideAbout()" />
      <Opinion v-if="isOpinion" @o-hide="hideOpinion()" />
    </transition>

    <Myloading v-if="isLoading" />
  </div>
</template>

<script>
import { Toast } from "vant";
import Safe from "./Setting/Safe";
import Help from "./Setting/Help";
import UserAgree from "./Setting/UserAgree";
import About from "./Setting/About";
import Opinion from "./Setting/Opinion";
import Myloading from "../Myloading";

export default {
  components: {
    Safe,
    Help,
    UserAgree,
    About,
    Opinion,
    Myloading
  },
  data: () => ({
    isSafe: false,
    isMsg: false,
    isHelp: false,
    isAgree: false,
    isAbout: false,
    isOpinion: false,
    isLoading: false
  }),
  methods: {
    hideSetting() {
      this.$emit("s-hide");
    },
    hideSafe() {
      this.isSafe = false;
    },
    showSafe() {
      this.isSafe = true;
    },
    empty() {
      Toast.loading({
        message: "清理中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 1200
      });
      setTimeout(() => {
        Toast.success({
          message: "清空完毕",
          duration: 1000
        });
      }, 1200);
    },
    update() {
      Toast.loading({
        message: "检测中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 1500
      });
      setTimeout(() => {
        Toast.success({
          message: "已是最新版本",
          duration: 1000
        });
      }, 1500);
    },
    newMsg() {
      Toast.loading({
        forbidClick: true,
        loadingType: "spinner",
        duration: 500
      });
      setTimeout(() => {
        this.isMsg = !this.isMsg;
      }, 500);
    },
    hideHelp() {
      this.isHelp = false;
    },
    showHide() {
      this.isHelp = true;
    },
    hideAgree() {
      this.isAgree = false;
    },
    showAgree() {
      this.isAgree = true;
    },
    hideAbout() {
      this.isAbout = false;
    },
    showAbout() {
      this.isAbout = true;
    },
    tishi() {
      Toast({
        message: "1010-3721",
        duration: 800
      });
    },
    hideOpinion() {
      this.isOpinion = false;
    },
    showOpinion() {
      this.isOpinion = true;
    },
    quit() {
      this.isLoading = true;
      setTimeout(() => {
        this.$store.commit("quitUser");
        this.$emit("s-close");
      },1000);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../public/scss/index.scss";
@import "../../../public/scss/mixin.scss";

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
      flex: 0 0 1.4rem;
      width: 1.4rem;
      height: 1.1rem;
      line-height: 1.1rem;
      text-align: right;
    }

    .word {
      flex: 1;
      font-size: 0.34rem;
    }

    .icon-word {
      font-size: 0.26rem;
      color: #999;
    }
  }
}

.white-space {
  width: 100%;
  height: 0.2rem;
  background-color: #f0f0f0;
}

.quit-box {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1.2rem;
  background-color: #fff;

  .quit {
    margin: 0.2rem 0.3rem;
    height: 0.8rem;
    font-size: 0.33rem;
    text-align: center;
    line-height: 0.8rem;
    border-radius: 0.4rem;
    color: #fff;
    background-color: #ff4d8e;
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
