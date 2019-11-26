<template>
  <div class="address">
    <div class="header border-1px">
      <span class="icon-box iconfont icon-zuo" @click="$router.push('/my')"></span>
      <span class="title">常用观影人</span>
    </div>
    <div class="cell-box">
      <div class="cell-wrapper">
        <div class="cell" v-for="item in list" :key="item.id">
          <span class="cell-name">{{item.name}}</span>
          <span class="cell-tel">{{item.numType}}</span>
          <div class="cell-address">{{item.num}}</div>
          <div class="cell-icon iconfont icon-lajitong" @click="showEmpty(item.id)"></div>
        </div>
      </div>
    </div>

    <div class="empty-box" v-show="isEmpty">
      <div class="empty">
        <div class="empty-title">是否确认删除？</div>
        <div class="btn-box">
          <van-button class="btn1" type="default" @click="cancelEmpty">取消</van-button>
          <van-button class="btn2" type="default" @click="comfirmEmpty">确认</van-button>
        </div>
      </div>
    </div>

    <div class="add-address">
      <router-link to="/my/man/manadd" tag="div" class="add-btn">添加新观影人</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: ["name", "numType", "num"],
  data: () => ({
    isEmpty: false,
    emptyId: null
  }),
  computed: {
    list() {
      return this.$store.state.peopleList;
    }
  },
  methods: {
    showEmpty(id) {
      this.isEmpty = true;
      this.emptyId = id;
    },
    comfirmEmpty() {
      this.$store.commit("removePeople", { id: this.emptyId });
      this.isEmpty = false;
    },
    cancelEmpty() {
      this.isEmpty = false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../public/scss/index.scss";
@import "../../../public/scss/mixin.scss";

.address {
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
  width: 100%;
  height: 1rem;
  text-align: center;
  background-color: #fff;
  color: #000;
  position: absolute;
  top: 0;
  left: 0;
  //   right: 0;
  // border-bottom: 1px solid rgba(7, 17, 27, 0.2);
  @include scale-border-bottom(rgba(7, 17, 27, 0.1));

  .title {
    font-size: 0.42rem;
    vertical-align: middle;
    position: relative;
    top: -0.1rem;
  }

  .icon-box {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 1rem;
    height: 1rem;
    font-size: 0.4rem;
    text-align: center;
    line-height: 1.1rem;
    // background-color: #ddd;
  }
}

.cell-box {
  height: 11.5rem;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .cell-wrapper {
    margin-bottom: 0.4rem;
    background-color: #fff;
  }
}

.cell {
  font-size: 0.34rem;
  padding: 0.4rem 0;
  margin: 0 0.34rem;
  @include scale-border-bottom(rgba(7, 17, 27, 0.1));

  .cell-name {
    padding-right: 0.4rem;
  }

  .cell-tel {
    font-size: 0.3rem;
  }

  .cell-address {
    font-size: 0.28rem;
    padding: 0.3rem 0;
    line-height: 0.44rem;
  }

  .cell-icon {
    position: absolute;
    top: 0.3rem;
    right: 0.1rem;
    width: 0.6rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
  }
}

.add-address {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1.2rem;
  background-color: #fff;
  .add-btn {
    margin: 0.2rem 0.3rem;
    height: 0.8rem;
    font-size: 0.33rem;
    text-align: center;
    line-height: 0.8rem;
    border-radius: 0.4rem;
    color: #fff;
    background-color: #ff4d8e;
  }
}

.empty-box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);

  .empty {
    position: absolute;
    top: 34%;
    left: 50%;
    transform: translate(-50%);
    width: 4.6rem;
    height: 2.2rem;
    // background: rgba(0, 0, 0, 0.5);
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
  }

  .empty-title {
    font-size: 0.32rem;
    text-align: center;
    padding: 0.5rem 0.3rem 0.5rem 0.3rem;
  }

  .btn-box {
    position: absolute;
    left: 0;
    bottom: 0;

    .btn1 {
      width: 2.3rem;
      height: 0.9rem;
      color: rgb(245, 128, 128);
    }
    .btn2 {
      width: 2.3rem;
      height: 0.9rem;
      color: rgb(35, 155, 196);
    }
  }
}
</style>
