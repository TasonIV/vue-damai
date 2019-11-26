<template>
  <div class="notfound">
    <!-- <img src="../../public/images/404.png" alt=""> -->
    <div class="msg">哦吼~ 404</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.notfound {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background: #fff url("../../public/images/404.png") no-repeat 70% 40%;
  background-size: 90%;

  .msg {
    font-size: 0.5rem;
    position: absolute;
    top: 56%;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>
