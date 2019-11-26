<template>
  <!-- 导航条明星，详情页面 -->
  <div class="banner-star-box">
    <!-- 简介部分 -->
    <div class="detail-header">
      <div class="left-icon iconfont icon-zuo" @click="hideicon()"></div>
      <div class="detail-name">{{showItem.artistVO.nickname}}</div>
      <div class="detail-fans">
        <span class="detail-num">{{fansNum(showItem)}}</span> 粉丝
      </div>
      <div class="detail-perform">
        <span class="detail-num">{{showItem.artistVO.projectCount}}</span> 场在售演出
      </div>
      <div class="detail-fo-box">
        <span
          class="db1"
          v-show="!showItem.artistVO.bubble"
          @click="openFollow(showItem)"
        >关注</span>
        <span
          class="db1-active"
          v-show="showItem.artistVO.bubble"
          @click="cancelFollow(showItem)"
        >已关注</span>
        <span class="db2">分享</span>
      </div>
      <div class="icon-tou">
        <div class="detail-bg" :style="`background-image: url(${showItem.artistVO.headImg})`"></div>
        <i class="touxiang">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-renzheng" />
          </svg>
        </i>
      </div>
    </div>
    <!-- 内容区 -->
    <div class="detail-content">
      <div class="table detail-table border-1px" v-if="showItem.tourVO && showItem.tourVO.tourProjects">
        <div class="table-img">
          <img :src="showItem.tourVO.tourPic" />
        </div>
        <div class="table-content">
          <div class="title">{{showItem.artistVO.nickname}}</div>
          <div class="time">{{showItem.tourVO.tourProjects[0].showTime}}</div>
          <div class="address">{{showItem.tourVO.tourProjects[0].cityName}}</div>
          <div class="price-box">
            <div class="price">￥{{showItem.tourVO.priceLow}}</div>
            <div class="word">起</div>
          </div>
        </div>
      </div>
      <div class="tour border-1px" v-if="showItem.tourVO && showItem.tourVO.tourProjects">
        <div class="tour-city">巡演城市</div>
        <div class="cell-wrapper">
          <div class="city-cell-box">
            <div
              class="city-cell"
              v-for="(item,index) in showItem.tourVO.tourProjects"
              :key="index"
            >
              <div class="city-name">{{item.cityName}}</div>
              <div class="city-time">{{item.showTime}}</div>
              <span class="city-look">去看看</span>
            </div>
          </div>
        </div>
      </div>

      <div class="whitespace"></div>

      <div class="more-show" v-if="showItem.performanceMore[0]">
        <div class="more-title">更多演出</div>
        <div class="more-box">
          <div class="more-left">
            <img class="auto-img" :src="showItem.performanceMore[0].verticalPic" />
          </div>
          <div class="more-right">
            <div class="more-title">{{showItem.performanceMore[0].name}}</div>
            <div
              class="more-address"
            >{{showItem.performanceMore[0].venueCity}} | {{showItem.performanceMore[0].showTime}} | {{showItem.performanceMore[0].verticalPic}}</div>
            <div class="price-box">
              <div class="price">
                <span class="money">￥</span>
                {{showItem.performanceMore[0].priceLow}}
              </div>
              <div class="word">起</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 评论区 -->
      <div class="comment-box">
        <div class="comment-nav">
          <span @click="toggleGuan()" :class="{active1:all}">全部</span>
          <span @click="toggleAll()" :class="{active2:!all}">官方</span>
        </div>

        <div
          class="comment-cell-box"
          v-show="all"
          v-for="(s,index) in showItem.feedMergeDataList"
          :key="index"
        >
          <div class="comment-cell-header">
            <div class="comment-left-img">
              <img class="auto-img" v-lazy="s.watchData[0].userImg" :key="s.watchData[0].userImg" />
            </div>
            <div class="comment-right-box">
              <div class="right-title">{{s.watchData[0].userNick}}</div>
              <div class="right-time">
                {{s.bizTime}}发布评价
                <span class="star-star">
                  <van-rate
                    v-model="s.watchData[0].grades[0].value"
                    :size="12"
                    readonly
                    color="#ee0a24"
                    void-icon="star"
                    void-color="#eee"
                  />
                </span>
              </div>
            </div>
          </div>
          <div class="comment-cell-body">{{s.watchData[0].comment}}</div>
          <div class="comment-cell-img clearfix">
            <ul class="clearfix">

              <viewer :images="s.watchData[0].imgs">
                <li v-for="(img,index) in s.watchData[0].imgs" :key="index">
                  <img v-lazy="img" :key="img" />
                </li>
                <li></li>
              </viewer>
            </ul>
          </div>
          <div class="comment-cell-showinfo clearfix">
            <div class="showinfo-left" v-lazy:background-image="s.watchData[0].targetImg"></div>
            <div class="showinfo-right">
              <div class="right-header">{{s.watchData[0].targetName}}</div>
              <div
                class="right-footer"
              >{{s.watchData[0].targetCityName}} | {{s.watchData[0].targetShowTime}} | {{s.watchData[0].targetPlace}}</div>
            </div>
          </div>
          <div class="comment-cell-footer clearfix">
            <i class="iconfont icon-zan1"></i>
            <span>{{s.commentNum}}</span>
            <i class="iconfont icon-xiaoxi"></i>
            <span>{{s.praiseNum}}</span>
            <i class="iconfont icon-fenxiang"></i>
            <span>转载</span>
          </div>
        </div>

        <div class="comment-cell-box" v-show="!all"></div>
      </div>

      <div class="aiya">哎呀！只有这么多啦(￣ω￣)</div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: ["showItem"],
  data: () => {
    return {
      all: true,
      follow: false,
      showImg: false
    };
  },
  methods: {
    toggleGuan() {
      this.all = true;
    },
    toggleAll() {
      this.all = false;
    },
    cancelFollow(n) {
      this.$emit("cancel-follow", n);
    },
    openFollow(m) {
      this.$emit("open-follow", m);
    },
    hideicon() {
      this.$emit("hide-list");
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
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../public/scss/index.scss";
@import "../../../public/scss/mixin.scss";

// 导航栏明星
.banner-star-box {
  position: fixed;
  top: 1.1rem;
  left: 0;
  right: 0;
  bottom: 1.1rem;
  overflow: auto;
  background-color: #fff;
  // z-index: 1000;
  &::-webkit-scrollbar {
    display: none;
  }
}
.detail-header {
  height: 5.2rem;
  background: url("../../../public/images/明星背景.png") no-repeat center center;
  background-size: cover;
  position: relative;
  font-size: 0.4rem;
  color: #fff;
  overflow: hidden;
  padding: 1.1rem 0.4rem;

  .left-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    font-size: 0.4rem;
  }

  .detail-bg {
    position: absolute;
    bottom: 2.6rem;
    right: 0.6rem;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    overflow: hidden;
    // background: url("../../../public/images/zhoushen.png") no-repeat center
    //   center;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  i {
    position: absolute;
    bottom: 2.6rem;
    right: .6rem;
    font-size: 0.46rem;
  }

  .detail-name {
    padding-bottom: 0.3rem;
    font-size: 0.46rem;
  }

  .detail-fans {
    padding-bottom: 0.3rem;
    font-size: 0.3rem;
  }

  .detail-num {
    font-size: 0.38rem;
  }

  .detail-perform {
    padding-bottom: 0.38rem;
    font-size: 0.3rem;
  }

  .detail-fo-box {
    .db1 {
      padding: 0.08rem 0.3rem;
      margin-right: 0.24rem;
      font-size: 0.29rem;
      border-radius: 0.3rem;
      background-color: #ff4d8e;
    }

    .db1-active {
      padding: 0.08rem 0.3rem;
      margin-right: 0.24rem;
      font-size: 0.29rem;
      border-radius: 0.3rem;
      background-color: rgb(250, 137, 179);
    }

    .db2 {
      padding: 0.08rem 0.3rem;
      font-size: 0.29rem;
      border-radius: 0.3rem;
      background-color: rgba(193, 199, 215, 0.4);
    }
  }
}

.detail-table {
  margin: 0 0.4rem;
  padding-bottom: 0.3rem;
  @include scale-border-bottom(rgba(7, 17, 27, 0.2));
}

.tour {
  padding: 0.3rem 0.4rem;

  .tour-city {
    padding-bottom: 0.3rem;
    font-size: 0.36rem;
  }

  .cell-wrapper {
    width: 100%;
    height: 2.4rem;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .city-cell-box {
    width: 20rem;

    .city-cell {
      display: inline-block;
      width: 2rem;
      height: 2.4rem;
      padding: 0.5rem 0.1rem;
      margin-right: 0.38rem;
      font-size: 0.32rem;
      border-radius: 8px;
      text-align: center;
      background-color: #f0f0f0;
      // float: left;

      .city-name {
        font-size: 0.32rem;
      }

      .city-time {
        width: 1.8rem;
        padding: 0.2rem 0;
        margin: 0.1rem 0;
        font-size: 0.24rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .city-look {
        font-size: 0.28rem;
        padding: 0.1rem 0.2rem;
        border-radius: 0.3rem;
        color: #ff4d8e;
        background-color: rgba(255, 210, 210, 0.6);
      }
    }
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

.whitespace {
  width: 100%;
  height: 0.28rem;
  background-color: #f0f0f0;
}

.more-show {
  padding: 0.4rem;
  padding-bottom: 0;

  .more-title {
    font-size: 0.36rem;
    padding-bottom: 0.4rem;
  }

  .more-box {
    padding: 0.2rem 0.4rem;
    border: 1px solid rgba(204, 204, 204, 0.4);
    box-shadow: 0 4px 4px rgba(204, 204, 204, 0.4);
    border-radius: 6px;
    display: flex;

    .more-left {
      flex: 0 0 1.3rem;
      width: 1.3rem;
      height: 1.8rem;
      margin-right: 0.4rem;
      border-radius: 4px;
      overflow: hidden;
    }

    .more-right {
      flex: 1;
      position: relative;
      // background-color: #ddd;

      .more-title {
        font-size: 0.32rem;
        width: 4.2rem;
        height: 0.8rem;
        line-height: 0.8rem;
        // background: #777;
        padding-bottom: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .more-address {
        font-size: 0.24rem;
        color: #777;
        width: 4.2rem;
        height: 0.4rem;
        line-height: 0.4rem;
        // background: #e49;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .price-box {
        position: absolute;
        bottom: 0;
        left: 0;

        .price {
          display: inline-block;
          font-size: 0.34rem;
          color: #ff4d8e;

          .money {
            font-size: 0.26rem;
          }
        }

        .word {
          display: inline-block;
          padding-left: 0.1rem;
          font-size: 0.22rem;
          color: #777;
        }
      }
    }
  }
}

.comment-box {
  padding: 0.4rem;

  .comment-nav {
    width: 2rem;
    height: 0.6rem;
    font-size: 0.3rem;
    line-height: 0.6rem;
    text-align: center;
    border-radius: 0.3rem;
    background: #f0f0f0;

    span {
      display: inline-block;
      width: 1rem;

      &.active1 {
        border: 1px solid rgba(193, 200, 211, 0.8);
        border-radius: 0.3rem;
        background-color: #fff;
        // transition: all .5s linear;
      }
      &.active2 {
        border: 1px solid rgba(193, 200, 211, 0.8);
        border-radius: 0.3rem;
        background-color: #fff;
        // transition: all .5s linear;
      }
    }
  }

  .comment-cell-header {
    display: flex;
    padding: 0.38rem 0;

    .comment-left-img {
      flex: 0 0 1rem;
      width: 1rem;
      height: 1rem;
      margin-right: 0.4rem;
      border-radius: 50%;
      overflow: hidden;
    }

    .comment-right-box {
      flex: 1;

      .right-title {
        font-size: 0.32rem;
        padding: 0.14rem 0;
      }

      .right-time {
        font-size: 0.24rem;
        padding-top: 0.06rem;
        color: #777;

        .star-star {
          // display: inline-block;
          margin-left: 0.1rem;
          vertical-align: top;
          position: relative;
          top: 0.02rem;
        }
      }
    }
  }

  .comment-cell-body {
    width: 100%;
    font-size: 0.3rem;
    line-height: 0.5rem;
    margin-bottom: 0.3rem;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .comment-cell-img {
    ul {
      // width: 6.6rem;
      // max-height: 6.6rem;
      list-style: none;

      div {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
      }
    }

    li {
      flex: 0 0 2.1rem;
      width: 2.1rem;
      height: 2.1rem;
      margin-bottom: 0.28rem;
      border-radius: 8px;
      overflow: hidden;
      // background-image: url("../../../public/images/滤镜背景02.png");
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;

      // float: left;
      // margin-right: .2rem;
      // padding: 0 0.3rem 0.3rem 0;

      img {
        width: 100%;
        height: 100%;
      }

      &:last-child {
        display: inline-block;
        content: "";
        width: 0;
        height: 0;
        margin: 0;
      }
    }
  }

  .comment-cell-showinfo {
    padding: 0.2rem;
    margin-bottom: 0.3rem;
    border-radius: 8px;
    border: 1px solid rgba(7, 17, 27, 0.1);

    .showinfo-left {
      width: 0.77rem;
      height: 1rem;
      border-radius: 8px;
      margin-right: 0.34rem;
      overflow: hidden;
      float: left;
      // background-image: url("../../../public/images/caomei.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 94%;
    }

    .showinfo-right {
      float: left;
      font-size: 0.28rem;
      width: 5rem;

      .right-header {
        padding: 0.15rem 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .right-footer {
        font-size: 0.24rem;
        color: #666;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        // padding: .1rem 0;
      }
    }
  }

  .comment-cell-footer {
    margin-top: 0.2rem;

    span {
      float: right;
      font-size: 0.24rem;
      padding-right: 0.1rem;
      line-height: 0.18rem;
    }

    i {
      float: right;
      display: inline;
      font-size: 0.22rem;
      padding-right: 0.4rem;
      // line-height: .34rem;
      &:first-child {
        padding: 0;
      }
    }
  }
}

.aiya {
  width: 100%;
  height: 2.4rem;
  line-height: 2.4rem;
  text-align: center;
  font-size: 0.24rem;
  color: #999;
}
</style>
