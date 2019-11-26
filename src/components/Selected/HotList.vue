<template>
  <div class="hotlist">
    <div class="header">
      <span :class="{active:act==1}" @click="changeActive(1)">精选榜</span>
      <span :class="{active:act==2}" @click="changeActive(2)">人气榜</span>
      <span :class="{active:act==3}" @click="changeActive(3)">上新榜</span>
    </div>

    <div class="delicate-rank" v-if="act == 1">
      <div class="rank-box" ref="list1">
        <div class="rank-list">
          <div class="rank" @click="saveItem(list3)" v-for="(list3,index) in listData3" :key="index">
            <div class="list-img">
              <img class="pic" v-lazy="list3.verticalPic" />
              <div class="type">{{list3.categoryName}}</div>
              <div class="num-img">
                <img
                  class="count-img"
                  :src="`${publicPath}images/homepage_rank_icon_${index}.webp`"
                  alt
                />
              </div>
            </div>
            <div class="name">{{list3.name}}</div>
            <div class="price">
              <span class="price-num">￥{{list3.priceLow}}</span>
              <span class="price-word">起</span>
            </div>
          </div>
        </div>
      </div>

      <div class="normal-list" ref="list2">
        <div class="rank-list">
          <div class="rank" @click="saveItem(list4)" v-for="(list4,index) in listData4" :key="index">
            <div class="list-img">
              <img class="pic" v-lazy="list4.verticalPic" />
              <div class="type">{{list4.categoryName}}</div>
            </div>
            <div class="name">{{list4.name}}</div>
            <div class="price">
              <span class="price-num">￥{{list4.priceLow}}</span>
              <span class="price-word">起</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="popularity-rank" v-else-if="act == 2">
      <div class="rank-box" ref="list1">
        <div class="rank-list">
          <div class="rank" @click="saveItem(list1)" v-for="(list1,index) in listData1" :key="index">
            <div class="list-img">
              <img class="pic" v-lazy="list1.verticalPic" />
              <div class="type">{{list1.categoryName}}</div>
              <div class="num-img">
                <img
                  class="count-img"
                  :src="`${publicPath}images/homepage_rank_icon_${index}.webp`"
                  alt
                />
              </div>
            </div>
            <div class="name">{{list1.name}}</div>
            <div class="price">
              <span class="price-num">￥{{list1.priceLow}}</span>
              <span class="price-word">起</span>
            </div>
          </div>
        </div>
      </div>

      <div class="normal-list" ref="list2">
        <div class="rank-list">
          <div class="rank" @click="saveItem(list2)" v-for="(list2,index) in listData2" :key="index">
            <div class="list-img">
              <img class="pic" v-lazy="list2.verticalPic" />
              <div class="type">{{list2.categoryName}}</div>
            </div>
            <div class="name">{{list2.name}}</div>
            <div class="price">
              <span class="price-num">￥{{list2.priceLow}}</span>
              <span class="price-word">起</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="new-rank" v-else>
      <div class="rank-box" ref="list1">
        <div class="rank-list">
          <div class="rank" @click="saveItem(list5)" v-for="(list5,index) in listData5" :key="index">
            <div class="list-img">
              <img class="pic" v-lazy="list5.verticalPic" />
              <div class="type">{{list5.categoryName}}</div>
              <div class="num-img">
                <img
                  class="count-img"
                  :src="`${publicPath}images/homepage_rank_icon_${index}.webp`"
                  alt
                />
              </div>
            </div>
            <div class="name">{{list5.name}}</div>
            <div class="price">
              <span class="price-num">￥{{list5.priceLow}}</span>
              <span class="price-word">起</span>
            </div>
          </div>
        </div>
      </div>

      <div class="normal-list" ref="list2">
        <div class="rank-list">
          <div class="rank" @click="saveItem(list1)" v-for="(list1,index) in listData1" :key="index">
            <div class="list-img">
              <img class="pic" v-lazy="list1.verticalPic" />
              <div class="type">{{list1.categoryName}}</div>
            </div>
            <div class="name">{{list1.name}}</div>
            <div class="price">
              <span class="price-num">￥{{list1.priceLow}}</span>
              <span class="price-word">起</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      act: 1,
      listData1: [],
      listData2: [],
      listData3: [],
      listData4: [],
      listData5: []
    };
  },
  computed: {},
  methods: {
    _initListScroll() {
      this.$nextTick(() => {
        if (this.listData1 && this.listData2) {
          if (!this.listScrol1 && !this.listScrol2) {
            this.listScroll = new BScroll(this.$refs.list1, {
              scrollX: true,
              click:true,
              eventPassthrough: 'vertical',  // 保留纵向原生滚动
            });
            this.listScrol2 = new BScroll(this.$refs.list2, {
              scrollX: true,
              click:true,
              eventPassthrough: 'vertical',  // 保留纵向原生滚动
            });
          } else {
            this.listScroll.refresh();
            this.listScrol2.refresh();
          }
        }
      });
    },
    getListData() {
      this.axios("/damai/api/list").then(res => {
        let { data } = res.data;
        this.listData1 = data.lists.list1;
        this.listData2 = data.lists.list2;
        this.listData3 = data.lists.list3;
        this.listData4 = data.lists.list4;
        this.listData5 = data.lists.list5;
        // console.log(this.listData1);
      });
    },
    changeActive(num) {
      this.act = num;
    },
    saveItem(item){
      this.$emit("m-save",item)
    }
  },
  watch: {
    listData1() {
      this._initListScroll();
    }
  },
  mounted() {
    this.getListData();
    this._initListScroll();
  }
};
</script>

