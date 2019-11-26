<template>
  <div class="ticket">
    <!-- 头部 -->
    <div class="header">
      <span class="title">票夹</span>
    </div>
    <!-- 标语 -->
    <div class="slogan">
      去现场给自己的生活加点儿戏
      <span class="slogan-img"></span>
    </div>

    <!-- 空白票夹 -->
    <div class="ticket-box" v-show="!buyList.length">
      <div class="bg"></div>
      <div class="word-box">
        <div class="empty">你的票夹空空哒</div>
        <div class="show">快去看一场演出吧ヾ(o◕∀◕)ﾉヾ</div>
        <div class="login" v-show="!this.$store.state.isLogin" @click="login()">登录</div>
      </div>
    </div>
    <!-- 
      address: "番禺区市桥光明南路7号"
      buyTime: "2019-11-24 10:50:47"
      data: Object
      img: "https://img.alicdn.com/bao/uploaded/i2/2251059038/O1CN01dbLaNB2GdSCsEBqMu_!!0-item_pic.jpg"
      num: 2
      price: 256
      time: "2019-10-27 周日 10:30"
      title: "2019大型亲子动漫舞台剧 《魔力课堂-奇幻之旅》"
      unitPrice: 128
    -->

    <!-- 有东西票夹 -->
    <div class="container" v-show="buyList.length">
      <!-- 票夹列表 -->
      <div class="wrapper" v-if="!detail">
        <div
          class="cell border-1px"
          v-for="(item,index) in buyList"
          :key="index"
          @click="saveDetail(item)"
        >
          <div class="img-box">
            <img :src="item.img" alt />
          </div>
          <div class="content-box">
            <div class="cell-title">{{item.title}}</div>
            <div class="cell-ticket-num">
              <span class="text">观演门票：</span>
              <span class="cell-price">￥{{item.unitPrice}}</span>
              ×&nbsp;
              <span class="cell-num">{{item.num}}</span>
              <span class="cell-price">&nbsp;张</span>
            </div>
            <div class="cell-time">
              <span class="text">观演时间：</span>
              {{item.time}}
            </div>
            <div class="cell-address">
              <span class="text">观演地址：</span>
              {{item.address}}
            </div>
          </div>
          <i class="cell-btn iconfont icon-you"></i>
        </div>
      </div>

      <!-- 票夹详情 -->
      <div class="big-box" v-if="ani">
        <transition name="slide">
          <div class="detail-box" v-if="detail">
            <div class="de-container">
              <div class="de-title">{{detail.title}}</div>
              <div class="de-time">
                <i class="iconfont icon-shijian"></i>
                {{detail.time}}
              </div>
              <div class="de-address">
                <i class="iconfont icon-buoumaotubiao23"></i>
                {{detail.address}}
              </div>
              <div class="de-qr">
                <img src="../../public/images/qr.png" alt />
              </div>
              <div class="de-price">
                <span class="text">票价：</span>
                <span class="pri-left">{{detail.price}}</span>&nbsp;&nbsp;
                <span class="pri-right">￥{{detail.unitPrice}} × {{detail.num}}</span>
              </div>
              <div class="de-buytime">
                <span class="text">购票日期：</span>
                <span class="bt">{{detail.buyTime}}</span>
              </div>
              <div class="de-tip">请凭二维码到取票点自助取票</div>
            </div>
            <div class="de-footer" @click="delDetail">
              <div class="iconfont icon-xiala"></div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- 留白 -->
    <div class="message"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    isEmpty: false,
    detail: null,
    ani: false // 用于过渡动画
  }),
  computed: {
    ...mapState({
      buyList: "PurchasedList"
    })
  },
  methods: {
    login() {
      this.$router.push("/sign");
    },
    saveDetail(i) {
      this.ani = true;
      setTimeout(() => {
        this.detail = i;
      }, 10);
    },
    delDetail() {
      this.detail = null;
      setTimeout(() => {
        this.ani = false;
      }, 300);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../public/scss/index.scss";
@import "../../public/scss/mixin.scss";

.ticket {
  overflow: hidden;
}

.header {
  padding: 0 0.3rem;
  height: 1.1rem;
  text-align: center;

  .title {
    font-size: 0.46rem;
    vertical-align: middle;
    position: relative;
    top: -0.1rem;
    color: #fff;
  }
}

.slogan {
  width: 100%;
  height: 0.8rem;
  //   background-color: #ddd;
  font-size: 0.3rem;
  text-align: center;
  line-height: 0.8rem;
  color: #fff;

  .slogan-img {
    display: inline-block;
    width: 0.32rem;
    height: 0.32rem;
    background: url("../../public/images/comment_like_liked.webp") center center;
    background-size: cover;
    vertical-align: middle;
  }
}

.ticket-box {
  width: 90%;
  height: 7.6rem;
  margin: 0 auto;
  border-radius: 6px;
  background-color: #fff;
  text-align: center;
  position: relative;
  z-index: 10;
  border: 1px solid #ddd;

  .bg {
    width: 100%;
    height: 100%;
    background: url("../../public/images/ticklet_list_nologin_star.webp")
      no-repeat center 1.4rem;
    background-size: 50%;
  }

  .word-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);

    .empty {
      font-size: 0.38rem;
      padding: 0.4rem 0;
    }

    .show {
      display: block;
      width: 5rem;
      font-size: 0.28rem;
      color: #777;
    }

    .login {
      display: inline-block;
      padding: 0.14rem 0.3rem;
      font-size: 0.3rem;
      border-radius: 6px;
      color: #fe487b;
      border: 1px solid #fe487b;
    }
  }
}

