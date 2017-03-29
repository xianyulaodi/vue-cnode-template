<template>
  <div>
    <!-- <div><router-link :to="{name:'index'}" >回到首页</router-link></div> -->
    <div  @click="routerBack">回到首页</div>
    <div v-html="detailsData"></div>
  </div>
</template>


<script>

  import {mapState} from 'vuex';
  import {mapGetters} from 'vuex';

  export default {
    data () {
      return {
        
        title: 'cnode中文网',
      }
    },

    // computed: {
    //   ...mapGetters([
    //      'detailsData'
    //   ])      
    // },
    computed: mapGetters({

      detailsData:'getDetailsData'
      
    }),    

    methods: {

      getDetail(id){

        this.$store.dispatch('GET_DETAILS',id);  

      },
      
      routerBack(){
        this.$router.go(-1);
      }
    },
    /*
    * @初始化(组件挂载完成)
    */
    mounted () {

      this.getDetail(this.$route.params.id);  //this.$route.params.id是从路由传过来的数据

    },
    ready(){

    },

    components: {}
  }

</script>

<style lang="scss" rel="stylesheet/scss">
body{
  background: #f8f8f8;
  width: 100%;
  overflow: hidden;
}
.head-tab{
  height: 40px;
  display: flex;
  max-width: 375px;
  text-align: center;
  font-size: 16px;
  line-height: 40px;
  li{
    flex:1;
  }
}

</style>
