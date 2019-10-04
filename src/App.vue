<template>
  <div id="app">
    <router-view/>
      <!--<Loading></Loading>-->
     <div v-if="showMenu">
       <Menu />
     </div>
  </div>
</template>
<script>
  import Menu from './components/Menu';
  // import Loading from './components/Loading';
  export default {
    name: 'app',
    data(){
      return {
        showMenu: false,
      }
    },
    components: {
      Menu,
      // Loading,
    },
    async created(){
      const path = this.$route.path.substr(1);
      const hideHeaderList=['login','register','forgetPassword','forgetPayPassword','userDetail'];
      if(hideHeaderList.indexOf(path)>-1){
        this.showMenu = false
      } else {
        this.showMenu = true
      }
    },
    watch:{
      $route() {
        const path = this.$route.path.substr(1);
        const hideHeaderList=['login','register','forgetPassword','forgetPayPassword','userDetail'];
        if(hideHeaderList.indexOf(path)>-1){
          this.showMenu = false
        } else {
          this.showMenu = true
        }
      }
    }
  }
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
