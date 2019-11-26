<template>
  <div id="app">
    <div class="bg-img"></div>
    <router-view></router-view>
    <div class="tabbar">
      <router-link
        tag="span"
        class="nav"
        to="/"
        :class="{active:showNum === 1}"
        @click.native="changeIcon(1)"
      >
        <i class="tab" :class="showNum === 1? 'tabA-active' : 'tabA'">
          <!-- <img src="../public/images/default_tab_find_normal.webp" alt=""> -->
        </i>
        <span>精选</span>
      </router-link>

      <router-link
        tag="span"
        class="nav"
        to="/all"
        :class="{active:showNum === 2}"
        @click.native="changeIcon(2)"
      >
        <i class="tab" :class="showNum === 2? 'tabB-active' : 'tabB'"></i>
        <span>全选</span>
      </router-link>
      <router-link
        tag="span"
        class="nav"
        to="/find"
        :class="{active:showNum === 3}"
        @click.native="changeIcon(3)"
      >
        <i class="tab" :class="showNum === 3? 'tabC-active' : 'tabC'"></i>
        <span>发现</span>
      </router-link>
      <router-link
        tag="span"
        class="nav"
        to="/ticket"
        :class="{active:showNum === 4}"
        @click.native="changeIcon(4)"
      >
        <i class="tab" :class="showNum === 4? 'tabD-active' : 'tabD'"></i>
        <span>票夹</span>
      </router-link>
      <router-link
        tag="span"
        class="nav"
        to="/my"
        :class="{active:showNum === 5}"
        @click.native="changeIcon(5)"
      >
        <i class="tab" :class="showNum === 5? 'tabE-active' : 'tabE'"></i>
        <span>我的</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$router.afterEach(to => {
      let selected = /^selected/.test(to.name);
      let all = /^\/all/.test(to.fullPath);
      let find = /^\/find/.test(to.fullPath);
      let ticket = /^\/ticket/.test(to.fullPath);
      let my = /^\/my/.test(to.fullPath);

      if (selected) {
        this.$store.commit("changeIcon", 1);
      } else if (all) {
        this.$store.commit("changeIcon", 2);
      } else if (find) {
        this.$store.commit("changeIcon", 3);
      } else if (ticket) {
        this.$store.commit("changeIcon", 4);
      } else if (my) {
        this.$store.commit("changeIcon", 5);
      } else {
        this.$store.commit("changeIcon", 1);
      }
    });
  },
  computed: {
    showNum() {
      return this.$store.state.showNum;
    }
  },
  methods: {
    changeIcon(n) {
      this.$store.commit("changeIcon", n);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../public/scss/mixin.scss";

.bg-img {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../public/images/search_title_bg.webp") no-repeat -500px top;
  background-size: cover;
  z-index: -1;
}

.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1.1rem;
  background-color: #fafafa;
  display: flex;
  z-index: 2;
  border-top: 1px solid #f0f0f0;

  .nav {
    flex: 1;
    text-align: center;
    position: relative;

    &.active {
      color: #ea034d;
    }

    span {
      font-size: 0.22rem;
      line-height: 1.2rem;
    }

    .tab {
      display: inline-block;
      width: 0.6rem;
      height: 0.6rem;
      background-color: #e94;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50%;

      // icon未激活
      &.tabA {
        @include select-bg(1, 0);
      }

      &.tabB {
        @include select-bg(2, 0);
      }

      &.tabC {
        @include select-bg(3, 0);
      }

      &.tabD {
        @include select-bg(4, 0);
      }

      &.tabE {
        @include select-bg(5, 0);
      }

      // icon激活
      &.tabA-active {
        @include select-bg(1, 1);
      }

      &.tabB-active {
        @include select-bg(2, 2);
      }

      &.tabC-active {
        @include select-bg(3, 3);
      }

      &.tabD-active {
        @include select-bg(4, 4);
      }

      &.tabE-active {
        @include select-bg(5, 5);
      }
    }
  }
}
</style>
