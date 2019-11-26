<template>
  <div class="recommend">
    <div class="title">为你推荐</div>
    <div class="waterfall">
      <div class="left-box">
        <div class="cell" v-for="(a,n) in rec1" :key="n" @click="save(a)">
          <div class="cell-img">
            <img v-lazy="a.verticalPic" alt />
            <span class="type">{{a.categoryName}}</span>
          </div>
          <div class="text-box">
            <div class="name">{{a.name}}</div>
            <div class="time">{{a.showTime}}</div>
            <div class="price">
              <span class="p1">￥</span>
              <span class="p2">{{a.priceLow}}</span>
              <span class="p3">起</span>
            </div>
            <div class="tag" v-if="a.rankingList">{{a.rankingList.title}}</div>
          </div>
        </div>
      </div>

      <div class="right-box">
        <div class="cell" v-for="(b,m) in rec2" :key="m" @click="save(b)">
          <div class="cell-img">
            <img v-lazy="b.verticalPic" alt />
            <span class="type">{{b.categoryName}}</span>
          </div>
          <div class="text-box">
            <div class="name">{{b.name}}</div>
            <div class="time">{{b.showTime}}</div>
            <div class="price">
              <span class="p1">￥</span>
              <span class="p2">{{b.priceLow}}</span>
              <span class="p3">起</span>
            </div>
            <div class="tag" v-if="b.rankingList">{{b.rankingList.title}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommends: []
    };
  },
  computed:{
      rec1(){
          return this.recommends.slice(0,6)
      },
      rec2(){
          return this.recommends.slice(6,12)
      }
  },
  methods: {
    async getData() {
      let res = await this.axios("damai/api/recommend");
      let { data } = res.data;
      this.recommends = data.Recommends;
      // console.log("recommends", this.recommends);
    },
    save(item){
        this.$emit("r-save",item)
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped lang="scss">
.recommend {
  padding: 0.2rem;

  .title {
    font-size: 0.4rem;
    padding: .2rem 0;
  }
}

.waterfall {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .left-box {
    flex: 0 0 3.5rem;
    width: 3.5rem;
  }

  .right-box {
    flex: 0 0 3.5rem;
    width: 3.5rem;
  }

  .cell {
    margin-top: 0.26rem;
    background-color: #f0f0f0;
    border-radius: 8px;
    overflow: hidden;

    .cell-img {
      position: relative;

      img {
        width: 100%;
      }

      .type {
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        padding: 0.08rem 0.15rem;
        font-size: 0.2rem;
        border-radius: 4px;
        color: #fff;
        background: rgba(0, 0, 0, 0.8);
      }
    }

    .text-box {
      font-size: 0.28rem;
      padding: 0.1rem 0.2rem 0.2rem;
      line-height: 0.4rem;

      .name {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .time {
        font-size: 0.24rem;
        color: #555;
        padding-top: 0.05rem;
      }

      .price {
        color: #ff4d8e;
        padding: 0.05rem 0;
        .p1 {
          font-size: 0.2rem;
        }

        .p2 {
          font-size: 0.3rem;
        }

        .p3 {
          padding-left: 0.1rem;
          font-size: 0.2rem;
          color: #555;
        }
      }

      .tag {
        display: inline-block;
        padding: 0 0.18rem;
        border-radius: 0.3rem;
        font-size: 0.2rem;
        color: red;
        border: 1px solid red;
      }
    }
  }
}
</style>
