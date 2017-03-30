## 摘要
&ensp;&ensp;公司后面的H5项目打算用vue2来做，之前有用过一小会vue，但没有真正的去了解，之前框架来说用react用的比较多点。所以趁这个阶段，用cnode中文网提供的api来做了个入门的脚手架，如果脚手架搭好并理解了，那么后面的运用就轻松多了。<br/> 

&ensp;&ensp;vue目前在中国来说应该是属于最火的一个前端框架吧，当然，对框架还是一样的态度，如果项目中要用，就去研究它，否则，只需要去了解它。因为之前有react的一些项目经验，而且两者有一些共同性，所以vue的入门来说还是相当比较容易的，主要做的是勤查文档。

&ensp;&ensp;由于时间有限，没有对cnode中文网进行完全的重构，只重构了首页和详情页，因为这样比较容易理解，如果整个重构了，对于初学来说，比较难看懂，完成后的界面如图所示:(没怎么搞样式，界面巨丑)

![首页](http://images2015.cnblogs.com/blog/776370/201703/776370-20170330192330508-241902663.png);&ensp;&ensp;
![详情页](http://images2015.cnblogs.com/blog/776370/201703/776370-20170330192446461-1898007541.png);

## 项目简介
基于vue.js的前端开发环境，用于前后端开发的单页面应用，可以在开发的时候使用ES2015 、scss等。项目包含：

- 基础库：`vue.js`、 `vue-router2.0版本`、`vuex`、`axios`
- 编译/打包工具：`webpack`、`babel`、`node-sass`
- 单元测试工具：`karma`、`mocha`、`sinon-chai`
- 本地服务器：`express`

## 运行方式
1. `npm install` 
2. 点击start.sh、或者直接cmd里面输入  `npm run dev`
3. 配置构建项目，构建好的文件会输出到 "dist" 目录，
    `npm run build`
4. 服务器，可以查看构建的页面
    `npm run build-server`
5. 单元测试
    `npm run unit`

## 项目说明
&ensp;&ensp;之前玩react比较多，因为在新公司有些项目打算用vue，所以打算也来玩玩vue,不过是直接入手vue2,为了怕自己忘记，所以打算来个小小的总结,不过本文是一篇大杂烩，因为要写vue、vue-router和vuex这三者

## vue组件的生命周期
&ensp;&ensp;如果你之前有玩过react，那么就可以拿这些生命周期和react的进行一个类比了。组件的生命周期图如下：
![组件生命周期](http://images.cnblogs.com/cnblogs_com/fly_dragon/276813/o_lifecycle-%E6%A0%87%E6%B3%A8%E7%89%88%E6%9C%AC.png)

## 如何写一个组件
&ensp;&ensp;vue的读音和view同音，和react一样，也是组件化的一个理想框架，vue中组件化是如何实现的呢？我们以我们的项目为例
>我们的项目中，首页的列表就有用到组件 indexItem组件,代码如下：component/indexItem.vue

```
<template>
	 <div class="item-list-wrap">
        <ul class="item-list">
           <li v-for="item in itemList">
           	    <router-link :to="{name:'detail',params:{id:item.id}}" >{{ item.title }}</router-link>
           </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: ['itemList'],
  mounted: function () {

  }
}
</script>

<style lang="scss" rel="stylesheet/scss">

.item-list-wrap{
  background: #fff;
  .item-list li{
    height: 45px;
    line-height: 45px;
    text-align: left;
    padding:0 10px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    border-bottom: 1px solid #ccc;
  }
}
</style>

```

&ensp;&ensp;我们定义了一个template模板，template数据名称来源于props，所有我们template使用for循环的时候，用的itemList，因为props里面写的是itemList.
那么父组件如何调用这些组件呢，使用方法如下：
views/index.vue
```
<template>
  <div>
    <c-header :hTitle="title"></c-header>
     <index-item :item-list='topicsListData'></index-item>
  </div>
</template>

<script>
  import cHeader from 'components/header';
  import indexItem from 'components/indexItem';

  export default {
    data () {
      return {
        title: 'node中文网',
        tabId:0
      }
    },
    computed: mapGetters({

      topicsListData :'getTopicsListData'

    }),
    methods: {
     components: {cHeader,indexItem}
  }
</script>

```
&ensp;&ensp;如上面的代码所示，我们import我们需要的组件，这里有个注意点，调用组件的时候，不支持驼峰命名法，所以你引用的驼峰命名的组件要拆开，比如引入的是indexItem组件，那么在使用的时候要拆成index-item。
   
&ensp;&ensp;如何传入数据呢。：[组件props的数据命名]，比如我的indexItem组件中，它的props里面的数据名字为 itemList,所以我父组件传值的时候，也是这样，通过
 ```
 <index-item :item-list=传入的数据></index-item>
 ```
&ensp;&ensp;和引入组件一样，如果组件里面的props的命名是驼峰命名方式的话，也是需要拆开的。这里还有个需要注意点，我们不必在全局注册每个组件。通过使用组件实例选项注册，可以使组件仅在另一个实例/组件的作用域中可用。所以我们的项目中，我们应用了什么组件，在compontents里面就要写上对应的组件名称。如代码
 ```
 components: {cHeader,indexItem}
 ```
 ## vur-router
1. 我这边使用的是vue-router2.0版本，遇到了一个坑，就是vue-router跳转之后，再回来，会刷新一次页面。比如我从a页面跳转到b页面，再从b页面返回a页面，那么a页面会刷新一次。这样存在的一个问题就是，我a页面又必须再请求一次数据，或者说，我a页面上传浏览的状态不能够保存。现在还没有找到很好的解决办法，包括使用html5的本地存储也没能很好的解决这个问题。
2. 传参之后，改页面如何获取传过来的参数呢，可以用这个方法，比如我在router中传了一个id到b页面，那么b页面使用的时候可以用下面的代码来获取
 ```
 this.$route.params.id
 ```
关于vue-router就介绍这些，因为可以看文档或者看代码就可以了解完，难度不是很大
 
## vuex2.0
&ensp;&ensp;刚开始看了vuex的文档，发觉跟redux很像，因为它确实有参照redux的思想来写，后来在使用过程中，发觉vuex还是跟redux有挺大的不同的。不过两者的一个相同点就是都是属于状态管理器，只有当你的页面有足够多的状态的时候才需要使用，否则没必要用，小项目用vuex之后增加代码的复杂性而已。
   ![vuex示意图](https://vuex.vuejs.org/zh-cn/images/vuex.png)
   
#### 这里稍作解释：(个人理解，有误之处，欢迎指出)
 - vuex也是跟redux一样，有且只能由一个store
 - 在vuex中，状态的改变只能是通过mutations
 - 用户改变状态有两种方式：第一种是触发action,然后action再来触发mutations;第二种方式是用户直接出发mutations
 - mutations只能处理同步的状态，而action既能处理同步，也能处理异步,这也是action存在的理由，一般异步的状态管理交给action去做即可，同步的话可以直接触发mutations
 - 触发action用dispatch、触发mutations用commit
 
### 这里介绍一下vuex异步的操作
&ensp;&ensp;跟redux一样，理解异步状态管理还是比较难的，不过当你理解了异步的操作，你也就基本掌握vuex了。
&ensp;&ensp;假设我有一个异步请求，需要请求后台的数据，那么需要怎么做呢？   
```
import Vue from 'vue';
import axios from 'axios';
import * as types from '../../constants/constants';
const state = {
    topicsList:[]
};
const getters = {
    getTopicsListData: state => state.topicsList
};
const actions = {
	/**
     * @name  获取主页数据
     * 异步的操作交给action,然后将获取到的数据 commit 到 mutations那里去
     * 
     * # 注意点：
     * 坑点：vuex2只能有两个参数，所以如果你的第二个参数中有多个参数，可以用对象的形式,实际的项目中貌似通过router中来传的，待定
     */
    [types.GET_TOPICS]({commit},obj) {
        axios.get(`https://cnodejs.org/api/v1/topics?page=${obj.pageNo}&limit=20&tab=${obj.tab}`)
        .then((response) => {
          commit(types.SET_TOPICS, { list: response.data.data })
        }, (err) => {
          console.log(err)
        })
    }  
}
const mutations = {
    // 获取首页的数据
    [types.SET_TOPICS](state,{list}) {
        state.topicsList=list;  //再次记住，mutations是唯一允许更新应用状态的地方
    }
};
export default{
    state,
    getters,
    actions,
    mutations
}
```
&ensp;&ensp;如上面的代码所示，我们通过axios来发送我们的请求，具体的流程如下：
1. 我们定义了一个默认的状态topicsList，并赋值为一个空数组
2. 我们定义了一个action来获取后端数据， `[types.GET_TOPICS]({commit},obj) {}`,其实这里也可以直接用方法名，只是vuex遵循flux的写法。也就是说这里其实也是可以写成`getTopics({commit},obj) {}`这种形式的。
   action的方法里，只能由两个参数，一个是默认的commmit,一个是其他参数，所以当你的异步请求有多个参数的时候，需要把它封装到一个对象或者数组里面。
3. 我们在前面定义了一个默认的装填topicsList,前面也说了，状态的改变只能交给mutations来做，所以action获取到的数据，如果要传到topicsList这个状态中，必须要先交给mutations，再由mutations来更新topicsList。所以，获取到后端返回的数据之后，我们commit给mutations，然后mutations再来更新topicsList这个状态
4. 在上面的代码中，我们有看到getters，干嘛用的呢？有一种情况是这样的，比如我渲染一个页面的时候，页面已经渲染完了，但是你的请求数据是异步的，数据还没有回来，那怎么办呢？getters就是这个作用的。我们将mutations更新的状态，传给getters,在getters里面，你可以对这些数据进行一些处理，然后再交给页面使用。

### 页面是如何使用传回来的数据的？
 在view/index.vue中，我们看下面的代码，代码是被简化的，只展示出有用的部分
 
 ```
 <template>
  <div>
    <index-item :item-list='topicsListData'></index-item>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {mapState} from 'vuex';
  import {mapGetters} from 'vuex';
  import indexItem from 'components/indexItem';
  import * as types from '../constants/constants';
  
  export default {
    data () {
      return {
        title: 'node中文网'
      }
    },
    // computed相当于属性的一个实时计算，里面的数据如果有变化，会自动去更新
    computed: mapGetters({

      topicsListData :'getTopicsListData'

    }),
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
      },
    },
    /*
    * @初始化(组件挂载完成)，相当于react中的componentWillamount
    */
    mounted () {

      this.getTopics(1,'all'); 
      
    },
    components: {indexItem}
  }
