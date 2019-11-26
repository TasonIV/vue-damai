<template>
  <div class="show-detail">
    <!-- 上半部 -->
    <div class="header-box">
      <div class="bg" :style="`background-image:url(${item.verticalPic})`"></div>
      <!-- 导航 -->
      <div class="navbar clearfix">
        <i class="nav-left iconfont icon-zuo" @click="$router.back()"></i>
        <i class="nav-right iconfont icon-fenxiang" @click="showShare()"></i>
      </div>
      <!-- 商品栏 -->
      <div class="show-cell">
        <div class="cell-left">
          <img v-lazy="item.verticalPic" alt />
        </div>
        <div class="cell-right">
          <div class="cell-title">{{item.name}}</div>
          <div class="cell-price">￥{{item.priceStr}}</div>
        </div>
      </div>
    </div>
    <!-- 下半部 -->
    <div class="below-box">
      <div class="service" @click="showAniAB()">
        <span class="ser-title">服务</span>
        <span>{{notices[0].tagName}} · {{notices[1].tagName}} · {{notices[2].tagName}} · {{notices[3].tagName}}</span>
        <span class="ser-icon iconfont icon-you"></span>
      </div>
      <div class="show-time clearfix border-1px" @click="showAniEF()">
        <div class="time">
          {{item.showTime}}
          <span class="iconfont icon-you"></span>
        </div>
        <div class="tip">{{this.staticData.itemBase.showDuration}}</div>
      </div>
      <div class="location-box">
        <div class="location">{{this.venue.venueCityName}} | {{this.venue.venueName}}</div>
        <div class="address">{{this.venue.venueAddr}}</div>
      </div>
      <div class="white-space"></div>
      <van-sticky>
        <div class="tabbar border-1px">
          <span class="tab" :class="{active:type == 1}" @click="changeType(1)">详情</span>
          <span
            class="tab"
            :class="{active:type == 2}"
            @click="changeType(2)"
            v-if="this.comments.hotComments"
          >评价</span>
          <span class="tab" :class="{active:type == 3}" @click="changeType(3)">须知(Q&A)</span>
        </div>
      </van-sticky>

      <!-- 详情 -->
      <div class="detail" v-if="type == 1">
        <div class="det-title">演出介绍</div>
        <div class="det-container" v-html="this.itemExtendInfo.itemExtend"></div>
      </div>

      <!-- 评价 -->
      <div class="discuss" v-if="type == 2">
        <div class="discuss-title">观众热评</div>
        <div class="discuss-cell-box" v-for="(h,k) in this.comments.hotComments" :key="k">
          <div class="dis-bgicon">
            <img src="../../../public/images/comment_luxury_icon.png" alt />
          </div>
          <div class="discuss-header">
            <div class="dis-left" v-lazy:background-image="h.userDO.headerImage"></div>
            <div class="dis-right">
              <div class="dis-name">{{h.userDO.nickname}}</div>
              <div class="dis-time">{{h.gmtModified}}</div>
            </div>
          </div>
          <div class="dis-aslid">
            <van-rate
              v-model="h.gradeDOList[0].value"
              :size="12"
              readonly
              color="#ee0a24"
              void-icon="star"
              void-color="#eee"
              class="vant-star"
            />
            <span>{{h.gradeDOList[0].valueDesc}}</span>
          </div>
          <div class="dis-content">{{h.textDOList[0].value}}</div>
          <div class="dis-footer clearfix">
            <svg class="icon ic" aria-hidden="true" v-if="true">
              <use xlink:href="#icon-zan" />
            </svg>
            <svg class="icon ic" aria-hidden="true" v-if="false">
              <use xlink:href="#icon-zan1" />
            </svg>
            <span>赞</span>
            <i class="ic iconfont icon-xiaoxi"></i>
            <span>回复</span>
            <i class="ic iconfont icon-fenxiang"></i>
            <span>转载</span>
          </div>
        </div>
        <div class="dis-all" @click="showAllDis()" v-if="this.comments.data">查看全部评价</div>
      </div>

      <!-- 须知 -->
      <div class="notice" v-show="type == 3">
        <div class="notice-title">{{this.noticeMatter.title}}</div>
        <!-- 购票须知 -->
        <div class="notice-buy">{{this.noticeMatter.noticeList[0].noteTitle}}</div>
        <div class="notice-cell" v-for="(n,i) in this.buyNoteList.slice(0,3)" :key="i+10">
          <div class="notice-ques">
            <span class="ques-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gouxuan2" />
              </svg>
            </span>
            <span>{{n.title}}</span>
          </div>
          <div class="notice-ans">{{n.content}}</div>
        </div>
        <div
          class="notice-all"
          @click="showAniCD(1)"
        >全部{{this.noticeMatter.noticeList[0].ticketNoteList.length}}条购票须知</div>
        <!-- 观演须知 -->
        <div class="notice-buy">{{this.noticeMatter.noticeList[1].noteTitle}}</div>
        <div class="notice-cell" v-for="(m,j) in this.showNoteList.slice(0,3)" :key="j+20">
          <div class="notice-ques">
            <span class="ques-icon">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gouxuan2" />
              </svg>
            </span>
            <span>{{m.title}}</span>
          </div>
          <div class="notice-ans">{{m.content}}</div>
        </div>
        <div
          class="notice-all"
          @click="showAniCD(2)"
        >全部{{this.noticeMatter.noticeList[1].ticketNoteList.length}}条购票须知</div>
      </div>
      
    </div>

    <!-- 滑动  服务说明 -->
    <div class="slide-tip" v-show="slideA">
      <transition name="tip">
        <div class="tip-box" v-show="slideB">
          <div class="slide-title border-1px">
            <div class="notice-bar active">服务说明</div>
            <i class="slide-icon iconfont icon-bacha" @click="hideAniAB()"></i>
          </div>
          <div class="tip-container">
            <div class="tip-wrapper">
              <div class="notice-cell" v-for="(s,index) in this.notices" :key="index">
                <div class="notice-ques">
                  <span class="ques-icon" v-show="s.isSupport == `true`">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-gouxuan2" />
                    </svg>
                  </span>
                  <span class="ques-icon2" v-show="s.isSupport == `false`">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-close" />
                    </svg>
                  </span>
                  <span>{{s.tagName}}</span>
                </div>
                <div class="notice-ans">{{s.tagDesc}}</div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- 滑动  购票 -->
    <div class="slide-tip" v-show="slideE">
      <transition name="tip">
        <div class="ti" v-show="slideF">
          <div class="ti-header border-1px">
            购票
            <i class="ti-icon iconfont icon-bacha" @click="hideAniEF()"></i>
          </div>
          <div class="ti-wrapper border-1px">
            <div class="ti-main">
              <div class="grade">
                <span class="ti-chang">场次</span>
                <span class="ti-tip">场次时间均为演出当地时间</span>
              </div>

              <span
                class="ti-body-cell"
                :class="{active:dayType == b}"
                v-for="(a,b) in this.performBases"
                :key="b"
                @click="savePrice(a,b)"
              >{{a.performs[0].performName}}</span>
            </div>
            <div class="ti-main" v-if="priceList">
              <div class="grade">票档</div>
              <span
                class="ti-body-cell"
                :class="{active:priceType == d}"
                v-for="(c,d) in priceList.performs[0].skuList"
                :key="d"
                @click="changePriceType(c,d)"
              >{{c.skuName}}</span>
            </div>
          </div>

          <div class="count-box border-1px" v-show="this.priceList && this.priceType!=null">
            <div class="shuliang">数量选择</div>
            <div class="btn-box">
              <div class="btn-wrapper">
                <span class="btn" :class="{active:countNum <= 1}" @click="delCount()">-</span>
                <span class="num">{{countNum}}</span>
                <span class="btn" :class="{active:countNum >= 6}" @click="addCount()">+</span>
              </div>
              <div class="xiangou">每笔订单限购6张</div>
            </div>
          </div>
          <div class="confirm-price">
            <div class="pri-left">
              <span class="pl">￥</span>
              <span class="pr">{{prices}}</span>
            </div>
            <div class="pri-right" @click="buyComfirm()">确定</div>
          </div>
        </div>
      </transition>
    </div>

    <!-- 滑动  全部评论 -->
    <div v-show="ac">
      <transition name="ac">
        <div class="all-comment" v-show="showAllComment && this.comments.data">
          <div class="ac-header border-1px">
            <i class="ac-icon iconfont icon-zuo" @click="hideAllDis()"></i>
            全部评论
          </div>

          <div class="comment">
            <div class="discuss-cell-box" v-for="(h,k) in this.comments.data" :key="k">
              <div class="discuss-header">
                <div class="dis-left" v-lazy:background-image="h.userDO.headerImage"></div>
                <div class="dis-right">
                  <div class="dis-name">{{h.userDO.nickname}}</div>
                  <div class="dis-time">{{h.gmtModified}}</div>
                </div>
              </div>
              <div class="dis-aslid">
                <van-rate
                  v-model="h.gradeDOList[0].value"
                  :size="12"
                  readonly
                  color="#ee0a24"
                  void-icon="star"
                  void-color="#eee"
                  class="vant-star"
                />
                <span>{{h.gradeDOList[0].valueDesc}}</span>
              </div>
              <div class="dis-content">{{h.textDOList[0].value}}</div>
              <div class="dis-footer clearfix">
                <svg class="icon ic" aria-hidden="true" v-if="true">
                  <use xlink:href="#icon-zan" />
                </svg>
                <svg class="icon ic" aria-hidden="true" v-if="false">
                  <use xlink:href="#icon-zan1" />
                </svg>
                <span>赞</span>
                <i class="ic iconfont icon-xiaoxi"></i>
                <span>回复</span>
                <i class="ic iconfont icon-fenxiang"></i>
                <span>转载</span>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- 滑动  须知事项 -->
    <div class="slide-tip" v-show="slideC">
      <transition name="tip">
        <div class="tip-box" v-show="slideD">
          <div class="slide-title border-1px">
            <div
              class="notice-bar"
              :class="{active: noticeType == 1}"
              @click="toggleNoticeType(1)"
            >服务说明</div>
            <div
              class="notice-bar"
              :class="{active: noticeType == 2}"
              @click="toggleNoticeType(2)"
            >观演须知</div>
            <i class="slide-icon iconfont icon-bacha" @click="hideAniCD()"></i>
          </div>
          <div class="tip-container">
            <div class="tip-wrapper" v-show="noticeType == 1">
              <div class="notice-cell" v-for="(s,index) in this.buyNoteList" :key="index">
                <div class="notice-ques">
                  <span class="ques-icon">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-gouxuan2" />
                    </svg>
                  </span>
                  <span>{{s.title}}</span>
                </div>
                <div class="notice-ans">{{s.content}}</div>
              </div>
            </div>

            <div class="tip-wrapper" v-show="noticeType == 2">
              <div class="notice-cell" v-for="(s,index) in this.showNoteList" :key="index">
                <div class="notice-ques">
                  <span class="ques-icon">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-gouxuan2" />
                    </svg>
                  </span>
                  <span>{{s.title}}</span>
                </div>
                <div class="notice-ans">{{s.content}}</div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- 滑动  分享 -->
    <div class="share" v-show="shareA" @click="hideShare()">
      <transition name="fade">
        <div class="share-container" v-show="shareB">
          <div class="share-wrapper border-1px">
            <div class="share-img" @click.stop="share(1)">
              <div class="simg">
                <img src="../../../public/images/share_wechat_icon.png" alt />
              </div>
              <div class="sword">微信</div>
            </div>
            <div class="share-img" @click.stop="share(2)">
              <div class="simg">
                <img src="../../../public/images/share_wechat_circle_icon.png" alt />
              </div>
              <div class="sword">朋友圈</div>
            </div>
            <div class="share-img" @click.stop="share(3)">
              <div class="simg">
                <img src="../../../public/images/share_qq_icon.png" alt />
              </div>
              <div class="sword">QQ好友</div>
            </div>
            <div class="share-img" @click.stop="share(4)">
              <div class="simg">
                <img src="../../../public/images/share_sina_icon.png" alt />
              </div>
              <div class="sword">微博</div>
            </div>
            <div class="share-img" @click.stop="share(5)">
              <div class="simg">
                <img src="../../../public/images/share_ding_circle_icon.png" alt />
              </div>
              <div class="sword">钉钉</div>
            </div>
          </div>
          <div class="share-cancel" @click="hideShare()">取消</div>
        </div>
      </transition>
    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="kefu iconfont icon-kefu" @click="showXiaomi"></div>
      <div class="like iconfont icon-xihuan" v-show="!isLike" @click="confirmLike"></div>
      <div class="like" v-show="isLike" @click="cancelLike">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xihuan1" />
        </svg>
      </div>
      <div class="buy" @click="showAniEF()">立即购买</div>
    </div>

    <Xiaomi v-if="isXiaomi" @x-back="hideXiaomi" />

  </div>
