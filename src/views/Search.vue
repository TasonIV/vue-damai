<template>
  <div class="search">
    <div class="header">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词 (限15字以内)"
        show-action
        left-icon="icon iconfont icon-sousuo"
        shape="round"
        maxlength="15"
        @input="onInput"
        @cancel="onCancel"
        @blur="onBlur"
      >
        <!-- <div slot="action" @click="onSearch">搜索</div> -->
      </van-search>
    </div>
    <div class="result">共搜索到 {{filterList.length}} 条数据...</div>

    <!-- 查询盒子 -->
    <div class="list-box">
      <div class="list-wrapper">
        <div
          class="cell border-1px"
          v-for="(item,index) in filterList"
          :key="index"
          @click="show(item)"
        >
          <div class="left">
            <img :src="item.verticalPic" alt />
          </div>
          <div class="right">
            <div class="title">{{item.name}}</div>
            <div class="time">{{item.showTime}}</div>
            <div class="address">{{item.venueCity}}|{{item.venueName}}</div>
            <div class="prc clearfix">
              <span class="p1">￥</span>
              <span class="p2">{{item.priceLow}}</span>
              <span class="p3">起</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 详情页 -->
    <transition name="ani">
      <ShowDetail v-if="item" :item="item" @m-hide-detail="hideDetail" />
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ShowDetail from "../components/ShowDetail/ShowDetail";

export default {
  components: {
    ShowDetail
  },
  data: () => ({
    value: "",
    isEmpty: false,
    item: null
  }),
  computed: {
    ...mapState({
      list: "listDataAll",
      names: "searchHistory"
    }),
    filterList() {
      // if (!this.value) {
      //   return [];
      // }
      return this.list.filter(f => {
        let reg = new RegExp(this.value, "gim");
        console.log("reg===>", reg.test(f.cityName));
        return reg.test(f.cityName);
      });
    }
  },
  mounted() {
    this.$store.dispatch("getListData", { axios: this.axios });
  },
  methods: {
    onInput() {
      //   console.log("监听搜索触发了");
      console.log("过滤后的数组==>", this.filterList);
      console.log("关键词==>", this.value);
    },
    onBlur() {},
    onCancel() {
      this.$router.back();
    },
    hideDetail() {
      this.item = null;
    },
    show(i) {
      this.item = i;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../public/scss/index.scss";
@import "../../public/scss/mixin.scss";

.search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 10;
}

.header {
  height: 1.1rem;
  overflow: hidden;
}

.result {
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.24rem;
  text-align: center;
  color: #999;
}

.list-box {
  position: fixed;
  top: 1.6rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.cell {
  display: flex;
  padding: 0.3rem 0;
  margin: 0 0.5rem;
  @include scale-border-bottom(rgba(7, 17, 27, 0.1));

  .left {
    flex: 0 0 1.6rem;
    width: 1.6rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .right {
    flex: 1;
    padding-left: 0.3rem;
    position: relative;

    .title {
      font-size: 0.32rem;
      line-height: 0.4rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .time {
      font-size: 0.24rem;
      color: #999;
      padding: 0.22rem 0 0.14rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .address {
      font-size: 0.24rem;
      color: #999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .prc {
      position: absolute;
      bottom: 0;
      left: 0.3rem;
      // height: .5rem;

      span {
        float: left;
        display: inline-block;
      }

      .p1 {
        font-size: 0.2rem;
        color: #ff4d8e;
        line-height: 0.38rem;
      }

      .p2 {
        padding-right: 0.1rem;
        font-size: 0.34rem;
        color: #ff4d8e;
      }

      .p3 {
        font-size: 0.2rem;
        color: #000;
        line-height: 0.38rem;
      }
    }
  }
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
