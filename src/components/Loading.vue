<template>
    <div class="loading_content" v-show="loading">
        <div class="global_loading" v-loading="loading" v-show="loading"></div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
    export default {
      name: 'loading',
      computed:{
        ...mapGetters(['loading'])
      },
    }
</script>

<style lang="scss">
    .loading_content{
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0,0,0,0);
        top:0;
        left:0;
    }
    .global_loading{
        width: 150px;
        height: 100px;
        background: rgba(0,0,0,0.5);
        position: absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        margin: auto;
        border-radius: 10px;
    }
</style>
