<template>
  <div class="find">
    <!-- 头部 -->
    <div class="header">
      <span class="title">发现</span>
    </div>
    <!-- 内容区 -->
    <div class="container" ref="container">
      <div class="wrapper">
        <!-- 轮播图 -->
        <FindBanner />

        <div class="bottom-list">
          <!-- 现场志，观剧团 -->
          <div class="show-box">
            <div class="show-cell1 show-cell">
              <div class="show-cell-title">现场志</div>
              <div class="show-cell-explain">
                那些最值得你看的
                <svg class="icon cell-icon" aria-hidden="true">
                  <use xlink:href="#icon-xihuan1" />
                </svg>
              </div>
            </div>
            <div class="show-cell2 show-cell">
              <div class="show-cell-title">观剧团</div>
              <div class="show-cell-explain">
                免费观评品质演出
                <svg class="icon cell-icon" aria-hidden="true">
                  <use xlink:href="#icon-yanjing" />
                </svg>
              </div>
            </div>
          </div>

          <!-- 视频区块 -->
          <div class="content-box">
            <div class="title">先睹为快</div>

            <div class="cell-box">
              <div
                class="cell"
                v-for="item in videosMsg"
                :key="item.num"
                @click="saveVideo(item.localVideo)"
              >
                <div class="cell-img">
                  <img :src="item.pic" />
                  <svg class="icon play-icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang" />
                  </svg>
                </div>
                <div class="cell-explain">{{item.title}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="whitespace"></div>
      </div>
    </div>
    <!-- 视频 -->
    <div class="play-box" v-show="currentVideo" @click="closeVideo()">
      <transition name="v">
        <div class="play" v-if="currentVideo">
          <video :src="`${publicPath}videos/01.mp4`" controls autoplay></video>
          <!-- <video :src="`${publicPath}currentVideo`" controls autoplay></video> -->
          <!-- <video src="http://vd2.bdstatic.com/mda-jkijxirgxw6ce8de/sc/mda-jkijxirgxw6ce8de.mp4" controls></video> -->
          <!-- <video src="http://vd2.bdstatic.com/mda-jjei333c92wam32z/sc/mda-jjei333c92wam32z.mp4" controls></video> -->
          <!-- <video :src="url" controls></video> -->
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import FindBanner from "../components/FindBanner";
import BScroll from "better-scroll";

export default {
  data: () => ({
    publicPath: process.env.BASE_URL,
    videosMsg: null,
    currentVideo: null,
    url:"http://vd2.bdstatic.com/mda-jkijxirgxw6ce8de/sc/mda-jkijxirgxw6ce8de.mp4"
  }),
  methods: {
    getData() {
      this.axios("/damai/api/videolist").then(res => {
        let { data } = res.data;
        this.videosMsg = data.videos;
        // console.log("sdddd",this.videosMsg)
      });
    },
    _initBscroll() {
      if (!this.bscroll) {
        this.bscroll = new BScroll(this.$refs.container, {
          click: true
        });
      } else {
        this.bscroll.refresh();
      }
    },
    saveVideo(v) {
      this.currentVideo = v;
    },
    closeVideo() {
      this.currentVideo = null;
    }
  },
  components: {
    FindBanner
  },
  mounted() {
    this.getData();
    this._initBscroll();
  }
};
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 0.3rem;
  height: 1.1rem;
  text-align: center;
  background-color: #181529;
  z-index: 10;

  .title {
    font-size: 0.46rem;
    vertical-align: middle;
    position: relative;
    top: -0.1rem;
    color: #fff;
  }
}

.container {
  margin-top: 1.1rem;
  height: 100vh;
  .wrapper {
    position: relative;
  }

  .bottom-list {
    margin-top: 0.7rem;
    background-color: #f0f0f0;
    padding-bottom: 3rem;
  }
}

// 现场志、观剧团
.show-box {
  display: flex;
  padding: 0 0.28rem;
  background-color: #f6f6f6;

  .show-cell {
    flex: 1;
    position: relative;
    top: -0.55rem;
    border: 1px solid rgba(7, 17, 27, 0.1);
    background-color: #fff;
    border-radius: 8px;

    .show-cell-title {
      font-size: 0.32rem;
      font-weight: bold;
      padding: 0.2rem;
    }
    .show-cell-explain {
      font-size: 0.24rem;
      padding: 0 0 0.2rem 0.2rem;
      color: #555;
    }

    &.show-cell1 {
      margin-right: 0.1rem;

      .cell-icon {
        position: absolute;
        right: 0.2rem;
        bottom: 0.15rem;
        font-size: 0.36rem;
      }
    }
    &.show-cell2 {
      margin-left: 0.1rem;

      .cell-icon {
        position: absolute;
        right: 0.2rem;
        bottom: 0.1rem;
        font-size: 0.5rem;
      }
    }
  }
}

// 视频区
.content-box {
  padding: 0 0.28rem;
  background-color: #f0f0f0;

  .title {
    font-size: 0.38rem;
    font-weight: bold;
    position: relative;
    top: -0.26rem;
  }

  .cell-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;

    .cell {
      flex: 0 0 3.44rem;
      //  width: 2.2rem;
      //  height: 6rem;
      font-size: 0.26rem;
      border-radius: 6px;
      margin-bottom: 0.2rem;
      overflow: hidden;
      background-color: #fff;

      .cell-img {
        width: 100%;
        position: relative;
        // height: 3rem;

        img {
          width: 100%;
          // height: 100%;
        }

        .play-icon {
          width: 0.8rem;
          height: 0.8rem;
          position: absolute;
          left: 50%;
          top: 34%;
          // font-size: 0.5rem;
          transform: translate(-50%);
          // z-index: 20;
          // background-color: #FFF;
        }
      }

      .cell-explain {
        padding: 0.1rem 0.1rem;
        line-height: 0.4rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}

.whitespace {
  width: 100%;
  height: 3rem;
  box-sizing: content-box;
  background-color: #f0f0f0;
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(100%);
}

.play-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  .play {
    width: 90%;
    video {
      width: 100%;
    }
  }
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: scale(0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s linear;
}

.v-enter-to,
.v-leave {
  opacity: 1;
  transform: scale(100%);
}
</style>
