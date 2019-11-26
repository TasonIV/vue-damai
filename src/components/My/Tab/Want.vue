<template>
  <div class="recommend">
    <!-- 头部 -->
    <div class="header border-1px">
      <span class="close iconfont icon-zuo" @click="back()"></span>
      <span class="title">想看的演出</span>
    </div>
    <div class="tabbar">
      <div class="focus" @click="changeActive(1)">
        演出
        <span class="line" :class="{active:active==1}"></span>
      </div>
      <div class="reply" @click="changeActive(2)">
        合辑
        <span class="line" :class="{active:active==2}"></span>
      </div>
    </div>
    <div class="wrapper" v-show="active == 1">
      <div
        class="cell border-1px"
        v-for="(item,index) in $store.state.likePerformList"
        :key="index"
        @click="saveItem(item)"
      >
        <div class="img-box">
          <img :src="item.verticalPic" alt />
        </div>
        <div class="content">
          <div class="cont-title">{{item.name}}</div>
          <div class="cont-time">{{item.showTime}}</div>
          <div class="cont-address">{{item.venueName}}</div>
          <div class="cont-name">{{item.categoryName}}</div>
          <div class="cont-price">
            <span class="p1">￥</span>
            <span class="p2">{{item.priceLow}}</span>
            <span class="p3">起</span>
          </div>
        </div>
      </div>

      <div class="tip">没有更多啦(-.-)</div>
    </div>
    <div class="container" v-show="active == 2">
      <img
        style="width:100%;height:100%"
        src="../../../../public/images/common_error_ticket_empty.webp"
      />你还未收藏过合辑哦(-.-)
    </div>

    <transition name="ani">
      <ShowDetail v-if="isDetail" :item="item" @m-hide-detail="hideDetail" />
    </transition>
  </div>
</template>

<script>
import ShowDetail from "../../ShowDetail/ShowDetail";

export default {
  components: {
    ShowDetail
  },
  data: () => ({
    active: 1,
    isRemind: true,
    isDetail: false,
    item: null,
  }),
  methods: {
    back() {
      this.$emit("w-hide");
    },
    changeActive(n) {
      this.active = n;
    },
    hideRemind() {
      this.isRemind = false;
    },
    saveItem(i){
        this.item = i
        this.isDetail = true
    },
    hideDetail(){
        this.isDetail = false
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../../public/scss/index.scss";
@import "../../../../public/scss/mixin.scss";

.recommend {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
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
  position: fixed;
  top: 2rem;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.3rem;
  background-color: #fff;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .tip {
    padding: 0.2rem 0;
    font-size: 0.28rem;
    text-align: center;
    color: #999;
  }
}

.cell {
  display: flex;
  padding: 0.3rem 0;
  @include scale-border-bottom(rgba(7, 17, 27, 0.1));

  .img-box {
    flex: 0 0 2.2rem;

    img {
      width: 100%;
      border-radius: 8px;
    }
  }

  .content {
    flex: 1;
    padding: 0 0.26rem;
    font-size: 0.32rem;

    .cont-title {
      margin: 0.1rem 0 0.2rem 0;
      line-height: 0.46rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .cont-time {
      font-size: 0.22rem;
      color: #999;
    }

    .cont-address {
      font-size: 0.22rem;
      padding: 0.14rem 0;
      color: #999;
    }

    .cont-name {
      display: inline-block;
      font-size: 0.2rem;
      font-weight: bold;
      padding: 0.06rem 0.16rem;
      border-radius: 0.3rem;
      border: 1px solid #ff4d8e;
      color: #ff4d8e;
    }

    .cont-price {
      padding-top: 0.3rem;
      color: #ff4d8e;
      font-weight: bold;

      .p1 {
        font-size: 0.22rem;
      }

      .p2 {
        padding-right: 0.1rem;
      }

      .p3 {
        font-size: 0.2rem;
        color: #999;
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

// 动画
.ani-enter,
.ani-leave-to {
  transform: scale(0);
  opacity: 0;
}

.ani-enter-active,
.ani-leave-active {
  transition: all 0.2s linear;
}

.ani-enter-to,
.ani-leave {
  transform: scale(100%);
  opacity: 1;
}
</style>
