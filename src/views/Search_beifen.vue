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
    <div class="history">
      <div class="title-box">
        <span class="title">搜索历史</span>
        <span class="laji iconfont icon-lajitong" v-show="names.length" @click="emptyName"></span>
      </div>
      <div class="history-content">
        <span v-for="(name,index) in names" :key="index">{{name}}</span>
      </div>
    </div>
    <!-- 清空弹窗 -->
    <div class="empty-box" v-show="isEmpty">
      <div class="empty">
        <div class="empty-title">是否确认清空搜索历史？</div>
        <div class="btn-box">
          <van-button class="btn1" type="default" @click="cancelEmpty">取消</van-button>
          <van-button class="btn2" type="default" @click="comfirmEmpty">确认</van-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    value: "",
    isEmpty: false,
  }),
  computed: {
    ...mapState({
      list: "listDataAll",
      names: "searchHistory"
    })
  },
  mounted() {
    this.$store.dispatch("getListData", { axios: this.axios });
    console.log("search==>", this.list);
  },
  methods: {
    onInput() {
      //   console.log("监听搜索触发了");
    },
    onBlur() {
      //   console.log("监听到失去焦点了");
      let v = this.value.trim();
      if (v) {
        // this.names.push(this.value);  // 两种写法都可以
        this.$store.commit("addSearchHistory", { value: this.value });
        this.value = "";
      } else {
        this.value = "";
      }
    },
    onCancel() {
      this.$router.back();
    },
    emptyName() {
      this.isEmpty = true;
    },
    comfirmEmpty() {
      this.$store.commit("emptySearchHistory")
      this.isEmpty = false;
    },
    cancelEmpty() {
      this.isEmpty = false;
    }
  }
};
</script>

<style scoped lang="scss">
.search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 10;
}

.history {
  padding: 0.3rem 0.26rem;
  font-size: 0.36rem;
  .title-box {
    width: 100%;
    height: 1rem;
    line-height: 1rem;

    .title {
      float: left;
    }

    .laji {
      float: right;
      width: 0.5rem;
      display: inline-block;
      font-size: 0.38rem;
      text-align: right;
    }
  }
  .history-content {
    width: 100%;

    span {
      display: inline-block;
      padding: 0.18rem 0.3rem;
      margin: 0 0.3rem 0.3rem 0;
      font-size: 0.3rem;
      border-radius: 6px;
      background-color: #f7f8fa;
    }
  }
}

.empty-box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);

  .empty {
    position: absolute;
    top: 34%;
    left: 50%;
    transform: translate(-50%);
    width: 4.6rem;
    height: 2.2rem;
    // background: rgba(0, 0, 0, 0.5);
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
  }

  .empty-title {
    font-size: 0.32rem;
    text-align: center;
    padding: 0.5rem 0.3rem 0.5rem 0.3rem;
  }

  .btn-box {
    position: absolute;
    left: 0;
    bottom: 0;

    .btn1 {
      width: 2.3rem;
      height: 0.9rem;
      color: rgb(245, 128, 128);
    }
    .btn2 {
      width: 2.3rem;
      height: 0.9rem;
      color: rgb(35, 155, 196);
    }
  }
}
</style>
