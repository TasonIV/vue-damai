<template>
  <div class="sign">
    <div class="header">
      <i class="header-icon iconfont icon-zuo" @click="$router.go(-1)"></i>
      新用户注册
    </div>
    <div class="content">
      <div class="cont-inp">
        <van-field v-model.trim="username" clearable label="用户名" placeholder="请输入用户名" label-width="70" />

        <van-field
          v-model="password1"
          type="password"
          label="密码"
          placeholder="请输入密码"
          clearable
          label-width="70"
        />
        <van-field
          v-model="password2"
          type="password"
          label
          placeholder="请再次输入密码"
          clearable
          label-width="70"
        />
      </div>
      <div class="btn" @click="addUser()">同意协议并注册</div>
      <div class="register">
        我已阅读接受
        <span class="agreement" @click="showService()">《大麦网会员服务协议》</span> 和
        <span class="agreement" @click="showQuestion()">《隐私权转款条款》</span> 并同意自动注册成为会员
      </div>
    </div>

    <transition name="slide">
      <Question v-if="isQuestion" @q-back="hideQuestion()" />
      <Service v-if="isService" @s-back="hideService()" />
    </transition>

    <Warning v-show="warningShow" :warningMsg="warningMsg" />
    <Myloading v-show="isLoading" />
  </div>
</template>

<script>
import Question from "../components/My/Agreement/Question";
import Service from "../components/My/Agreement/Service";
import Warning from "../components/Warning";
import Myloading from "../components/Myloading";

export default {
  components: {
    Question,
    Service,
    Warning,
    Myloading
  },
  data: () => ({
    username: null,
    password1: null,
    password2: null,
    isQuestion: false,
    isService: false,

    warningMsg: null, // 警告信息
    warningShow: false, // 是否显示警告页面
    isLoading: false
  }),
  methods: {
    showQuestion() {
      this.isQuestion = true;
    },
    hideQuestion() {
      this.isQuestion = false;
    },
    hideService() {
      this.isService = false;
    },
    showService() {
      this.isService = true;
    },
    addUser() {
      this.checkMsg();
      if (this.warningMsg) {
        this.warningShow = true;
        setTimeout(() => {
          this.warningShow = false;
        }, 800);
      } else {
        setTimeout(() => {
          this.isLoading = false;
          this.$store.commit("addUser", {
            name: this.username,
            password: this.password1
          });
          this.$router.replace({ name: "sign" });
        }, 1500);
        this.isLoading = true;
      }
    },

    // 输入验证
    checkMsg() {
      let msgs = "";
      // 第一步：验证是否有空行内容
      // 第二步：验证所填信息是否合法
      let cName = /[A-Za-z0-9]{2,15}$/.test(this.username); // 用户名验证
      let cPassword = /[0-9]{6,12}$/.test(this.password1); // 密码验证
      // 循环验证
      for (let i = 0; i < 7; i++) {
        if (i == 0) {
          if (!this.username) {
            msgs = "请填写用户名！";
            break;
          }
          continue;
        } else if (i == 1) {
          if (!this.password1) {
            msgs = "请输入密码！";
            break;
          }
          continue;
        } else if (i == 2) {
          if (!this.password2) {
            msgs = "请再次输入密码！";
            break;
          }
          continue;
        } else if (i == 3) {
          if (this.password1 !== this.password2) {
            msgs = "两次输入的密码需相等!";
            break;
          }
          continue;
        } else if (i == 4) {
          if (!cName) {
            msgs = "用户名需在2-15个字符以内！";
            break;
          }
          continue;
        } else if (i == 5) {
          if (!cPassword) {
            msgs = "密码长度在6-12个字符之间！";
            break;
          }
          continue;
        } else {
          msgs = "";
          break;
        }
      }
      return (this.warningMsg = msgs);
    }
  }
};
</script>

<style scoped lang="scss">
.sign {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  background-color: #fff;
}

.header {
  height: 1rem;
  font-size: 0.4rem;
  text-align: center;
  line-height: 1rem;
  position: relative;
  //   background-color: #ddd;

  .header-icon {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    font-size: 0.4rem;
    text-align: center;
    line-height: 1rem;
    position: absolute;
    top: 0;
    left: 0;
  }
}

.content {
  margin-top: 1rem;

  .cont-inp {
    padding: 0 0.3rem;
  }

  .btn {
    margin: 0.5rem 0.3rem;
    height: 0.8rem;
    border-radius: 0.5rem;
    font-size: 0.36rem;
    line-height: 0.8rem;
    text-align: center;
    color: #fff;
    background-color: #ff4d8e;
  }

  .register {
    padding: 0 0.3rem;
    font-size: 0.26rem;
    // text-align: center;
    line-height: 0.4rem;
    color: #999;

    .agreement {
      color: #ff4d8e;
      text-decoration: underline;
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
