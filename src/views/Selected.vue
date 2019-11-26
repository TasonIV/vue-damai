<template>
  <div class="selected">
    <Header class="header-top" />

    <div class="scroll-box" ref="scroll">
      <div class="sel-wrapper">
        <Banner />

        <div class="container">
          <Menu />
          <HotList @m-save="save" />
          <Recommend @r-save="save" />
        </div>
      </div>
    </div>

    <router-view></router-view>
    <div class="white-space"></div>

    <transition name="ani">
      <ShowDetail v-if="isDetail" :item="item" @m-hide-detail="hideDetail" />
    </transition>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Header from "../components/Selected/Header";
import Banner from "../components/Selected/Banner";
import Menu from "../components/Selected/Menu";
import HotList from "../components/Selected/HotList";
import Recommend from "../components/Selected/Recommend";
import ShowDetail from "../components/ShowDetail/ShowDetail";

export default {
  data() {
    return {
      header: {},
      item: null,
      isDetail: false
    };
  },
  components: {
    Header,
    Banner,
    Menu,
    HotList,
    Recommend,
    ShowDetail
  },
  watch: {
    header() {
      this._initBscroll;
    }
  },
  methods: {
    getData() {
      this.axios("/damai/api/header").then(res => {
        let { data } = res.data;
        this.header = data;
      });
    },
    _initBscroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.scroll, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    save(item) {
      this.item = item;
      this.isDetail = true;
    },
    hideDetail() {
      this.isDetail = false;
    }
  },
  mounted() {
    this.getData();
    this._initBscroll();
  }
};
</script>

<style scoped lang="scss">
.selected {
}

.scroll-box {
  height: 100vh;
}

.sel-wrapper {
  padding-bottom: 3rem;
}

.header-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: #181529;
}

.container {
  position: relative;
  top: -0.4rem;
  width: 100%;
  // height: 8rem;
  // overflow: hidden;
  border-radius: 0.1rem 0.1rem 0 0;
  background-color: #fff;
}

.white-space {
  width: 100%;
  height: 8rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: -1;
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
