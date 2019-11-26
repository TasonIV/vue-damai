<template>
  <div class="banner">
    <div class="box">
      <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
        <!-- slides -->
        <swiper-slide>
          <img src="../../../public/images/bannerPic01.jpg" />
        </swiper-slide>

        <router-link tag="swiper-slide" to>
          <img src="../../../public/images/bannerPic02.jpg" />
        </router-link>

        <swiper-slide>
          <img src="../../../public/images/bannerPic03.jpg" />
        </swiper-slide>
        <swiper-slide>
          <img src="../../../public/images/bannerPic04.jpg" />
        </swiper-slide>
        <swiper-slide>
          <img src="../../../public/images/bannerPic05.jpg" />
        </swiper-slide>
        <swiper-slide>
          <img src="../../../public/images/bannerPic06.jpg" />
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-scrollbar" slot="scrollbar"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "carrousel",
  data: () => {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true // 允许点击小圆点跳转
        },
        loop: true,
        effect: "cube",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        // slidesPerView: 3,
        // coverflow: {
        //   rotate: 250,
        //   stretch: 0,
        //   depth: 1500,
        //   modifier: 3,
        //   slideShadows: false
        // },
        cube:{
            sliderShadows:false,
            shadow:false,
            shadowOffset:0,
        },
        preventClicks: false,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false // 手动切换之后继续自动轮播
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods:{
    callback(){
      
    }
  },
  mounted() {
    this.swiper.slideTo(0, 10, false);
  }
};
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
  height: 2.5rem;
  margin-top: .86rem;

  .box {
    width: 88%;
    // height: 100%;
    margin: 0 auto;

    img {
      //   display: inline-block;
      //   width: 4.2rem;
      width: 100%;
    }
  }
}

.swiper-scrollbar,
.swiper-cube-shadow{
    opacity: 0;
}
</style>
