<template>
  <div class="star">
    <div class="banner-box border-1px">
      <div class="banner">
        <ul>
          <li :class="{active:this.type == 20}" @click="showBannerStar(0,20)">推荐</li>
          <li
            v-for="(item,index) in bannerStar"
            :key="index"
            :class="{active: type == index}"
            @click="showBannerStar(item,index)"
          >{{item.artistVO.bname}}</li>
        </ul>
      </div>
    </div>
    <div class="container" ref="cont">
      <div class="wrapper">
        <!-- 推荐页面 -->
        <div class="recomend-box" v-if="this.type == 20">
          <div class="star-box" v-for="(item,index) in listStar" :key="index">
            <div class="star-top" @click="showListStar(item)">
              <div class="star-img">
                <img class="auto-img" :src="item.artistVO.headImg" />
                <i class="touxiang">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-renzheng" />
                  </svg>
                </i>
              </div>
              <div class="star-msg">
                <span class="star-name">{{item.artistVO.nickname}}</span>
                <span class="star-type">歌手</span>
                <div class="star-show">{{item.artistVO.projectCount}}场在售演出 | {{fansNum(item)}}粉丝</div>
              </div>
            </div>

            <div class="guanzhu1" v-show="!item.artistVO.bubble" @click.stop="openListFnc(item)">+关注</div>
            <div
              class="guanzhu2"
              v-show="item.artistVO.bubble"
              @click.stop="cancelListFnc(item)"
            >已关注</div>

            <div class="per-box" v-if="item.performanceMore[0]">
              <div class="table">
                <div class="table-img">
                  <img :src="item.performanceMore[0].verticalPic" />
                  <div class="type">{{item.performanceMore[0].categoryName}}</div>
                </div>
                <div class="table-content">
                  <div class="title">{{item.performanceMore[0].name}}</div>
                  <div class="time">{{item.performanceMore[0].showTime}}</div>
                  <div
                    class="address"
                  >{{item.performanceMore[0].venueCity}} | {{item.performanceMore[0].venueName}}</div>
                  <div class="price-box">
                    <div class="price">￥{{item.performanceMore[0].priceLow}}</div>
                    <div class="word">起</div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="item.tourVO">
              <div class="per-box">
                <div class="table">
                  <div class="table-img">
                    <img :src="item.tourVO.tourPic" />
                  </div>
                  <div class="table-content">
                    <div class="title">{{item.tourVO.tourName}}</div>
                    <div class="time">{{item.tourVO.tourProjects[0].showTime}}</div>
                    <div class="address">{{item.tourVO.tourProjects[0].cityName}}</div>
                    <div class="price-box">
                      <div class="price">￥{{item.tourVO.priceLow}}</div>
                      <div class="word">起</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="show-city" v-if="item.tourVO.tourProjects.length>1">
                <div class="show-title">
                  <span>巡演城市</span>
                  <svg class="icon show-icon" aria-hidden="true">
                    <use xlink:href="#icon-shanghai" />
                  </svg>
                </div>

                <div class="row-banner">
                  <div class="row-ul">
                    <span v-for="(i,j) in item.tourVO.tourProjects" :key="j">
                      {{i.cityName}}
                      <i class="iconfont icon-you"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 导航条明星，详情页面 -->
        <BannerStar
          :showItem="bannerItem"
          @back-all="backAll()"
          @open-follow="openBannerFnc"
          @cancel-follow="cancelBannerFnc"
          v-else
        />

        <!-- 列表明星，详情页面 -->
        <ListStar
          :showItem="listItem"
          @hide-list="hideList()"
          @open-follow="openListFnc"
          @cancel-follow="cancelListFnc"
          v-if="isShowList"
        />
      </div>
    </div>
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import BannerStar from "../../components/StarsDetail/BannerStar";
import ListStar from "../../components/StarsDetail/ListStar";
import Loading from "../../components/Loading";
import { mapState } from "vuex";

