<template>
  <div class="sign">
    <div class="header">
      <i class="header-icon iconfont icon-zuo" @click="$router.go(-1)"></i>
    </div>
    <div class="content">
      <div class="cont-box">
        <div class="cont-img"></div>
      </div>
      <div class="cont-inp">
        <van-field v-model="username" clearable label="用户名" placeholder="请输入用户名" label-width="70" />

        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          clearable
          label-width="70"
          @keyup.enter="addUser()"
        />
      </div>
      <div class="btn" @click="addUser()">登陆</div>
      <div class="register" @click="$router.push('/register')">新用户注册</div>
      <!-- <router-link tag="div" class="register" :to="{name:"register"}">新用户注册</router-link> -->
    </div>
    <Warning v-show="$store.state.warning" :warningMsg="warningMsg" />
    <Myloading v-show="isloading" />
  </div>
</template>

<script>
import Myloading from "../components/Myloading";
import Warning from "../components/Warning";

export default {
  components: {
    Myloading,
    Warning
  },
  data: () => ({
    username: null,
    password: null,
    isloading: false,
    warningMsg:"请输入正确的用户名或密码！"
  }),
  methods: {
    addUser() {
      this.isloading = true;
      setTimeout(() => {
        this.$store.commit("testUser", {
          name: this.username,
          password: this.password,
          router: this.$router
        });
        this.isloading = false
      },1000);
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
  //   background-color: #ddd;

  .header-icon {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    font-size: 0.4rem;
    text-align: center;
    line-height: 1rem;
    float: left;
  }
}

.content {
  .cont-box {
    width: 100%;
    height: 3rem;
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .cont-img {
      width: 2.8rem;
      height: 1rem;
      background: url("../../public/images/aliuser_logo.webp") no-repeat center
        center;
      background-size: cover;
    }
  }

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
    text-align: center;
    color: #999;
  }
}
</style>
