<template>
  <div class="loading-box">
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.loading-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
}

.loading {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%);
  width: 60px;
  height: 40px;
}
.loading span {
  display: inline-block;
  margin: 2px;
  width: 8px;
  height: 100%;
  border-radius: 4px;
  // background: #FF4D8E;
  background: palevioletred;
  // -webkit-animation: load 1.04s ease infinite;
  -webkit-animation: load 1.2s ease infinite;
}
@-webkit-keyframes load {
  0%,
  100% {
    height: 30px;
    background: pink;
  }
  50% {
    height: 60px;
    margin-top: -20px;
    background: palevioletred;
  }
}
.loading span:nth-child(2) {
  // -webkit-animation-delay: 0.05s;
  -webkit-animation-delay: 0.13s;
}
.loading span:nth-child(3) {
  // -webkit-animation-delay: 0.18s;
  -webkit-animation-delay: 0.26s;
}
.loading span:nth-child(4) {
  // -webkit-animation-delay: 0.26s;
  -webkit-animation-delay: 0.39s;
}
.loading span:nth-child(5) {
  // -webkit-animation-delay: 0.4s;
  -webkit-animation-delay: 0.52s;
}
</style>
