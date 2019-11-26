<template>
  <div class="recommend">
    <!-- 头部 -->
    <div class="header border-1px">
      <span class="close iconfont icon-zuo" @click="back()"></span>
      <span class="title">关注</span>
    </div>
    <div class="container" v-if="!this.listItem">
      <div
        class="cell"
        v-for="(item,index) in this.$store.state.likeStarList"
        :key="index"
        @click="showStar(item)"
      >
        <div class="left">
          <img :src="item.artistVO.headImg" alt />
          <svg class="img-icon icon" aria-hidden="true">
            <use xlink:href="#icon-renzheng" />
          </svg>
        </div>
        <div class="right">
          <div class="name">{{item.artistVO.bname}}</div>
          <div class="fans">粉丝&nbsp;{{item.artistVO.fansNum}}</div>
          <div class="focus f1" @click.stop="cancelFocus(item)">已关注</div>
        </div>
      </div>
    </div>
    <Warning v-show="isWarning" :warningMsg="warningMsg" />
    <!-- 导航条明星，详情页面 -->
    <StarDetail
      :showItem="listItem"
      @hide-list="hideList()"
      @cancel-follow="cancelListFnc"
      v-if="this.listItem"
    />
  </div>
</template>

<script>
import Warning from "../../Warning";
import StarDetail from "./StarDetail";

export default {
  components: {
    Warning,
    StarDetail
  },
  data: () => ({
    active: 1,
    isRemind: true,
    isWarning: false,
    warningMsg: "已取关",
    listItem: null // 选中导航歌手的数据
  }),
  methods: {
    back() {
      this.$emit("f-hide");
    },
    changeActive(n) {
      this.active = n;
    },
    hideRemind() {
      this.isRemind = false;
    },
    cancelFocus(item) {
      this.$store.commit("cancelLikeStar", { item });
      this.isWarning = true;
      setTimeout(() => {
        this.isWarning = false;
      }, 500);
    },
    // 跳转到明星详情页
    showStar(item) {
      this.listItem = item;
      console.log("push的", this.listItem);
      // this.$router.push("/all/star")
    },
    hideList() {
      this.listItem = null;
    },
    // 取消关注
    cancelListFnc(item) {
      this.listItem = null;
      this.$store.commit("cancelLikeStar", { item });
      this.isWarning = true;
      setTimeout(() => {
        this.isWarning = false;
      }, 700);
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
  @include scale-border-bottom(rgba(7, 17, 27, 0.2));

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
  padding: 0.3rem;
  position: fixed;
  top: 1rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.cell {
  height: 1.6rem;
  margin: 0.4rem 0;
  display: flex;

  .left {
    flex: 0 0 1.6rem;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    position: relative;

    img {
      width: 100%;
      border-radius: 50%;
    }

    .img-icon {
      position: absolute;
      bottom: 0;
      right: 0rem;
      font-size: 0.5rem;
    }
  }

  .right {
    flex: 1;
    padding: 0 0.3rem;
    position: relative;

    .name {
      font-size: 0.38rem;
      padding: 0.3rem 0;
    }

    .fans {
      font-size: 0.24rem;
      color: #666;
    }
    .focus {
      position: absolute;
      top: 0.4rem;
      right: 0;
      display: inline-block;
      font-size: 0.24rem;
      padding: 0.1rem 0.2rem;
      border-radius: 0.3rem;

      &.f1 {
        border: 1px solid rgb(214, 212, 212);
        color: #777;
      }

      &.f2 {
        border: 1px solid #ff4d8e;
        color: #ff4d8e;
      }
    }
  }
}
</style>