</template>

<script>
import Xiaomi from "../Message/Xiaomi";
import { Dialog } from "vant";

export default {
  props: ["item"],
  components: {
    Xiaomi
  },
  data: () => ({
    isLike: false,
    isXiaomi: false,
    type: 1,
    listData4: [],
    slideA: false, // 控制显示隐藏
    slideB: false, // 控制滑动动画
    slideC: false, // 须知
    slideD: false, // 须知动画
    slideE: false, // 购买
    slideF: false, // 购买动画
    noticeType: 1, // 切换服务说明，观演须知样式
    showAllComment: false,
    ac: false,
    priceList: null,
    dayType: null,
    priceType: null,
    countNum: 0,
    currentPrice: 0, // 票单价
    prices: 0, // 票总价
    show: false, // 购票弹出框
    shareA: false, // 分享
    shareB: false, // 控制分享动画
    
  }),
  computed: {
    staticData() {
      return this.item.detailOneType.detailViewComponentMap.item.staticData;
    },
    venue() {
      return this.item.detailOneType.detailViewComponentMap.item.staticData
        .venue;
    },
    noticeMatter() {
      return this.item.detailOneType.detailViewComponentMap.item.staticData
        .noticeMatter;
    },
    itemExtendInfo() {
      return this.item.detailOneType.detailViewComponentMap.item.staticData
        .itemExtendInfo;
    },
    notices() {
      return this.item.detailOneType.detailViewComponentMap.item.staticData
        .itemBase.serviceNotes;
    },
    buyNoteList() {
      return this.item.detailOneType.detailViewComponentMap.item.staticData
        .noticeMatter.noticeList[0].ticketNoteList;
    },
    showNoteList() {
      return this.item.detailOneType.detailViewComponentMap.item.staticData
        .noticeMatter.noticeList[1].ticketNoteList;
    },
    comments() {
      return this.item.detailOneType.comments;
    },
    performBases() {
      return this.item.detailOneType.detailViewComponentMap.item.item
        .performBases;
    }
  },
  mounted() {
    this.getListData();
    this.isLikeFnc();
  },
  methods: {
    // 验证是否已经收藏
    isLikeFnc() {
      this.$store.state.likePerformList.map(i => {
        if (i.id === this.item.id) {
          this.isLike = true;
        }
      });
    },
    confirmLike() {
      if (this.$store.state.isLogin) {
        this.isLike = true;
        this.$store.commit("likePerform", { item: this.item });
      } else {
        this.$router.push("/sign");
      }
    },
    cancelLike() {
      this.isLike = false;
      this.$store.commit("cancelLikePerform", { item: this.item });
    },
    showXiaomi() {
      this.isXiaomi = true;
    },
    hideXiaomi() {
      this.isXiaomi = false;
    },
    changeType(n) {
      this.type = n;
    },
    getListData() {
      this.axios("/damai/api/list").then(res => {
        let { data } = res.data;
        this.listData4 = data.lists.list4;
      });
    },
    adChange(list3) {
      if (list3.detailType == 1) {
        return list3.detailOneType.detailViewComponentMap.item.staticData.venue
          .venueAddr;
      } else {
        return list3.venueName;
      }
    },
    showAniAB() {
      this.slideA = true;
      this.slideB = true;
    },
    hideAniAB() {
      this.slideB = false;
      setTimeout(() => {
        this.slideA = false;
      }, 300);
    },
    showAniCD(t) {
      this.slideC = true;
      this.slideD = true;
      this.noticeType = t;
    },
    hideAniCD() {
      this.slideD = false;
      setTimeout(() => {
        this.slideC = false;
      }, 300);
    },
    showAniEF() {
      if (this.$store.state.isLogin) {
        this.slideE = true;
        this.slideF = true;
      } else {
        this.$router.push("/sign");
      }
    },
    hideAniEF() {
      this.slideF = false;
      this.dayType = null;
      this.priceList = 0;
      this.prices = 0;
      this.countNum = 0;
      setTimeout(() => {
        this.slideE = false;
      }, 300);
    },
    hideDetail() {
      this.$emit("m-hide-detail");
    },
    toggleNoticeType(t) {
      this.noticeType = t;
    },
    showAllDis() {
      this.ac = true;
      this.showAllComment = true;
    },
    hideAllDis() {
      this.showAllComment = false;
      setTimeout(() => {
        this.ac = false;
      }, 300);
    },
    savePrice(a, b) {
      this.priceList = a;
      this.dayType = b;
      this.priceType = null;
      this.prices = 0;
      this.countNum = 0;
    },
    changePriceType(c, n) {
      this.priceType = n;
      this.currentPrice = c.price;
      this.prices = c.price;
      this.countNum = 1;
      if (this.countNum == 0) {
        this.countNum++;
      }
    },
    delCount() {
      if (this.countNum > 1) {
        this.countNum--;
        this.prices = this.currentPrice * this.countNum;
      }
    },
    addCount() {
      if (this.countNum < 6) {
        this.countNum++;
        this.prices = this.currentPrice * this.countNum;
      }
    },
    buyComfirm() {
      this.show = true;

      if (this.prices) {
        Dialog.confirm({
          title: "购买确认",
          message: `当前总价为：￥${this.prices} ,是否确认购买？`,
          beforeClose(action, done) {
            if (action === "confirm") {
              setTimeout(done, 1000);
            } else {
              done();
            }
          }
        })
          .then(() => {
            setTimeout(() => {
              this.hideAniEF();
            }, 500);
            Dialog.alert({
              title: "购票成功",
              message: `共花费 ￥${this.prices} ,可在票夹中查看已购门票~`
            });
          })
          .catch(() => {
            // console.log("取消按钮");
          });
      } else if (!this.prices) {
        Dialog.alert({
          title: "抱歉",
          message: "商品列表不能为空。请选择您需要购买的商品~"
        }).then(() => {});
      } else {
        Dialog.alert({
          title: "抱歉",
          message: "遇到了未知错误"
        }).then(() => {});
      }
    },
    showShare() {
      this.shareA = true;
      this.shareB = true;
    },
    hideShare() {
      setTimeout(() => {
        this.shareA = false;
      }, 300);
      this.shareB = false;
    },
    share(n) {
      let t = 0;
      switch (n) {
        case 1:
          t = "已分享至微信";
          break;
        case 2:
          t = "已分享至朋友圈";
          break;
        case 3:
          t = "已分享至QQ好友";
          break;
        case 4:
          t = "已分享至微博";
          break;
        case 5:
          t = "已分享至钉钉";
          break;
        default:
          t = "未知错误";
      }
      Dialog.alert({
        title: "恭喜",
        message: t
      }).then(() => {
        // on close
      });
      this.hideShare();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../public/scss/index.scss";
@import "../../../public/scss/mixin.scss";

.show-detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  overflow-y: auto;
  background-color: #f0f0f0;

  &::-webkit-scrollbar {
    display: none;
  }
}

.header-box {
  position: relative;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background-image: url("../../../public/images/caomei.png");
    background-position: 50% 80%;
    background-size: 300%;
    background-color: rgb(141, 56, 56);
    z-index: -1;
    //   backdrop-filter: blur(10px);
    filter: blur(40px);
  }
}

.navbar {
  width: 100%;
  height: 1rem;

  i {
    width: 1rem;
    height: 1rem;
    font-size: 0.38rem;
    line-height: 1rem;
    text-align: center;
    color: #fff;
  }

  .nav-left {
    float: left;
  }

  .nav-right {
    float: right;
  }
}

.show-cell {
  padding: 0.3rem;
  display: flex;

  .cell-left {
    flex: 0 0 2rem;
    width: 2rem;
    height: 2.7rem;
    border-radius: 4px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .cell-right {
    flex: 1;
    padding-left: 0.4rem;
    // background-color: #ddd;
    position: relative;
    color: #fff;

    .cell-title {
      font-size: 0.34rem;
      line-height: 0.46rem;
    }

    .cell-price {
      position: absolute;
      left: 0.3rem;
      bottom: 0;
      font-size: 0.32rem;
    }
  }
}

.below-box {
  border-radius: 8px 8px 0 0;
  padding-bottom: 1rem;
  overflow: hidden;
  background-color: #fff;

  .service {
    height: 0.8rem;
    line-height: 0.8rem;
    padding: 0 0.3rem;
    font-size: 0.28rem;
    background-color: #f0f0f0;
    position: relative;

    .ser-title {
      color: rgb(255, 29, 112);
      padding-right: 0.2rem;
    }

    .ser-icon {
      position: absolute;
      right: 0.3rem;
      top: 0;
      display: inline-block;
      width: 0.5rem;
      height: 0.8rem;
      font-size: 0.28rem;
      line-height: 0.8rem;
      text-align: right;
    }
  }

  .show-time {
    padding: 0.4rem 0;
    margin: 0 0.3rem;
    font-size: 0.32rem;
    // height: 1.4rem;
    // line-height: 0.7rem;
    // background-color: #ddd;
    @include scale-border-bottom(rgba(7, 17, 27, 0.1));

    .time {
      padding-bottom: 0.26rem;

      span {
        font-size: 0.26rem;
        position: relative;
        top: -0.02rem;
      }
    }
    .tip {
      font-size: 0.24rem;
      color: #777;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .location-box {
    padding: 0.4rem 0;
    margin: 0 0.3rem;
    font-size: 0.32rem;

    .location {
      padding-bottom: 0.26rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .address {
      font-size: 0.24rem;
      color: #777;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .white-space {
    width: 100%;
    height: 0.2rem;
    background-color: #f0f0f0;
  }

  .tabbar {
    padding: 0 0.3rem;
    height: 1rem;
    background-color: #fff;
    display: flex;
    box-shadow: 0 20px 10px -20px #ddd;
    // @include scale-border-bottom(rgba(7, 17, 27, 0.1));

    .tab {
      flex: 1;
      font-size: 0.3rem;
      line-height: 1rem;
      text-align: center;
      color: #777;
      position: relative;
      z-index: 2;
    }
    .active {
      color: #000;

      &::after {
        display: inline-block;
        content: "";
        position: absolute;
        bottom: 0.2rem;
        left: 50%;
        transform: translateX(-50%);
        width: 0.8rem;
        height: 0.1rem;
        z-index: -1;
        background-color: rgb(255, 29, 112);
      }
    }
  }
}

.footer {
  height: 1rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: #fff;

  .kefu {
    flex: 0 0 1rem;
    width: 1rem;
    height: 0.4rem;
    font-size: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    margin: 0.3rem 0;
    border-right: 1px solid rgba(7, 17, 27, 0.1);
  }

  .like {
    flex: 0 0 1rem;
    width: 1rem;
    height: 1rem;
    font-size: 0.44rem;
    text-align: center;
    line-height: 1rem;
    animation: wid 0.3s linear;

    @keyframes wid {
      0% {
        transform: scale(0);
      }

      100% {
        transform: scale(100%);
      }
    }
  }

  .buy {
    flex: 1;
    margin: 0.1rem 0.2rem 0.1rem 0;
    font-size: 0.34rem;
    line-height: 0.8rem;
    text-align: center;
    border-radius: 0.4rem 0.4rem 0.4rem 0;
    color: #fff;
    background-color: $m-color;
  }
}

// 滑动购票
.ti {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 10rem;
  padding: 0 0.3rem;
  border-radius: 8px 8px 0 0;
  background-color: #fff;

  &::-webkit-scrollbar {
    display: none;
  }
  // position: relative;

  .ti-header {
    // position: fixed;
    height: 1.2rem;
    // top: 0;
    // left: 0;
    // right: 0;
    font-size: 0.44rem;
    line-height: 1.2rem;
    text-align: center;
    // padding: 0 .3rem;
    background: #fff;
    @include scale-border-bottom(rgba(7, 17, 27, 0.1));

    .ti-icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 0.8rem;
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;
    }
  }

  .ti-wrapper {
    height: 6.4rem;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .ti-body {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .ti-body-cell {
      display: inline-block;
      padding: 0.34rem 0.26rem;
      margin: 0 0.2rem 0.2rem 0;
      border-radius: 4px;
      background-color: #f0f0f0;
      font-size: 0.26rem;
      text-align: center;

      &.active {
        color: #ff4d8e;
        background-color: #ffdbe3;
      }
    }
  }

  .ti-main {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .ti-chang {
      font-size: 0.38rem;
      padding-right: 0.2rem;
    }

    .ti-tip {
      font-size: 0.26rem;
      color: #777;
    }
    .grade {
      font-size: 0.38rem;
      width: 100%;
      height: 1rem;
      line-height: 1rem;
    }

    .ti-body-cell {
      display: inline-block;
      padding: 0.34rem 0.26rem;
      margin: 0 0.2rem 0.2rem 0;
      border-radius: 4px;
      background-color: #f0f0f0;
      font-size: 0.26rem;
      text-align: center;

      &.active {
        color: #ff4d8e;
        background-color: #ffdbe3;
      }
    }
  }
}
.count-box {
  position: fixed;
  left: 0;
  right: 0;
  padding: 0.3rem 0;
  margin: 0 0.3rem;
  bottom: 1.2rem;
  height: 1.2rem;
  font-size: 0.34rem;
  display: flex;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  //  @include scale-border-bottom(rgba(7, 17, 27, 0.4));

  .shuliang {
    flex: 1;
  }

  .btn-box {
    flex: 0 0 2rem;

    .btn-wrapper {
      font-size: 0.36rem;
      padding-left: 0.1rem;
      margin-bottom: 0.14rem;

      .btn {
        display: inline-block;
        width: 0.42rem;
        height: 0.42rem;
        font-size: 0.44rem;
        line-height: 0.42rem;
        text-align: center;
        border-radius: 3px;
        color: #333;
        background: #f0f0f0;

        &.active {
          color: rgb(168, 168, 168);
        }
      }

      .num {
        display: inline-block;
        font-size: 0.34rem;
        padding: 0 0.3rem;
        line-height: 0.2rem;
        position: relative;
        top: -0.07rem;
      }
    }

    .xiangou {
      font-size: 0.24rem;
      color: #333;
    }
  }
}

.confirm-price {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1.2rem;
  padding-left: 0.26rem;
  line-height: 1.2rem;
  // background-color: #ddd;
  display: flex;
  color: #ff4d8e;

  .pri-left {
    flex: 1;
    font-size: 0.3rem;

    .pr {
      font-size: 0.42rem;
      font-weight: bold;
    }
  }

  .pri-right {
    flex: 0 0 3.4rem;
    width: 3.4rem;
    height: 0.9rem;
    margin: 0.15rem 0.2rem;
    font-size: 0.34rem;
    text-align: center;
    line-height: 0.9rem;
    color: #fff;
    border-radius: 0.5rem 0.5rem 0.5rem 0;
    background-color: #ff4d8e;
  }
}

// 详情
.detail {
  padding: 0.3rem;

  .det-title {
    padding: 0.3rem 0;
    font-size: 0.4rem;
  }

  .det-container {
    font-size: 0.3rem;
    line-height: 0.48rem;
    overflow: hidden;
  }
}

// 评价
.discuss {
  padding: 0.3rem;
}
.discuss-title {
  font-size: 0.4rem;
  padding: 0.3rem 0;
}

.discuss-cell-box {
  padding: 0.3rem 0;
  position: relative;
}

.dis-bgicon {
  position: absolute;
  right: 0;
  top: 0.4rem;
  width: 1.4rem;
  height: 1.4rem;

  img {
    width: 100%;
    height: 100%;
  }
}

.discuss-header {
  display: flex;

  .dis-left {
    flex: 0 0 1.3rem;
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
    margin-right: 0.3rem;
    background-color: #ddd;
    background-image: url("../../../public/images/yonghu.png");
    background-position: center center;
    background-size: cover;
  }

  .dis-right {
    flex: 1;

    .dis-name {
      padding: 0.2rem 0;
      font-size: 0.3rem;
    }

    .dis-time {
      font-size: 0.26rem;
      color: #777;
    }
  }
}

.dis-aslid {
  margin: 0.1rem 0;
  height: 0.5rem;
  line-height: 0;
  // height: .3rem;

  span {
    font-size: 0.3rem;
    padding-left: 0.3rem;
  }
}

.dis-content {
  font-size: 0.28rem;
  line-height: 0.5rem;
  color: #444;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dis-footer {
  margin-top: 0.24rem;

  span {
    float: right;
    font-size: 0.24rem;
    padding-right: 0.1rem;
    line-height: 0.18rem;
  }

  .ic {
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

.dis-all {
  font-size: 0.29rem;
  text-align: center;
  color: $m-color;
  padding: 0.3rem 0;
}

// 须知
.notice {
  padding: 0.3rem;

  .notice-title {
    font-size: 0.4rem;
    padding: 0.3rem 0;
  }

  .notice-buy {
    font-size: 0.32rem;
    padding: 0.2rem 0;
  }

  .notice-all {
    font-size: 0.29rem;
    text-align: center;
    color: $m-color;
    padding: 0.3rem 0;
  }
}

.notice-cell {
  .notice-ques {
    font-size: 0.28rem;
    padding: 0.2rem 0;

    .ques-icon {
      display: inline-block;
      font-size: 0.38rem;
      padding-right: 0.08rem;
      position: relative;
      top: 0.03rem;
      // vertical-align: bottom;
    }

    .ques-icon2 {
      display: inline-block;
      font-size: 0.3rem;
      padding: 0 0.14rem 0 0.03rem;
      vertical-align: bottom;
    }
  }
  .notice-ans {
    font-size: 0.28rem;
    padding: 0 0.2rem 0.4rem 0.46rem;
    line-height: 0.38rem;
    color: #777;
  }
}

// 推荐
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
  }
}

// 滑动说明部分
.slide-tip {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;

  .tip-box {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 10rem;
    overflow: auto;
    border-radius: 8px 8px 0 0;
    background-color: #fff;

    .ti-wrapper {
      padding-bottom: 2.6rem;
    }

    .slide-title {
      padding: 0.3rem 2rem;
      height: 1.4rem;
      display: flex;
      @include scale-border-bottom(rgba(7, 17, 27, 0.1));

      .notice-bar {
        flex: 1;
        font-size: 0.34rem;
        text-align: center;
        line-height: 0.8rem;
        color: #999;

        &.active {
          color: #000;
        }
      }

      .slide-icon {
        position: absolute;
        top: 0;
        right: 0;
        width: 1rem;
        height: 1.4rem;
        font-size: 0.24rem;
        line-height: 1.4rem;
        text-align: center;
      }
    }
  }

  .tip-container {
    height: 8.6rem;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .tip-wrapper {
    padding: 0.3rem;
  }
}

// 全部评论
.all-comment {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 99;

  .ac-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 1rem;
    font-size: 0.42rem;
    text-align: center;
    line-height: 1rem;
    @include scale-border-bottom(rgba(7, 17, 27, 0.1));
    // background: #ddd;

    .ac-icon {
      position: absolute;
      left: 0;
      top: 0;
      width: 1rem;
      height: 1rem;
    }
  }

  .comment {
    padding: 0.3rem 0.6rem;
    position: fixed;
    top: 1rem;
    left: 0;
    right: 0;
    bottom: 0;
    // height: 100%;
    overflow-y: auto;
    // background-color: #ddd;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

// 分享
.share {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;

  .share-container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4rem;
    background-color: #fff;

    .share-wrapper {
      display: flex;
      padding-bottom: 0.5rem;
      @include scale-border-bottom(rgba(7, 17, 27, 0.2));
    }

    .share-img {
      flex: 1;
      padding-top: 0.4rem;

      .simg {
        padding: 0.23rem;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .sword {
        font-size: 0.26rem;
        text-align: center;
        color: #777;
      }
    }
  }

  .share-cancel {
    // margin-top: .4rem;
    font-size: 0.33rem;
    line-height: 1.2rem;
    text-align: center;
    // border-top: 1px solid rgba(7,17,27,.1);
  }
}

// 滑动动画
.tip-enter,
.tip-leave-to {
  transform: translateY(10rem);
}

.tip-enter-active,
.tip-leave-active {
  transition: all 0.3s linear;
}

.tip-enter-to,
.tip-leave {
  transform: translateY(0);
}

// 左滑动画
.ac-enter,
.ac-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.ac-enter-active,
.ac-leave-active {
  transition: all 0.3s linear;
}

.ac-enter-to,
.ac-leave {
  transform: translateX(0);
  opacity: 1;
}

// 分享  淡入淡出
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s linear;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
  transform: translateY(0);
}
</style>
