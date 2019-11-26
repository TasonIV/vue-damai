<template>
  <div class="recommend">
    <!-- 头部 -->
    <div class="header border-1px">
      <span class="close iconfont icon-zuo" @click="back()"></span>
      <span class="title">麦小蜜</span>
    </div>

    <div class="box" ref="xiaomi">
      <div class="wrapper">
        <div class="list-box">
          <div class="list-time">2019年10月25日 20:32</div>
          <div class="xiaomi">亲，麦小蜜看到你在关注以上项目，您想咨询这个项目的什么问题呢？</div>
          <van-collapse v-model="activeName" accordion class="coll-vant">
            <van-collapse-item title="购票常见问题" class="vant-item" name="1">
              <div class="quse quse1" @click="send(0,$event)">有座位图可以查看吗？</div>
              <div class="quse" @click="send(1,$event)">我想要订票，怎么操作？</div>
              <div class="quse" @click="send(2,$event)">我该怎么选座？</div>
              <div class="quse quse2" @click="send(3,$event)">儿童也是全票吗？</div>
            </van-collapse-item>
            <van-collapse-item title="观影常见问题" name="2">
              <div class="quse quse1" @click="send(4,$event)">演出时长大概是多少？</div>
              <div class="quse" @click="send(5,$event)">演出会入场时间是什么时候？</div>
              <div class="quse" @click="send(6,$event)">现场可以摄影摄像吗？</div>
            </van-collapse-item>
            <van-collapse-item title="其他常见问题" name="3">
              <div class="quse quse1" @click="send(7,$event)">取票地址在哪里？</div>
              <div class="quse" @click="send(8,$event)">电子票在哪里兑换？</div>
              <div class="quse" @click="send(9,$event)">什么是一票一证？</div>
              <div class="quse quse2" @click="send(10,$event)">我想了解退票规则</div>
            </van-collapse-item>
          </van-collapse>
        </div>

        <div class="chat-box clearfix">
          <div class="lis" v-for="(item,index) in this.$store.state.chatMessages" :key="index">
            <div :class="{right:item.my,left:!item.my}" class="clearfix">
              <div class="chat">{{item.msg}}</div>
            </div>
          </div>
        </div>
        <!-- <div class="list-bottom">—— 欢迎回来，麦小蜜好想你 ——</div> -->
      </div>
    </div>

    <div class="footer">
      <div class="inp">
        <input type="text" v-model="text" @keyup.enter="send(666,$event)" />
      </div>
      <div class="add-icon" @click="send(666,$event)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fasong" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  data: () => ({
    activeName: "1",
    text: "",
    msg: []
  }),
  methods: {
    back() {
      this.$emit("x-back");
    },
    _initBscroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.xiaomi, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    send(n, evt) {
      if (n !== 666) {
        this.$store.commit("sendQuestions", {
          num: n,
          text: evt.target.innerHTML
        });
      } else {
        if (this.text) {
          this.$store.dispatch("sendMsg", {
            text: this.text,
            axios: this.axios
          });
          this.text = "";
        }
      }
    }
  },
  watch: {
    msg() {
      this.$nextTick(() => {
        this._initBscroll();
        let allLis = this.$refs.xiaomi.querySelectorAll(".lis"); // 查找所有类名为lis的元素
        this.scroll.scrollToElement(allLis[allLis.length - 1], 300); // 滑动到指定元素
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initBscroll();
      let allLis = this.$refs.xiaomi.querySelectorAll(".lis"); // 查找所有类名为lis的元素
      this.scroll.scrollToElement(allLis[allLis.length - 1], 0); // 滑动到指定元素
    });
  },
  updated() {
    if (this.msg.length !== this.$store.state.chatMessages.length) {
      this.msg = [...this.$store.state.chatMessages];
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../public/scss/index.scss";
@import "../../../public/scss/mixin.scss";

.recommend {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f0f0f0;
  z-index: 99;
}

.header {
  padding: 0 0.3rem;
  height: 1rem;
  text-align: center;
  background-color: #fff;
  @include scale-border-bottom(rgba(7, 17, 27, 0.3));

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

.box {
  position: fixed;
  top: 1rem;
  left: 0;
  right: 0;
  bottom: 1.1rem;
  overflow: hidden;

  .wrapper {
    overflow: auto;
    padding-bottom: 2rem;
  }
}

.list-box {
  margin-top: 0.2rem;
  padding: 0 0.2rem;

  .list-time {
    height: 0.7rem;
    font-size: 0.26rem;
    text-align: center;
    line-height: 0.7rem;
    color: #777;
  }

  .xiaomi {
    width: 6rem;
    padding: 0.16rem 0.3rem;
    margin-bottom: 0.2rem;
    font-size: 0.29rem;
    line-height: 0.4rem;
    border-radius: 0 18px 18px 18px;
    background-color: #fff;
  }
}

.coll-vant {
  width: 6rem;
  overflow: hidden;
  border-radius: 10px;
}

.quse {
  padding: 0.16rem 0;
  color: rgb(77, 204, 247);

  &.quse1 {
    padding-top: 0;
  }

  &.quse2 {
    padding-bottom: 0;
  }
}

.list-bottom {
  margin-top: 0.3rem;
  height: 0.7rem;
  font-size: 0.26rem;
  text-align: center;
  line-height: 0.7rem;
  color: #999;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1.1rem;
  background-color: #f0f0f0;
  display: flex;

  .inp {
    flex: 1;
    margin: 0.2rem;

    input {
      display: block;
      padding: 0;
      margin: 0;
      outline: 0;
      border: 0;
      width: 6rem;
      height: 100%;
      font-size: 0.3rem;
      padding-left: 0.3rem;
      border-radius: 16px;
    }
  }

  .add-icon {
    flex: 0 0 1.1rem;
    width: 1.1rem;
    height: 1.1rem;
    padding-right: 0.3rem;
    font-size: 0.54rem;
    line-height: 1.1rem;
    text-align: center;
    // background: #000;
  }
}

.chat-box {
  padding: 0.2rem;
  // height: 2rem;
  // background-color: #ddd;

  .right {
    margin-top: 0.4rem;
    .chat {
      float: right;
      display: inline-block;
      max-width: 5.4rem;
      padding: 0.2rem 0.2rem 0.2rem 0.26rem;
      background-color: #2c9ef4;
      color: #fff;
      border-radius: 0.4rem 0 0.4rem 0.4rem;
      position: relative;
      font-size: 0.29rem;
      line-height: 0.4rem;
      word-wrap: break-word;
      word-break: normal;
    }
  }

  .left {
    margin-top: 0.4rem;
    .chat {
      float: left;
      display: inline-block;
      max-width: 5.4rem;
      // height: 2rem;
      padding: 0.2rem;
      background-color: #fff;
      border-radius: 0 0.4rem 0.4rem 0.4rem;
      position: relative;
      font-size: 0.29rem;
      line-height: 0.4rem;
      word-wrap: break-word;
      word-break: normal;
    }
  }
}
</style>