</script>
 ```
&ensp;&ensp;我们可以看到，在代码中，我们定义了一个方法 `getTopics`，它的作用是发送一个action,并传一些参数进去。页面初始化的时候，我们执行这个方法。也就是mounted里面，我们执行了getTopics这个函数。  
&ensp;&ensp;我们还看到，代码中，我们在computed里面执行了mapGetters，并在里面写入了getters对象，如代码所示：  
&ensp;&ensp;  
``` 
computed: mapGetters({
    topicsListData :'getTopicsListData'
}),
 ```
    
    
&ensp;&ensp;这里稍作解释，computed的作用就是：它相当于一个实时计算，如果里面的内容对应的数据有变化，就会去自动更新里面的数据，并且重新渲染。而mapGetters是映射对应的getters，代码以键值对的形式：  
 
 `topicsListData :'getTopicsListData`  
 
 &ebso;&ensp其中指要和getters里面定义的相对应。比如我getter定义的值为getTopicsListData，mapGetters里面对象的值也要写为getTopicsListData。
 
&ensp;&ensp;而topicsListData则是你需要传到组件中的数据，如下所示  
  
  
`<index-item :item-list='topicsListData'></index-item>`;  


在异步获取的数据中，如果要传给组件，只能从gettter这里去拿，不然是获取不到后端返回的数据的。因为有一个先后的问题 
 
- 对于vue2和vue-router2.0以及vuex2的总结就先到这里，主要是自己在第一次使用中遇到的问题。
- 后面将进入实战阶段，不过脚手架搭好了，后面的问题就是一直参考文档和埋坑就可以了。
- 当然，因为对vue2的认识时间不是特别长，所以这篇文章难免有些错误，有误之处，欢迎指出

