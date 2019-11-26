<template>
  <div class="address-location">
    <transition name="city">
      <div class="selected" v-show="toggleShow">
        <van-area
          ref="area"
          class="van-hairline--bottom"
          :area-list="areaList"
          confirm-button-text="完成"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import province_list from "../../../public/js/area.js";

export default {
  data: () => ({
    areaList: province_list, // 所有地址
    userRegion: null,
    toggleShow: false // 用于切换上下滑动的状态
  }),
  props: {
    citySelect: Boolean
  },
  watch: {
    // citySelect为true，页面显示。
    // 侦听变化，改变控制上下滑动切换的状态值
    citySelect(newVal) {
      if (newVal) {
        this.toggleShow = true;
      } else {
        this.toggleShow = false;
      }
    }
  },
  methods: {
    onConfirm(e) {
      // console.log("地址信息e===>",e)
      let province = e[0].name; // 省
      let city = e[1].name; // 市
      let county; // 县(海外城市无县，需判断)
      if(e[2]){
        county = e[2].name
      }else{
        county = undefined
      }

      // 判断省市是否是一样的
      if (province == city) {
        this.userRegion = province + county;
      } else if(county){
        this.userRegion = province + city + county;
      } else{
        this.userRegion = province + city;
      }
      // console.log("地址===>", this.userRegion)
      // 异步执行定时器，等待动画效果完成才隐藏页面
      setTimeout(() => {
        this.$emit("hideCity", this.userRegion);
      }, 300);
      this.toggleShow = false
    },
    onCancel() {
      console.log("取消===>");
      // 异步执行定时器，等待动画效果完成才隐藏页面
      setTimeout(() => {
        this.$emit("hideCity", this.userRegion);
      }, 300);
      this.toggleShow = false
    }
  }
};
</script>

<style scoped lang="scss">
.address-location {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.selected {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  border-radius: 8px 8px 0 0;
  background-color: #fff;
}

.city-enter,
.city-leave-to {
  // height: 0;
  transform: translateY(100%);
}

.city-enter-active,
.city-leave-active {
  transition: all 0.2s linear;
  // animation: slideUp 1s linear;
}

.city-enter-to,
.city-leave {
  // height: 10rem;
  transform: translateY(0);
}
</style>
