<template>
  <div class="menu">
    <div class="top">
      <span class="box" @click = "changeNav(2)">
        <i class="icon0"></i>
        <div class="type">演唱会</div>
      </span>

      <span class="box" @click = "changeNav(3)">
        <i class="icon1"></i>
        <div class="type">话剧歌剧</div>
      </span>

      <span class="box"  @click = "changeNav(4)">
        <i class="icon2"></i>
        <div class="type">音乐会</div>
      </span>

      <span class="box"  @click = "changeNav(5)">
        <i class="icon3"></i>
        <div class="type">体育</div>
      </span>

      <span class="box"  @click = "changeNav(6)">
        <i class="icon4"></i>
        <div class="type">曲苑杂坛</div>
      </span>
    </div>

    <div class="top"  @click = "changeNav(7)">
      <span class="box">
        <i class="icon5"></i>
        <div class="type">儿童亲子</div>
      </span>
      <span class="box"  @click = "changeNav(8)">
        <i class="icon6"></i>
        <div class="type">展览休闲</div>
      </span>

      <span class="box"  @click = "changeNav(9)">
        <i class="icon7"></i>
        <div class="type">舞蹈芭蕾</div>
      </span>

      <span class="box"  @click = "changeNav(1)">
        <i class="icon8"></i>
        <div class="type">全部</div>
      </span>

      <span class="box"  @click = "changeNav(1)">
        <i class="icon9"></i>
        <div class="type">0元票</div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data:()=>({
    
  }),
  methods:{
    changeNav(n){
      this.$router.push({name:"show",params:{navType:n}})
    }
  }
};
</script>

<style scoped lang="scss">
.menu {
  width: 100%;
  height: 3.6rem;
  // background-color: #ddd;
  padding-top: 0.72rem;
  font-size: 0.26rem;
}

.top {
  width: 100%;
  height: 1.3rem;
//   background-color: #e94;
  display: flex;

  .box {
    flex: 1;
    position: relative;

    i {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      justify-content: center;
      display: inline-block;
      width: 0.6rem;
      height: 0.6rem;

      &.icon0 {
        background: url("../../../public/images/default_icon_0.webp") center center;
        background-size: cover;
      }
      &.icon1 {
        background: url("../../../public/images/default_icon_1.webp") center center;
        background-size: cover;
      }
      &.icon2 {
        background: url("../../../public/images/default_icon_2.webp") center center;
        background-size: cover;
      }
      &.icon3 {
        background: url("../../../public/images/default_icon_3.webp") center center;
        background-size: cover;
      }
      &.icon4 {
        background: url("../../../public/images/default_icon_4.webp") center center;
        background-size: cover;
      }
      &.icon5 {
        background: url("../../../public/images/default_icon_5.webp") center center;
        background-size: cover;
      }
      &.icon6 {
        background: url("../../../public/images/default_icon_6.webp") center center;
        background-size: cover;
      }
      &.icon7 {
        background: url("../../../public/images/default_icon_7.webp") center center;
        background-size: cover;
      }
      &.icon8 {
        background: url("../../../public/images/default_icon_8.webp") center center;
        background-size: cover;
      }
      &.icon9 {
        background: url("../../../public/images/default_icon_9.webp") center center;
        background-size: cover;
      }
    }

    .type {
      position: absolute;
      top: 0.74rem;
      left: 0;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
