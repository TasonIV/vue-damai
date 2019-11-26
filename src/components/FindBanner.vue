<template>
  <div class="banner">
    <div class="box">
      <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
        <!-- slides -->
        <swiper-slide>
          <img src="../../public/images/findimgs01.png" />
        </swiper-slide>

        <router-link tag="swiper-slide" to>
          <img src="../../public/images/findimgs02.png" />
        </router-link>

        <swiper-slide>
          <img src="../../public/images/findimgs03.png" />
        </swiper-slide>
        <swiper-slide>
          <img src="../../public/images/findimgs04.png" />
        </swiper-slide>
        <swiper-slide>
          <img src="../../public/images/findimgs05.png" />
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
        // effect: "fade",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        fade: {
          crossFade: false
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
  methods: {
    callback() {}
  },
  mounted() {
    this.swiper.slideTo(0, 10, false);
  }
};
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
//   height: 2.5rem;
  margin-top: 0;

  .box {
    width: 92%;
    // height: 100%;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;

    img {
      //   display: inline-block;
      //   width: 4.2rem;
      width: 100%;
    }
  }
}

.swiper-scrollbar,
.swiper-cube-shadow {
  opacity: 0;
}
</style>