.container {
  position: relative;
  z-index: 10;
  width: 90%;
  height: 9.6rem;
  margin: 0 auto;
  overflow: auto;
  border-radius: 6px;
  border: 1px solid #ddd;
  text-align: center;
  background-color: #fff;

  &::-webkit-scrollbar {
    display: none;
  }
}

.cell {
  padding: 0.6rem 0;
  margin: 0 0.2rem;
  display: flex;
  position: relative;
  @include scale-border-bottom(rgba(7, 17, 27, 0.1));

  .img-box {
    flex: 0 0 1.4rem;
    width: 1.4rem;

    img {
      width: 100%;
      height: 100%;
      // border-radius: 4px;
    }
  }

  .content-box {
    flex: 1;
    font-size: 0.26rem;
    padding: 0 0.2rem;
    text-align: left;

    .cell-title {
      width: 4.6rem;
      // height: .42rem;
      padding-bottom: 0.18rem;
      font-size: 0.3rem;
      line-height: 0.42rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      // background-color: #ddd;
    }

    .cell-time {
      padding: 0.29rem 0;
      width: 4.6rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .cell-address {
      width: 4.6rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .text {
      font-size: 0.2rem;
      color: #999;
    }

    .cell-price {
      font-size: 0.24rem;
    }

    .cell-num {
      font-size: 0.3rem;
      font-weight: bold;
      color: #fe487b;
      // color: #666;
    }
  }

  .cell-btn {
    position: absolute;
    top: 50%;
    right: -0.2rem;
    transform: translateY(-50%);
    width: 0.6rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    color: #777;
    // background-color: #ddd;
  }
}

.big-box {
  height: 100%;

  .detail-box {
    height: 100%;
  }
}

.de-container {
  padding: 0.4rem 0.4rem 0;
  font-size: 0.36rem;
  text-align: left;

  .de-title {
    font-size: 0.36rem;
    line-height: 0.5rem;
    max-height: 1.5rem;
    overflow: hidden;
  }

  .de-time {
    font-size: 0.28rem;
    padding: 0.2rem 0;

    i {
      font-size: 0.26rem;
    }
  }

  .de-address {
    font-size: 0.28rem;
    padding-bottom: 0.3rem;

    i {
      font-size: 0.26rem;
    }
  }

  .de-qr {
    width: 3.4rem;
    margin: 0 auto;

    img {
      width: 100%;
    }
  }

  .text {
    font-size: 0.2rem;
    color: #999;
  }

  .de-price {
    text-align: center;
    padding: 0.2rem 0;

    .pri-left {
      font-weight: bold;
      color: #fe487b;
    }

    .pri-right {
      font-size: 0.22rem;
      color: #666;
    }
  }

  .de-buytime {
    text-align: center;
    color: #666;

    .bt {
      font-size: 0.26rem;
    }
  }

  .de-tip {
    font-size: 0.26rem;
    text-align: center;
    padding-top: 0.2rem;
  }
}

.de-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  background-color: rgb(231, 230, 230);
}

.message {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 5rem;
  background-color: #f0f0f0;
}

// 动画
.slide-leave-to {
  transform: translateY(100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s linear;
}

.slide-leave {
  transform: translateY(0);
}

.slide-enter {
  // transform: scale(0);
  transform: translateX(100%);
}

.slide-enter-to {
  // transform: scale(100%);
  transform: translateX(0);
}
</style>
