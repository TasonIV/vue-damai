<template>
  <div class="show">
    <div class="header-box">
      <div class="banner-box border-1px">
        <div class="banner">
          <ul>
            <li :class="{active: type == 1}" @click="changType(1)">全部</li>
            <li :class="{active: type == 2}" @click="changType(2)">演唱会</li>
            <li :class="{active: type == 3}" @click="changType(3)">话剧歌剧</li>
            <li :class="{active: type == 4}" @click="changType(4)">音乐会</li>
            <li :class="{active: type == 5}" @click="changType(5)">体育</li>
            <li :class="{active: type == 6}" @click="changType(6)">曲苑杂坛</li>
            <li :class="{active: type == 7}" @click="changType(7)">儿童亲子</li>
            <li :class="{active: type == 8}" @click="changType(8)">展览休闲</li>
            <li :class="{active: type == 9}" @click="changType(9)">舞蹈芭蕾</li>
            <li :class="{active: type == 10}" @click="changType(10)">二次元</li>
            <li :class="{active: type == 11}" @click="changType(11)">旅游展览</li>
          </ul>
        </div>
        <div class="banner-icon iconfont icon-navicon" @click="showSlide()"></div>
      </div>

      <div class="add-time">
        <div class="at" @click="toggleDown()">
          <span class="ad1">广州</span>
          <i class="icon iconfont icon-shangla" v-if="isDownA"></i>
          <i class="icon iconfont icon-xiala" v-if="!isDownA"></i>
        </div>
        <div class="at">
          <span class="ad2" @click="toggleDown()">全部时间</span>
          <i class="icon iconfont icon-shangla" v-if="!isDownA"></i>
          <i class="icon iconfont icon-xiala" v-if="isDownA"></i>
        </div>
      </div>
    </div>

    <div class="container" ref="scrollA" v-if="type == 1">
      <div class="wrapper">
        <div class="table" v-for="(list3,index) in listDataAll" :key="index" @click="save(list3)">
          <div class="table-img">
            <img :src="list3.verticalPic" />
            <div class="type">{{list3.categoryName}}</div>
          </div>
          <div class="table-content">
            <div class="title">{{list3.name}}</div>
            <div class="time">{{list3.showTime}}</div>
            <div class="address">{{adChange(list3)}}</div>
            <div class="price-box">
              <div class="price">￥{{list3.priceLow}}</div>
              <div class="word">起</div>
            </div>
            <div class="btn" @click="buyTicket()">去购票</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" ref="scrollA" v-else-if="type == 2">
      <div class="wrapper">
        <div class="table" v-for="(list3,index) in listData5" :key="index" @click="save(list3)">
          <div class="table-img">
            <img :src="list3.verticalPic" />
            <div class="type">{{list3.categoryName}}</div>
          </div>
          <div class="table-content">
            <div class="title">{{list3.name}}</div>
            <div class="time">{{list3.showTime}}</div>
            <div class="address">{{adChange(list3)}}</div>
            <div class="price-box">
              <div class="price">￥{{list3.priceLow}}</div>
              <div class="word">起</div>
            </div>
            <div class="btn" @click="buyTicket()">去购票</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" ref="scrollA" v-else-if="type == 3">
      <div class="wrapper">
        <div class="table" v-for="(list3,index) in listData4" :key="index" @click="save(list3)">
          <div class="table-img">
            <img :src="list3.verticalPic" />
            <div class="type">{{list3.categoryName}}</div>
          </div>
          <div class="table-content">
            <div class="title">{{list3.name}}</div>
            <div class="time">{{list3.showTime}}</div>
            <div class="address">{{adChange(list3)}}</div>
            <div class="price-box">
              <div class="price">￥{{list3.priceLow}}</div>
              <div class="word">起</div>
            </div>
            <div class="btn" @click="buyTicket()">去购票</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" ref="scrollA" v-else-if="type == 4">
      <div class="wrapper">
        <div class="table" v-for="(list3,index) in listData3" :key="index" @click="save(list3)">
          <div class="table-img">
            <img :src="list3.verticalPic" />
            <div class="type">{{list3.categoryName}}</div>
          </div>
          <div class="table-content">
            <div class="title">{{list3.name}}</div>
            <div class="time">{{list3.showTime}}</div>
            <div class="address">{{adChange(list3)}}</div>
            <div class="price-box">
              <div class="price">￥{{list3.priceLow}}</div>
              <div class="word">起</div>
            </div>
            <div class="btn" @click="buyTicket()">去购票</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" ref="scrollA" v-else-if="type == 5">
      <div class="wrapper">
        <div class="table" v-for="(list3,index) in listData2" :key="index" @click="save(list3)">
          <div class="table-img">
            <img :src="list3.verticalPic" />
            <div class="type">{{list3.categoryName}}</div>
          </div>
          <div class="table-content">
            <div class="title">{{list3.name}}</div>
            <div class="time">{{list3.showTime}}</div>
            <div class="address">{{adChange(list3)}}</div>
            <div class="price-box">
              <div class="price">￥{{list3.priceLow}}</div>
              <div class="word">起</div>
            </div>
            <div class="btn" @click="buyTicket()">去购票</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" ref="scrollA" v-else-if="type == 6">
      <div class="wrapper">
        <div class="table" v-for="(list3,index) in listData1" :key="index" @click="save(list3)">
          <div class="table-img">
            <img :src="list3.verticalPic" />
            <div class="type">{{list3.categoryName}}</div>
          </div>
          <div class="table-content">
            <div class="title">{{list3.name}}</div>
            <div class="time">{{list3.showTime}}</div>
            <div class="address">{{adChange(list3)}}</div>
            <div class="price-box">
              <div class="price">￥{{list3.priceLow}}</div>
              <div class="word">起</div>
            </div>
            <div class="btn" @click="buyTicket()">去购票</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" ref="scrollA" v-else-if="type == 7">
      <div class="wrapper">
        <div class="table" v-for="(list3,index) in listData5" :key="index" @click="save(list3)">
          <div class="table-img">
            <img :src="list3.verticalPic" />
            <div class="type">{{list3.categoryName}}</div>
          </div>
          <div class="table-content">
            <div class="title">{{list3.name}}</div>
            <div class="time">{{list3.showTime}}</div>
            <div class="address">{{adChange(list3)}}</div>
            <div class="price-box">
              <div class="price">￥{{list3.priceLow}}</div>
              <div class="word">起</div>
            </div>
            <div class="btn" @click="buyTicket()">去购票</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" ref="scrollA" v-else-if="type == 8">
      <div class="wrapper">
        <div class="table" v-for="(list3,index) in listData4" :key="index" @click="save(list3)">
          <div class="table-img">
            <img :src="list3.verticalPic" />
            <div class="type">{{list3.categoryName}}</div>
          </div>
          <div class="table-content">
            <div class="title">{{list3.name}}</div>
            <div class="time">{{list3.showTime}}</div>
            <div class="address">{{adChange(list3)}}</div>
            <div class="price-box">
              <div class="price">￥{{list3.priceLow}}</div>
              <div class="word">起</div>
            </div>
            <div class="btn" @click="buyTicket()">去购票</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" ref="scrollA" v-else-if="type == 9">
      <div class="wrapper">
        <div class="table" v-for="(list3,index) in listData3" :key="index" @click="save(list3)">
          <div class="table-img">
            <img :src="list3.verticalPic" />
            <div class="type">{{list3.categoryName}}</div>
          </div>
          <div class="table-content">
            <div class="title">{{list3.name}}</div>
            <div class="time">{{list3.showTime}}</div>
            <div class="address">{{adChange(list3)}}</div>
            <div class="price-box">
              <div class="price">￥{{list3.priceLow}}</div>
              <div class="word">起</div>
            </div>
            <div class="btn" @click="buyTicket()">去购票</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" ref="scrollA" v-else-if="type == 10">
      <div class="wrapper">
        <div class="table" v-for="(list3,index) in listData1" :key="index" @click="save(list3)">
          <div class="table-img">
            <img :src="list3.verticalPic" />
            <div class="type">{{list3.categoryName}}</div>
          </div>
          <div class="table-content">
            <div class="title">{{list3.name}}</div>
            <div class="time">{{list3.showTime}}</div>
            <div class="address">{{adChange(list3)}}</div>
            <div class="price-box">
              <div class="price">￥{{list3.priceLow}}</div>
              <div class="word">起</div>
            </div>
            <div class="btn" @click="buyTicket()">去购票</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" ref="scrollA" v-else>
      <div class="wrapper">
        <div class="table" v-for="(list3,index) in listData2" :key="index" @click="save(list3)">
          <div class="table-img">
            <img :src="list3.verticalPic" />
            <div class="type">{{list3.categoryName}}</div>
          </div>
          <div class="table-content">
            <div class="title">{{list3.name}}</div>
            <div class="time">{{list3.showTime}}</div>
            <div class="address">{{adChange(list3)}}</div>
            <div class="price-box">
              <div class="price">￥{{list3.priceLow}}</div>
              <div class="word">起</div>
            </div>
            <div class="btn" @click="buyTicket()">去购票</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 侧边栏 -->
    <div class="slide-box" v-show="isSlideA">
      <transition name="slide">
        <div class="sli-container" v-show="isSlideB">
          <div class="sli-header">
            <i class="sli-icon iconfont icon-bacha" @click="hideSlide()"></i>
          </div>
          <div class="sli-img">
            <img src="../../../public/images/realname_error.png" alt />
          </div>
          <div class="sli-text">敬请期待~</div>
        </div>
      </transition>
    </div>

    <!-- 下滑栏 -->
    <div class="down" v-show="isDownA" @click="toggleDown()">
      <transition name="down">
        <div class="down-container" v-show="isDownB">
          <div class="down-box">
            <div class="down-img">
              <img src="../../../public/images/realname_error.png" alt />
            </div>
          </div>
          <div class="down-text">敬请期待~</div>
        </div>
      </transition>
    </div>

    <!-- 详情页 -->
    <transition name="ani">
      <ShowDetail v-if="isDetail" :item="item" @m-hide-detail="hideDetail" ref="showD" />
    </transition>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import ShowDetail from "../../components/ShowDetail/ShowDetail";
