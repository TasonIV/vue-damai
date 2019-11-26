<template>
  <div class="all">
    <!-- 头部 -->
    <div class="header">
      <div class="tab-list">
        <router-link to="/all/show" tag="div" class="tabbar">演出</router-link>
        <keep-alive>
          <router-link to="/all/star" tag="div" class="tabbar">大咖</router-link>
        </keep-alive>
      </div>
      <router-link to="/search" tag="div" class="icon-box icon1 iconfont icon-sousuo"></router-link>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 1
    };
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 1.1rem;
  padding: 0 1rem;
  text-align: center;
  color: #fff;
  background-color: #1b182b;
  z-index: 10;

  .tab-list {
    margin-right: 0.8rem;
    display: flex;

    .tabbar {
      flex: 1;
      font-size: 0.38rem;
      text-align: center;
      line-height: 1.1rem;
      position: relative;
      z-index: 2;

      &.router-link-exact-active {
        font-size: 0.44rem;

        &::after {
          content: "";
          position: absolute;
          bottom: 0.2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 1rem;
          height: 0.22rem;
          z-index: -1;
          background-color: #ff4d8e;
          animation: wid 0.3s linear;

          @keyframes wid {
            0% {
              width: 0;
            }

            100% {
              width: 50%;
            }
          }
        }
      }
    }
  }

  .icon-box {
    position: absolute;
    top: 0;
    right: 0;
    width: 1.1rem;
    height: 1.1rem;
    // background-color: #ddd;
    font-size: 0.44rem;
    text-align: center;
    line-height: 1.1rem;
  }
}
</style>
