<template>
  <div class="add">
    <div class="header border-1px">
      <span class="icon-box iconfont icon-zuo" @click="$router.go(-1)"></span>
      <span class="title">填写观影人信息</span>
      <span class="save" @click="saveData">保存</span>
    </div>
    <div class="content">
      <div class="list border-1px">
        <span class="name">姓名</span>
        <input type="text" class="inp" placeholder="请输入姓名" v-model.trim="name" />
        <i class="icon-1 iconfont icon-cha" v-if="this.name" @click="delName"></i>
      </div>

      <div class="list border-1px">
        <span class="name">证件类型</span>
        <div class="inp">{{numType}}</div>
        <!-- <input type="text" class="inp" placeholder="请填写收货人手机号" v-model.trim="telephone" /> -->
        <i class="icon-1 iconfont icon-cha" v-if="this.telephone" @click="delTel"></i>
        <span class="icon-3" @click="showTel()">
          <i class="iconfont icon-you"></i>
        </span>

        <keep-alive>
          <CardType v-show="telSelect" :isCheck="telSelect" @hide="hideTel" @tel-type="telType" />
        </keep-alive>
      </div>

      <div class="list border-1px">
        <span class="name">证件号码</span>
        <input type="text" class="inp" placeholder="请输入证件号码" v-model.trim="num" />
        <i class="icon-1 iconfont icon-cha" v-if="this.num" @click="delNum"></i>
      </div>
    </div>
    <Warning v-show="warningShow" :warningMsg="warningMsg" />
    <Myloading v-show="isLoading" />
  </div>
</template>

<script>
import CardType from "../../components/Address/CardType";
import Warning from "../../components/Warning";
import Myloading from "../../components/Myloading";

export default {
  data: () => ({
    telSelect: false, // 是否显示证件类型页面
    numType: "身份证", // 证件类型

    name: null,
    num: null, // 证件号码
    telephone: null,
    address: null, // 总地址

    warningMsg: null, // 警告信息
    warningShow: false, // 是否显示警告页面
    isLoading: false
  }),
  components: {
    CardType,
    Warning,
    Myloading
  },
  methods: {
    hideTel() {
      this.telSelect = false;
    },
    showTel() {
      this.telSelect = true;
    },
    telType(type) {
      this.numType = type;
      this.telSelect = false;
    },
    showLocation() {
      this.locationShow = true;
    },
    showCitySelect() {
      this.citySelect = true;
    },
    hideCitySelect(msg) {
      this.citySelect = false;
      this.region = msg;
      // console.log("citySelect", this.citySelect);
      // console.log("add页面的region", this.region);
    },
    delName() {
      this.name = null;
    },
    delTel() {
      this.telephone = null;
    },
    delNum() {
      this.num = null;
    },
    delAddress() {
      this.addressDetail = null;
    },
    // 保存信息
    saveData() {
      this.checkMsg(); // 验证
      if (this.warningMsg) {
        this.warningShow = true;
        setTimeout(() => {
          this.warningShow = false;
        }, 800);
      } else {
        setTimeout(() => {
          this.$router.replace({ name: "man" });
          this.isLoading = false;
        }, 1500);
        this.isLoading = true;
        // 数据提交到vx
        let detail = {
          name: this.name,
          numType: this.numType,
          num: this.num,
          id: new Date().getTime()
        };
        this.$store.commit("addPeople", detail);
      }
    },

    // 输入验证
    checkMsg() {
      let msgs = "";
      // 第一步：验证是否有空行内容
      // 第二步：验证所填信息是否合法
      let cName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,15}$/.test(this.name); // 姓名验证
      let cNum = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.num); // 证件号码验证

      // 循环验证
      for (let i = 0; i < 4; i++) {
        if (i == 0) {
          if (!this.name) {
            msgs = "请填写姓名！";
            break;
          }
          continue;
        } else if (i == 1) {
          if (!this.num) {
            msgs = "请填写证件号码！";
            break;
          }
          continue;
        } else if (i == 2) {
          if (!cName) {
            msgs = "收货人姓名只支持中文，请输入2-15个字符！";
            break;
          }
          continue;
        } else if (i == 3) {
          if (!cNum) {
            msgs = "请输入正确的证件号码号！";
            break;
          }
          continue;
        } else {
          msgs = "";
          break;
        }
      }
      return (this.warningMsg = msgs);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../public/scss/index.scss";
@import "../../../public/scss/mixin.scss";

.add {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f0f0f0;
  z-index: 20;
}

.header {
  padding: 0 0.3rem;
  width: 100%;
  height: 1rem;
  text-align: center;
  background-color: #fff;
  color: #000;
  position: absolute;
  top: 0;
  left: 0;
  // border-bottom: 1px solid rgba(7, 17, 27, 0.2);
  @include scale-border-bottom(rgba(7, 17, 27, 0.2));

  .title {
    font-size: 0.4rem;
    vertical-align: middle;
    position: relative;
    top: -0.1rem;
  }

  .icon-box {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 1rem;
    height: 1rem;
    font-size: 0.4rem;
    text-align: center;
    line-height: 1.1rem;
    // background-color: #ddd;
  }

  .save {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    width: 1rem;
    height: 1rem;
    font-size: 0.3rem;
    text-align: center;
    line-height: 1.1rem;
  }
}

.content {
  // margin-top: 1rem;
  background-color: #fff;
}

.list {
  margin: 0 0.4rem;
  display: flex;
  @include scale-border-bottom(rgba(7, 17, 27, 0.1));

  .name {
    display: inline-block;
    flex: 0 0 1.6rem;
    width: 1.6rem;
    height: 1.2rem;
    text-align: left;
    line-height: 1.2rem;
    font-size: 0.31rem;
    // line-height: 1rem;
  }

  .inp {
    flex: 1;
    margin: 0;
    padding: 0;
    border: 0;
    outline: none;
    color: #777;
    font-size: 0.3rem;
    line-height: 1.2rem;
  }

  .icon-1 {
    width: 1rem;
    height: 1.2rem;
    line-height: 1.24rem;
    text-align: center;
  }

  .icon-2 {
    flex: 0 0 0.4rem;
    width: 0.4rem;
    height: 1.2rem;
    font-size: 0.3rem;
    text-align: right;
    line-height: 1.2rem;

    i {
      font-size: 0.26rem;
    }
  }
}

.icon-3 {
  flex: 0 0 1.2rem;
  width: 1.2rem;
  height: 1.2rem;
  font-size: 0.3rem;
  text-align: right;
  line-height: 1.2rem;
}

.detail-address {
  padding: 0.4rem;
  display: flex;

  .detail {
    display: inline-block;
    flex: 0 0 1.6rem;
    width: 1.5rem;
    height: 1.6rem;
    font-size: 0.31rem;
  }

  textarea {
    flex: 1;
    max-height: 1.6rem;
    border: 0;
    outline: none;
    padding-left: 0.2rem;
    font-size: 0.3rem;
    color: #777;
  }

  .icon {
    flex: 0 0 0.5rem;
    width: 0.5rem;
    height: 1.6rem;
    font-size: 0.32rem;
    text-align: right;
    line-height: 1.6rem;
  }
}
</style>
