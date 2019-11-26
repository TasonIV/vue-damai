<template>
  <div class="header">
    <router-link to="/location" tag="div" class="location-box">
      <span class="location-address">{{this.$store.state.locationCity}}
        <i class="iconfont icon-xiala location-icon"></i>
      </span>
      
    </router-link>

    <router-link to="/search" tag="div" class="inp-box">
      <i class="iconfont icon-sousuo inp-search"></i>
      <span class="inp-inp">双11</span>
      <i class="iconfont icon-saoma inp-qr"></i>
    </router-link>

    <router-link to="/calendar" tag="span" class="calendar iconfont icon-rili"></router-link>
    <!-- <span class="calendar iconfont icon-rili"></span> -->

    <router-link to="/message" tag="span" class="message iconfont icon-shinshopxiaoxi"></router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.header {
  height: 0.86rem;
  color: #fff;
  display: flex;

  .location-box {
    flex: 1;
    line-height: 0.43rem;
    // margin-left: .3rem;
    text-align: center;
    padding-left: .2rem;

    .location {
      font-size: 0.36rem;
      
    }

    .location-address {
      display: inline-block;
      // width: 1.6rem;
      height: .86rem;
      line-height: .86rem;
      font-size: 0.36rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .location-icon {
      display: inline-block;
      height: .86rem;
      line-height: .9rem;
      vertical-align: top;
      font-size: 0.1rem;
      // position: relative;
      // top: -0.05rem;
    }
  }

  .inp-box {
    flex: 0 0 4rem;

    width: 4rem;
    margin: .1rem;
    background-color: #fff;
    border-radius: 2px;
    line-height: 0.7rem;
    text-align: center;
    display: flex;

    .inp-search {
      flex: 0 0 .7rem;
      width: .7rem;
      font-size: 0.32rem;
      color: #999;
    }

    .inp-inp {
      display: inline-block;
      flex: 1;
      // width: 2.6rem;
      font-size: 0.26rem;
      text-align: left;
      color: #999;
    }

    .inp-qr {
      flex: 0 0 .7rem;
      width: .7rem;
      font-size: 0.32rem;
      color: #999;
    }
  }

  .calendar {
    flex: 0 0 .7rem;
    width: .7rem;
    height: 0.86rem;
    font-size: 0.42rem;
    text-align: center;
    line-height: 0.86rem;
  }

  .message {
    flex: 0 0 .7rem;
    width: .7rem;
    height: 0.86rem;
    font-size: 0.44rem;
    text-align: center;
    line-height: 0.86rem;
    margin-right: 0.1rem;
  }
}
</style>
