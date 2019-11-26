<template>
  <div class="add">
    <div class="header border-1px">
      <span class="icon-box iconfont icon-zuo" @click="$router.go(-1)"></span>
      <span class="title">新增收货地址</span>
      <span class="save" @click="saveData">保存</span>
    </div>
    <div class="content">
      <div class="list border-1px">
        <span class="name">收货人</span>
        <input type="text" class="inp" placeholder="请填写收货人姓名" v-model.trim="name" />
        <i class="icon-1 iconfont icon-cha" v-if="this.name" @click="delName"></i>
        <i class="icon-2 iconfont icon-ren"></i>
      </div>

      <div class="list border-1px">
        <span class="name">手机号</span>
        <input type="text" class="inp" placeholder="请填写收货人手机号" v-model.trim="telephone" />
        <i class="icon-1 iconfont icon-cha" v-if="this.telephone" @click="delTel"></i>
        <span class="icon-3" @click="showTel()">
          +{{numType}}
          <i class="iconfont icon-you"></i>
        </span>

        <keep-alive>
          <Telephone v-show="telSelect" :isCheck="telSelect" @hide="hideTel" @tel-type="telType" />
        </keep-alive>
      </div>

      <div class="list border-1px" @click.stop="showCitySelect">
        <span class="name">所在地区</span>
        <div class="inp">{{region}}</div>
        <i class="icon-3 iconfont icon-you" @click="showLocation"></i>
      </div>
      <keep-alive>
        <AddressLocation v-show="citySelect" :citySelect="citySelect" @hideCity="hideCitySelect" />
      </keep-alive>

      <div class="detail-address">
        <span class="detail">详细地址:</span>
        <textarea
          name
          placeholder="请填写详细地址，不少于4个字"
          cols="30"
          rows="10"
          v-model.trim="addressDetail"
        ></textarea>
        <i class="icon iconfont icon-cha" v-if="this.addressDetail" @click="delAddress"></i>
      </div>
    </div>
    <Warning v-show="warningShow" :warningMsg="warningMsg" />
    <Myloading v-show="isLoading" />
  </div>
</template>

<script>
import Telephone from "../../components/Address/Telephone";
import AddressLocation from "../../components/Address/AddressLocation";
import Warning from "../../components/Warning";
import Myloading from "../../components/Myloading";

export default {
  data: () => ({
    telSelect: false, // 是否显示手机号前缀页面
    numType: 86, // 手机号前缀值
    citySelect: false, // 是否显示地址选择页
    region: null, // 地区信息
    addressDetail: null, // 详细地址

    name: null,
    telephone: null,
    address: null, // 总地址

    warningMsg: null, // 警告信息
    warningShow: false, // 是否显示警告页面
    isLoading: false
  }),
  components: {
    Telephone,
    AddressLocation,
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
    delAddress() {
      this.addressDetail = null;
    },
    // 保存信息
    saveData() {
      // let self = this;
      this.address = this.region + this.addressDetail; // 总收货地址
      this.checkMsg(); // 验证
      if (this.warningMsg) {
        this.warningShow = true;
        setTimeout(() => {
          this.warningShow = false;
        }, 800);
      } else {
        setTimeout(() => {
          this.$router.replace({
            name: "address"
          });
          this.$store.commit("addAddress", {
            id: new Date().getTime(),
            name: this.name,
            telephone: this.telephone,
            address: this.address,
            default: false
          });
          this.isLoading = false;
        }, 1500);
        this.isLoading = true;
      }
    },

    // 输入验证
    checkMsg() {
      let msgs = "";
      // 第一步：验证是否有空行内容
      // 第二步：验证所填信息是否合法
      let cName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,15}$/.test(this.name); // 收货人验证
      let cTel = /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.telephone); // 手机号码验证
      let cAddress = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{4,94}$/.test(
        this.address
      ); // 地址验证
      // 循环验证
      for (let i = 0; i < 8; i++) {
        if (i == 0) {
          if (!this.name) {
            msgs = "请填写收货人姓名！";
            break;
          }
          continue;
        } else if (i == 1) {
          if (!this.telephone) {
            msgs = "请填写手机号码！";
            break;
          }
          continue;
        } else if (i == 2) {
          if (!this.region) {
            msgs = "请选择所在地区!";
            break;
          }
          continue;
        } else if (i == 3) {
          if (!this.addressDetail) {
            msgs = "请填写详细地址!";
            break;
          }
          continue;
        } else if (i == 4) {
          if (!cName) {
            msgs = "收货人姓名只支持中文，请输入2-15个字符！";
            break;
          }
          continue;
        } else if (i == 5) {
          if (!cTel) {
            msgs = "请输入正确的手机号，请选择正确的区号！";
            break;
          }
          continue;
        } else if (i == 6) {
          if (!cAddress) {
            msgs = "请正确填写详细地址，不少于4个字,不多于94个字！";
            break;
          }
          continue;
        } else {
          msgs = "";
          break;
        }
      }
      return (this.warningMsg = msgs);
      // console.log("warningMsg====>", this.warningMsg);
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