<style scoped lang="scss">
.hotlist {
  width: 100%;
  // height: 18rem;
  overflow: hidden;
  font-size: 0.34rem;
  padding-left: 0.2rem;
  // background-color: #f0f0f0;
}

.header {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  // background-color: #e94;

  span {
    display: inline-block;
    margin-right: 0.32rem;
    color: #333;
    position: relative;
    z-index: 2;
    // border-bottom: 2px solid #FF4D8E;

    &.active {
      font-size: 0.4rem;
      color: #000;

      &::after {
        content: "";
        position: absolute;
        bottom: 0.16rem;
        left: 0;
        width: 100%;
        height: 0.22rem;
        z-index: -1;
        background-color: #ff4d8e;
        animation: wid .3s linear;

        @keyframes wid {
          0%{
            transform: scaleX(0);
          }

          100%{
            transform: scaleX(100%);
          }
        }
      }
    }
  }
}

.rank-box,
.normal-list {
  width: 100%;
  // height: 4.7rem;
  overflow: hidden;
  padding: 0.1rem 0 0.34rem 0;
  // background-color: #e49;
}

.rank-list {
  width: 23rem;
  overflow: hidden;
  //   height: 3.8rem;

  .rank {
    float: left;
    width: 2.1rem;
    margin-right: 0.2rem;

    .list-img {
      width: 2.1rem;
      position: relative;

      // height: 2.6rem;
      .pic {
        width: 100%;
        height: 3rem;
      }
    }

    .name {
      width: 2.1rem;
      height: 0.9rem;
      padding: 0.1rem 0;
      font-size: 0.28rem;
      line-height: 0.4rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .price {
      width: 2.1rem;

      .price-num {
        font-weight: bold;
        font-size: .29rem;
        color: #ff4d8e;
      }

      .price-word {
        padding-left: 0.1rem;
        font-size: 0.24rem;
        color: #333;
      }
    }

    .type {
      position: absolute;
      top: 0.08rem;
      right: 0.08rem;
      padding: 0.06rem;
      font-size: 0.18rem;
      border-radius: 3px;
      color: #fff;
      background-color: #333;
    }

    .num-img {
      display: inline-block;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0.75rem;

      .count-img {
        width: 100%;
      }
    }
  }
}
</style>