import { mapState } from "vuex";

export default {
  props: ["navType"],
  components: {
    ShowDetail
  },
  data() {
    return {
      type: 1,
      addressChange: null,
      item: null,
      isDetail: false,
      isSlideA: false,
      isSlideB: false,
      isDownA: false,
      isDownB: false
    };
  },
  computed: {
    ...mapState({
      listDataAll: "listDataAll",
      listData1: "listData1",
      listData2: "listData2",
      listData3: "listData3",
      listData4: "listData4",
      listData5: "listData5"
    })
  },
  methods: {
    changType(n) {
      this.type = n;
    },
    getListData() {
      this.$store.dispatch("getListData", { axios: this.axios });
    },
    _initBscroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.scrollA, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    adChange(list3) {
      if (list3.detailType == 1) {
        return list3.detailOneType.detailViewComponentMap.item.staticData.venue
          .venueAddr;
      } else {
        return list3.venueName;
      }
    },
    save(item) {
      this.item = item;
      this.isDetail = true;
    },
    hideDetail() {
      this.isDetail = false;
    },
    hideSlide() {
      setTimeout(() => {
        this.isSlideA = false;
      }, 300);
      this.isSlideB = false;
    },
    showSlide() {
      this.isSlideB = true;
      this.isSlideA = true;
    },
    buyTicket() {
      setTimeout(() => {
        this.$refs.showD.showAniEF();
      }, 10);
    },
    toggleDown() {
      if (!this.isDownA) {
        this.isDownA = true;
        this.isDownB = true;
      } else {
        setTimeout(() => {
          this.isDownA = false;
        }, 300);
        this.isDownB = false;
      }
    }
  },
  watch: {
    listDataAll() {
      this._initBscroll();
    }
  },
  mounted() {
    this.getListData();
    this._initBscroll();
    if (this.navType) {
      this.type = this.navType; // 精选页面菜单 跳转至此页面，更改索引
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../public/scss/index.scss";
@import "../../../public/scss/mixin.scss";

.show {
  padding-top: 1.1rem;
  position: relative;
  background: #fff;
}

.header-box {
  position: fixed;
  top: 1.1rem;
  left: 0;
  width: 100%;
  z-index: 11;
  background-color: #fff;
}

.banner-box {
  display: flex;
  color: #000;
  @include scale-border-bottom(rgba(7, 17, 27, 0.2));
  //   border-bottom: 1px solid #ddd;

  .banner {
    flex: 1;
    height: 0.9rem;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }

    ul {
      height: 0.9rem;
      width: 16rem;
    }

    li {
      float: left;
      line-height: 0.9rem;
      font-size: 0.3rem;
      padding-right: 0.4rem;

      &:first-child {
        padding-left: 0.3rem;
      }
      &.active {
        color: #ff4d8e;
      }
    }
  }
  .banner-icon {
    flex: 0 0 0.9rem;
    width: 0.9rem;
    height: 0.6rem;
    margin: 0.15rem 0;
    line-height: 0.6rem;
    text-align: center;
    font-size: 0.42rem;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }
}

.add-time {
  width: 100%;
  height: 0.9rem;
  background-color: #fff;
  font-size: 0.3rem;
  color: #6c6c6c;
  @include scale-border-bottom(rgba(7, 17, 27, 0.1));

  .at {
    height: 0.9rem;
    line-height: 0.9rem;
    padding-left: 0.5rem;
    text-align: center;
    float: left;

    .ad1 {
      margin-right: 0.1rem;
    }

    .ad2 {
      margin-right: 0.1rem;
      padding-left: 0.5rem;
    }

    .icon {
      font-size: 0.2rem;
      vertical-align: top;
    }
  }
}

.container {
  // height: calc(100vh-1.1rem-0.9rem-1.1rem-1.1rem);
  height: 9.7rem;
  margin-top: 1.8rem;
  padding-bottom: 2rem;
  overflow: hidden;

  .wrapper {
    overflow: auto;
    background-color: #fff;
  }
}

.slide-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0.5);

  .sli-container {
    width: 70%;
    height: 100%;
    float: right;
    background-color: #fff;
    text-align: 100%;
    text-align: center;
  }

  .sli-header {
    width: 100%;
    height: 1rem;
    position: relative;

    .sli-icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 1rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
    }
  }

  .sli-img {
    width: 100%;
    margin-top: 2rem;

    img {
      width: 100%;
    }
  }

  .sli-text {
    font-size: 0.34rem;
    color: #f378a5;
  }
}

