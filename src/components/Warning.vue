<template>
    <div class="warning">
        <div class="warning-box">
            <span>{{warningMsg}}</span>
            <!-- <span>{{warningMsg}}</span> -->
        </div>
    </div>
</template>

<script>
export default {
    props:["warningMsg"]
};

</script>

<style scoped lang="scss">
.warning{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background-color: rgba(0,0,0,.5);
}

.warning-box{
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%);
    width:5.6rem; 
    // height: 2rem;
    margin: 0 auto;
    font-size: .3rem;
    line-height: .6rem;
    text-align: center;
    color: #fff;
    background-color: rgba(0,0,0,.5);
    display: table;
    padding: .2rem .4rem;
    border-radius: .2rem;

    span{
        display: table-cell;
        vertical-align: middle;
    }
}

</style>
