<template>
  <div>
    <c-header :hTitle="title"></c-header>
    <ul class="head-tab">
      <li v-for="(item,index) in tabs" @click="getTopics(1,item.tab,index)" >
          <h3 v-if="index == tabId" class="active"> {{ item.tabName }}</h3>
          <h3 v-else>{{ item.tabName }}</h3>
      </li>
    </ul>
      <index-item :item-list='topicsListData'></index-item>
  </div>
</template>


<script>

  import {mapState} from 'vuex';
  import {mapGetters} from 'vuex';
  import cHeader from 'components/header';
  import indexItem from 'components/indexItem';
  import * as types from '../constants/constants'

  export default {
    data () {
      return {
        title: 'node中文网',
        tabs:[
          {'tabName':'全部',tab:'all'},
          {'tabName':'精华',tab:'good'},
          {'tabName':'分享',tab:'share'},
          {'tabName':'问答',tab:'ask'},
          {'tabName':'招聘',tab:'job'}
        ],
        tabId:0
      }
    },
    // computed相当于属性的一个实时计算，里面的数据如果有变化，会自动去更新
    computed: mapGetters({

      topicsListData :'getTopicsListData'

    }),

    // 后者如下写法
    // computed: {
    //   ...mapGetters([
    //      'getTopicsListData'
    //   ])      
    // }
    //    
        
    methods: {

      /*
      * @获取内容
      */
      getTopics (page,tab,index) {
          // 触发action
          this.$store.dispatch({
              type:types.GET_TOPICS,
              pageNo:page,
              tab:tab
          });
          this.tabId=index;
          // console.log(index)
          // var obj={
          //   tabId:index
          // }
          // this.saveCurrentPageData(obj)
        /**
         * 遇到的问题: 异步请求数据，页面渲染了，但数据还没来,how to do ?
         * 目前的解决办法:数据都放在gettters里面，通过getters里面的数据直接传到页面上去，因为getters里面也可以处理数据
         */
      }, 

      // 缓存当前页面的数据，因为路由跳转之后，再回来，会重新刷新页面。所以把它存储在sessionStorage中
      // saveCurrentPageData (obj) {
      //   // console.log(obj);
      //   window.sessionStorage.setItem('obj',JSON.stringify(obj));
      // }
    },
    // beforeRouterEnter(to,from,next){
    //   next(vm =>{

    //   }

    //     )
      
    //    console.log(to);
    //    console.log(from);
    //    console.log(next);
    // },
    /*
    * @初始化(组件挂载完成)，相当于react中的componentWillamount
    */
    mounted () {
      // 初始化，如果有缓存数据，直接读取缓存数据
      // var sessionStorage=window.sessionStorage;
      // console.log(JSON.parse(window.sessionStorage.getItem('obj')));
      // if(sessionStorage.getItem('obj')&&sessionStorage.getItem('obj')!='undefined'){
      //     var obj=JSON.parse(window.sessionStorage.getItem('obj'));
      //     var tabId=obj.tabId;
      //     console.log(tabId);
      //     var tab=this.tabs[tabId].tab;
      //     this.getTopics(1,tab); 
      //     this.tabId=tabId;         
      //     return false;
      // }
      this.getTopics(1,'all'); 
      this.tabId=0;
    },

    // 引用了什么样的组件，就写上对应的组件
    components: {cHeader,indexItem}
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
  .active{
    color: red;
  }
}

</style>