export default {
  components: {
    BannerStar,
    ListStar,
    Loading
  },
  data: () => ({
    type: 20,
    // bannerStar: [],
    // listStar: [],
    bannerItem: {}, // 选中导航歌手的数据
    listItem: {},
    follow: false,
    followList: [],
    isShowList: false,
    isLoading: false
  }),
  computed: {
    ...mapState({
      bannerStar: "bannerStar",
      listStar: "listStar"
    })
  },
  mounted() {
    this.$store.dispatch("getStarData", { axios: this.axios });
  },
  methods: {
    showBannerStar(item, index) {
      this.type = index;
      if (!item) {
        this.bannerItem = [];
      } else {
        this.bannerItem = item;
      }
    },
    showListStar(item) {
      this.listItem = item;
      this.isShowList = true;
    },
    // 关注
    openBannerFnc(item) {
      this.$store.commit("likeStar", { item });
    },
    // 取消关注
    cancelBannerFnc(item) {
      this.$store.commit("cancelLikeStar", { item });
    },
    // 关注
    openListFnc(item) {
      if (this.$store.state.isLogin) {
        this.$store.commit("likeStar", { item });
      } else {
        this.$router.push("/sign");
      }
    },
    // 取消关注
    cancelListFnc(item) {
      this.$store.commit("cancelLikeStar", { item });
    },
    hideList() {
      this.isShowList = false;
    },
    backAll() {
      this.type = 20;
    },

    // 初始化粉丝
    fansNum(item) {
      let n = item.artistVO.fansNum;
      let thousand = Math.floor(n / 1000);
      let num = thousand / 10;
      if (num < 1) {
        return `${n}`;
      } else {
        return `${num}万`;
      }
    },
    // 初始化时间
    initTime(num) {
      let time = num.toString();
      console.log("格式化后的时间", time);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../public/scss/index.scss";
@import "../../../public/scss/mixin.scss";

.star {
  position: fixed;
  top: 1.1rem;
  left: 0;
  right: 0;
  bottom: 1rem;
  background-color: #fff;
}

.banner-box {
  display: flex;
  color: #000;
  @include scale-border-bottom(rgba(7, 17, 27, 0.2));

  .banner {
    flex: 1;
    height: 0.9rem;
    // margin-right: .3rem;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }

    ul {
      height: 0.9rem;
      width: 11rem;
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

.container {
  height: 10.6rem;
  position: fixed;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  .wrapper {
  }
}

.star-box {
  margin: 0 0.2rem;
  padding: 0.4rem 0;
  position: relative;
  // display: flex;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);

  .star-top {
    display: flex;
  }
  .star-img {
    flex: 0 0 1.3rem;
    width: 1.3rem;
    height: 1.3rem;
    position: relative;

    img {
      border-radius: 50%;
      overflow: hidden;
    }

    i {
      position: absolute;
      bottom: -0.08rem;
      right: -0.1rem;
      font-size: 0.46rem;
    }
  }

  .star-msg {
    flex: 1;
    padding: 0 0.2rem 0 0.3rem;

    .star-name {
      display: inline-block;
      font-size: 0.32rem;
      vertical-align: top;
      margin-top: 0.3rem;
    }

    .star-type {
      display: inline-block;
      padding: 0.05rem 0.1rem;
      border-radius: 4px;
      margin-left: 0.1rem;
      font-size: 0.2rem;
      background-color: #f0f0f0;
      vertical-align: top;
      margin-top: 0.3rem;
      color: #222;
    }

    .star-show {
      font-size: 0.28rem;
      // margin: .2rem 0 1.6rem 0;
      line-height: 0;
      vertical-align: top;
    }
  }

  .guanzhu1 {
    position: absolute;
    right: 0;
    top: 0.6rem;
    padding: 0.1rem 0.18rem;
    border-radius: 0.4rem;
    font-size: 0.26rem;
    font-weight: bold;
    border: 1px solid #ff4d8e;
    color: #ff4d8e;
    background-color: pink;
  }

  .guanzhu2 {
    position: absolute;
    right: 0;
    top: 0.6rem;
    padding: 0.1rem 0.18rem;
    border-radius: 0.4rem;
    font-size: 0.26rem;
    font-weight: bold;
    border: 1px solid pink;
    color: #fff;
    background-color: #fa89b3;
  }
}

.table {
  // padding: 0.24rem 0;
  padding-top: 0.36rem;
  margin: 0 0.2rem;
  display: flex;
  background-color: #fff;

  .table-img {
    flex: 0 0 2rem;
    width: 2rem;
    // background-color: #ddd;
    position: relative;
    border-radius: 6px;
    overflow: hidden;

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
      font-size: 0.24rem;
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
  }
}

.show-city {
  margin: 0.3rem 0.1rem 0 0.1rem;
  padding: 0.1rem 0 0.1rem 0.3rem;
  height: 0.6rem;
  border: 1px solid rgba(218, 218, 218, 1);
  box-shadow: 4px 4px 6px 0 rgba(218, 218, 218, 0.8);
  font-size: 0.3rem;

  .show-title {
    display: inline-block;
    float: left;
    width: 1.6rem;
    font-size: 0.24rem;

    span {
      position: relative;
      top: 0.04rem;
      padding-right: 0.06rem;
    }
  }

  .show-icon {
    font-size: 0.4rem;
    vertical-align: middle;
  }

  .row-banner {
    display: inline-block;
    float: left;
    width: 5.12rem;
    height: 0.4rem;
    line-height: 0.4rem;
    // background-color: #ddd;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }

    .row-ul {
      width: 5.8rem;
    }

    span {
      font-size: 0.26rem;
    }

    i {
      font-size: 0.22rem;
    }
  }
}
</style>
