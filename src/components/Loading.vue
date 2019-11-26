<template>
  <div class="loading">
    <div class="container"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 100;

  .container {
    width: 100%;
    height: 100%;
    background: url("../../public/images/loading.jpg") no-repeat center center;
    transform: scale(0.3);
  }
}
</style>
