<template>
  <div class="recommend">
    <!-- 头部 -->
    <div class="header border-1px">
      <span class="close iconfont icon-zuo" @click="back()"></span>
      <span class="title">电子钱包</span>
    </div>
    <div class="tabbar">
      <div class="focus" @click="changeActive(1)">
        退款
        <span class="line" :class="{active:active==1}"></span>
      </div>
      <div class="reply" @click="changeActive(2)">
        退款记录
        <span class="line" :class="{active:active==2}"></span>
      </div>
    </div>
    <div class="wrapper" v-show="active == 1">
      <div
        class="remind" v-show="isRemind"
      >尊敬的用户，您好！由于大麦网业务调整，大麦“电子钱包”功能已于2018年12月17日起停止服务，您已不能通过电子钱包进行付款。您可以申请电子钱包余额退款，包括超级票未充值部分均可申请退款，请您尽快操作。感谢您的理解和支持。
        <span class="re-icon iconfont icon-bacha" @click="hideRemind()"></span>
      </div>
      <div class="supper">
        <span class="supper-left">我有未充值超级票</span>
        <span class="supper-right">去退款</span>
      </div>
      <div class="ques-box">
        <div class="ques-title">--- 常见问题 ---</div>
        <div class="ques">
          <div class="q">问：申请退款后多长时间能到账？</div>
          <div class="q">答：自申请退款提交成功后1-7个工作日到账。</div>
        </div>
        <div class="ques">
          <div class="q">问：提醒的支付宝账户或银行账户与实名认证的账户不一样的怎么办？</div>
          <div class="q">答：为了您的财务安全，请提供与电子钱包实名认证一致的支付宝或银行卡信息。感谢您的理解与支持。</div>
        </div>
      </div>
    </div>
    <div class="container" v-show="active == 2">
      <img style="width:100%;height:100%" src="../../../public/images/realname_error.png" />亲~您还没有申请退款哦
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: 1,
    isRemind:true
  }),
  methods: {
    back() {
      this.$emit("w-back");
    },
    changeActive(n) {
      this.active = n;
    },
    hideRemind(){
      this.isRemind = false
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

.wrapper {
  .remind {
    padding: .3rem 0.7rem .3rem .3rem;
    font-size: 0.26rem;
    line-height: 0.4rem;
    color: #ff4d8e;
    background-color: #fce4ed;
    position: relative;

    .re-icon{
      position: absolute;
      top: 0;
      right: 0;
      width: .8rem;
      height: .8rem;
      line-height: .8rem;
      text-align: center;
      font-size: .26rem;
    }
  }

  .supper {
    padding: 0 0.3rem;
    height: 1.1rem;
    line-height: 1.1rem;
    font-size: 0.33rem;
    background-color: #fff;
    position: relative;

    .supper-right {
      position: absolute;
      top: .3rem;
      right: .3rem;
      font-size: 0.22rem;
      height: .5rem;
      line-height: .5rem;
      padding: 0 0.18rem;
      border-radius: 4px;
      border: 1px solid #ff4d8e;
      color: #ff4d8e;
    }
  }

  .ques-box {
    color: #666;
    background-color: #f0f0f0;

    .ques-title{
      font-size: .28rem;
      text-align: center;
      padding-top: .6rem;
    }

    .ques {
      padding: 0.3rem;
      line-height: .4rem;

      .q {
        font-size: 0.26rem;
      }
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
