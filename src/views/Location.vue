<template>
  <div class="location">
    <!-- 头部 -->
    <div class="header">
      <span class="close" @click="back()">关闭</span>
      <span class="title">城市选择</span>
    </div>

    <!-- 滑动部分 -->
    <div class="bscroll" ref="betterSlider">
      <div class="container">
        <div class="letter border-1px">当前定位城市</div>
        <div class="city-box">
          <div class="city-cell active" @click="saveCity('广州')">广州</div>
        </div>

        <div class="letter border-1px">热门城市</div>
        <div class="city-box" v-if="status">
          <div
            class="city-cell"
            v-for="(item,index) in locationData.areas[0].cities"
            :key="index"
            :class="{active:hotCityIndex === index}"
            @click="changeCityIndex(index,item.name)"
          >{{item.name}}</div>
        </div>

        <div
          class="city-list"
          v-for="(v,i) in locationData.areas"
          :key="i"
          v-show="v.prefix !== 'hotCities'"
        >
          <div class="letter border-1px">{{v.prefix}}</div>

          <div class="city-items" v-for="(k,j) in v.cities" :key="j" @click="saveCity(k.name)">
            <div class="city">{{k.name}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 字母定位 -->
    <div class="word">
      <ul>
        <li class="active">热</li>
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
        <li>F</li>
        <li>G</li>
        <li>H</li>
        <li>J</li>
        <li>K</li>
        <li>L</li>
        <li>M</li>
        <li>N</li>
        <li>P</li>
        <li>Q</li>
        <li>S</li>
        <li>T</li>
        <li>W</li>
        <li>X</li>
        <li>Y</li>
        <li>Z</li>
      </ul>
    </div>

    <Myloading v-if="!locationData || isLoading" />
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Myloading from "../components/Myloading";

export default {
  data() {
    return {
      locationData: {},
      hotCityIndex: null,
      wordIndex: null,
      status: false,
      isLoading: false
    };
  },
  components: {
    Myloading
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    changeCityIndex(index, city) {
      this.hotCityIndex = index;
      this.isLoading = true;
      setTimeout(() => {
        this.$store.commit("saveLocationCity", { city });
        this.isLoading = false;
        this.$router.replace({ name: "selected" });
      }, 500);
    },
    saveCity(city) {
      this.isLoading = true;
      setTimeout(() => {
        this.$store.commit("saveLocationCity", { city });
        this.isLoading = false;
        this.$router.replace({ name: "selected" });
      }, 500);
    },
    getLocationData() {
      this.axios("/damai/api/Location").then(res => {
        let { data } = res.data;
        this.locationData = data;
        if (data) {
          this.status = true;
        }
      });
    },

    _initAllBscroll() {
      this.$nextTick(() => {
        if (!this.bscroll) {
          this.bscroll = new BScroll(this.$refs.betterSlider, {
            click: true
          });
        } else {
          this.bscroll.refresh();
        }
      });
    }
    // // 计算每一个列表字母距离顶部的距离
    // _calculateGoodListHeight() {
    //   let height = 0;
    //   let arr = [];
    //   arr.push(height);
    //   for (let i = 0; i < this.$refs.betterSlider.length; i++) {
    //     height += this.$refs.betterSlider[i].getBoundingClientRect().height;
    //     arr.push(height);
    //   }
    //   this.goodListHeight = arr;
    //   // console.log(this.goodListHeight)
    // },

    // // 商品栏滚动时,高亮对应的菜单栏分类
    // goodWrapperScroll({ y }) {
    //   y = Math.abs(y);
    //   for (let i = 0; i < this.goodListHeight.length - 1; i++) {
    //     if (y >= this.goodListHeight[i] && y < this.goodListHeight[i + 1]) {
    //       this.currentIndex = i;
    //       break;
    //     }
    //   }
    // },
    // // 选择菜单栏时,商品栏滚动到对应的位置
    // selectedMenu(index) {
    //   this.currentIndex = index;
    //   //点击后让 商品栏滚动到指定位置
    //   this.goodScroll.scrollToElement(this.$refs.goodList[index], 300);
    // }
  },
  watch: {
    locationData() {
      this._initAllBscroll();
    }
  },
  mounted() {
    this.getLocationData();
    // this._initAllBscroll();  //写在此处会报错？
  },
  updated() {
    this._initAllBscroll();
  }
};
</script>

<style scoped lang="scss">
@import "../../public/scss/index.scss";
@import "../../public/scss/mixin.scss";

.location {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 10;

  .header {
    padding: 0 0.3rem;
    height: 1rem;
    text-align: center;

    .close {
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 1rem;
      height: 1rem;
      font-size: 0.3rem;
      line-height: 1rem;
      text-align: center;
    }

    .title {
      font-size: 0.42rem;
      vertical-align: middle;
      position: relative;
      top: -0.1rem;
    }
  }
}

.bscroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.container {
  width: 100%;
  // height: 9118px;
  padding-bottom: 1.1rem;
  background-color: #f2f3f4;

  .letter {
    height: 0.8rem;
    padding: 0 0.26rem;
    font-size: 0.28rem;
    line-height: 0.8rem;
    color: #333;
    @include scale-border-bottom(rgba(7, 17, 27, 0.2));
    // border-bottom: 1px solid #999;
    // background-color: #f2f3f4;
  }

  .city-box {
    padding-left: 0.26rem;
    width: 100%;
    overflow: hidden;

    .city-cell {
      float: left;
      width: 2.05rem;
      height: 0.7rem;
      font-size: 0.3rem;
      text-align: center;
      line-height: 0.7rem;
      background-color: #fff;
      border-radius: 4px;
      margin: 0.15rem 0.3rem 0.15rem 0;
      border: 1px solid #f6f6f6;

      &.active {
        color: #ff4d8e;
        border: 1px solid #ff4d8e;
      }
    }
  }
  .city-items {
    width: 100%;
    overflow: hidden;

    .city {
      width: 100%;
      height: 1.1rem;
      padding-left: 0.26rem;
      font-size: 0.3rem;
      line-height: 1.1rem;
      background-color: #fff;
      @include scale-border-bottom(rgba(7, 17, 27, 0.1));
    }
  }
}

.word {
  position: absolute;
  right: 0;
  top: 2rem;
  width: 0.5rem;
  // background-color: #ddd;

  ul {
    li {
      margin: 0.22rem 0;
      font-size: 0.28rem;
      text-align: center;
      color: rgb(59, 170, 214);

      &.active {
        color: #ff4d8e;
      }
    }
  }
}
</style>
