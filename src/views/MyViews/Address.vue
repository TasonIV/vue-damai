<template>
  <div class="address">
    <div class="header border-1px">
      <span class="icon-box iconfont icon-zuo" @click="$router.push('/my')"></span>
      <span class="title">收货地址</span>
    </div>
    <div class="cell-box">
      <div class="cell-wrapper">
        <div class="cell" v-for="item in list" :key="item.id">
          <span class="cell-name">{{item.name}}</span>
          <span class="cell-tel">{{item.tel}}</span>
          <div class="cell-address">{{item.address}}</div>
          <div class="setup">
            <i
              class="cell-icon iconfont icon-quanquan"
              v-show="!item.def"
              @click.stop="changeType(item.id)"
            ></i>
            <svg class="cell-icon" aria-hidden="true" v-show="item.def">
              <use xlink:href="#icon-gouxuan2" />
            </svg>
            <span>设置为默认地址</span>
          </div>
        </div>
      </div>
    </div>

    <div class="add-address">
      <router-link to="/my/address/add" tag="div" class="add-btn">收货地址</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed:{
    list(){
      return this.$store.state.addressList
    }
  },
  methods: {
    changeType(i){
      this.$store.commit("changeDef",i)
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
  @include scale-border-bottom(rgba(7, 17, 27, 0.2));

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

  .setup {
    font-size: 0.32rem;
    height: 0.6rem;
    position: relative;
    left: -0.1rem;

    .cell-icon {
      width: 0.6rem;
      height: 0.6rem;
      display: inline-block;
      font-size: 0.4rem;
      text-align: center;
      line-height: 0.64rem;
    }

    span {
      display: inline-block;
      line-height: 0.6rem;
      vertical-align: top;
    }
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
</style>
