<template>
  <div class="recommend">
    <!-- 头部 -->
    <div class="header border-1px">
      <span class="close iconfont icon-zuo" @click="back()"></span>
      <span class="title">为你推荐</span>
    </div>

    <!-- 消息列表 -->
    <div class="wrapper">

      <div class="list-box">
        <div class="list-time">2019-10-25 10:01:52</div>
        <div class="container border-1px">
          <div class="icon-box">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tongzhi2" />
            </svg>
          </div>
          <div class="con-box">
            <div class="con-title">【大麦双11】好久不见老朋友，麦麦给您送礼啦！8888元观演金礼包/华为Mate30/限量送！</div>
            <div class="content">【大麦双11】好久不见老朋友，麦麦给您送礼啦！8888元观演金礼包/华为Mate30/限量送！:-O</div>
          </div>
        </div>
      </div>
    
    <div class="list-box">
        <div class="list-time">2019-10-29 22:01:52</div>
        <div class="container border-1px">
          <div class="icon-box">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tongzhi2" />
            </svg>
          </div>
          <div class="con-box">
            <div class="con-title">【大麦双11】好久不见老朋友，麦麦给您送礼啦！8888元观演金礼包/华为Mate30/限量送！</div>
            <div class="content">【大麦双11】好久不见老朋友，麦麦给您送礼啦！8888元观演金礼包/华为Mate30/限量送！:-O</div>
          </div>
        </div>
      </div>

      <div class="list-box">
        <div class="list-time">2019-11-01 10:00:00</div>
        <div class="container border-1px">
          <div class="icon-box">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tongzhi2" />
            </svg>
          </div>
          <div class="con-box">
            <div class="con-title">大麦双11音乐剧福利专场</div>
            <div class="content">站在巨人的肩膀上看演出--大麦双11携手四海一家，汇聚全世界经典音乐剧，带你领略不一样的世界！</div>
          </div>
        </div>
      </div>

      <div class="list-box">
        <div class="list-time">----------- 无更多消息啦~ ----------</div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$emit("r-back");
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
  background-color: #F0F0F0;
  z-index: 20;
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

.wrapper{
    overflow: hidden;
}

.list-box{
    margin-top: .2rem;
    .list-time{
        height: .7rem;
        font-size: .26rem;
        text-align: center;
        line-height: .7rem;
        color: #777;
    }
}


// 详情
.container {
  height: 1.9rem;
  background-color: #fcfcfc;
  margin: 0 0.2rem;
  display: flex;

  .icon-box {
    flex: 0 0 1.6rem;
    width: 1.6rem;
    height: 1.8rem;
    // background-color: #e49;
    font-size: 1.2rem;
    text-align: center;
    line-height: 1.8rem;
  }

  .con-box {
    flex: 1;
    padding-top: 0.26rem;
    position: relative;


    .con-title {
      height: 0.6rem;
      width: 5rem;
      margin: 0 0.2rem;
      font-size: 0.34rem;
    //   font-weight: bold;
      line-height: 0.6rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      // background-color: #ddd;
    }

    .content {
      height: 0.8rem;
      width: 5rem;
      margin: 0 0.2rem;
      font-size: 0.28rem;
      line-height: .4rem;
      color: #999;
      display: -webkit-box;
      -webkit-line-clamp:2;
      -webkit-box-orient: vertical; 
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