.down {
  position: fixed;
  top: 2.9rem;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0.5);

  .down-container {
    width: 100%;
    height: 4rem;
    background: #fff;
    text-align: center;

    .down-box {
      width: 100%;
      padding-top: 0.6rem;
      display: flex;
      justify-content: center;

      .down-img {
        width: 3rem;

        img {
          width: 100%;
        }
      }
    }

    .down-text {
      font-size: 0.3rem;
      color: #f378a5;
    }
  }
}

.table {
  padding: 0.24rem 0;
  margin: 0 0.24rem;
  display: flex;
  background-color: #fff;
  @include scale-border-bottom(rgba(7, 17, 27, 0.1));

  .table-img {
    flex: 0 0 2.1rem;
    width: 2.1rem;
    // background-color: #ddd;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }

    .type {
      position: absolute;
      top: 0.1rem;
      right: 0.1rem;
      color: rgb(199, 197, 197);
      font-size: 0.2rem;
      padding: 0.08rem 0.1rem;
      border-radius: 5px;
      background-color: rgba(7, 17, 27, 1);
    }
  }

  .table-content {
    flex: 1;
    padding-left: 0.2rem;
    font-size: 0.4rem;
    position: relative;

    .title {
      width: 100%;
      // height: 1rem;
      line-height: 0.5rem;
      font-size: 0.32rem;
      color: #000;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .time {
      font-size: 0.26rem;
      padding: 0.2rem 0;
      color: #484848;
    }

    .address {
      font-size: 0.28rem;
      width: 4.7rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #484848;
    }

    .price-box {
      position: absolute;
      bottom: 0;
      left: 0.2rem;

      .price {
        display: inline-block;
        font-size: 0.4rem;
        color: #ff4d8e;
      }

      .word {
        display: inline-block;
        padding-left: 0.2rem;
        font-size: 0.22rem;
        color: #777;
      }
    }

    .btn {
      position: absolute;
      bottom: 0;
      right: 0;
      color: #fff;
      font-size: 0.3rem;
      border-radius: 0.32rem;
      padding: 0.12rem 0.2rem;
      background-color: #ff4d8e;
    }
  }
}

// 侧滑动画
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s linear;
}

.slide-enter-to,
.slide-leave {
  transform: translateX(0);
}

// 下滑动画
.down-enter,
.down-leave-to {
  // transform: scaleY(0);
  opacity: 0;
}

.down-enter-active,
.down-leave-active {
  transition: all 0.3s linear;
}

.down-enter-to,
.down-leave {
  // transform: scaleY(100%);
  opacity: 1;
}

// 详情页动画
.ani-enter,
.ani-leave-to {
  transform: scale(0);
  opacity: 0;
}

.ani-enter-active,
.ani-leave-active {
  transition: all 0.2s linear;
}

.ani-enter-to,
.ani-leave {
  transform: scale(100%);
  opacity: 1;
}
</style>
