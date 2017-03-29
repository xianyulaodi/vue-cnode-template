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
>    之前玩react比较多，因为在新公司有些项目打算用vue，所以打算也来玩玩vue,不过是直接入手vue2,为了怕自己忘记，所以打算来个小小的总结,不过本文是一篇大杂烩，因为要写vue、vue-router和vuex这三者

## vue组件的生命周期
>如果你之前有玩过react，那么就可以拿这些生命周期和react的进行一个类比了。组件的生命周期图如下：
![组件生命周期](http://images.cnblogs.com/cnblogs_com/fly_dragon/276813/o_lifecycle-%E6%A0%87%E6%B3%A8%E7%89%88%E6%9C%AC.png)

## 如何写一个组件

vue的读音和view同音，和react一样，也是组件化的一个理想框架，vue中组件化是如何实现的呢？我们以我们的项目为例
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

>   我们定义了一个template模板，template数据名称来源于props，所有我们template使用for循环的时候，用的itemList，因为props里面写的是itemList.
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
   如上面的代码所示，我们import我们需要的组件，这里有个注意点，调用组件的时候，不支持驼峰命名法，所以你引用的驼峰命名的组件要拆开，比如引入的是indexItem组件，那么在使用的时候要拆成index-item。
   
   如何传入数据呢。：[组件props的数据命名]，比如我的indexItem组件中，它的props里面的数据名字为 itemList,所以我父组件传值的时候，也是这样，通过
 ```
 <index-item :item-list=传入的数据></index-item>
 ```
  和引入组件一样，如果组件里面的props的命名是驼峰命名方式的话，也是需要拆开的。这里还有个需要注意点，我们不必在全局注册每个组件。通过使用组件实例选项注册，可以使组件仅在另一个实例/组件的作用域中可用。所以我们的项目中，我们应用了什么组件，在compontents里面就要写上对应的组件名称。如代码
 ```
 components: {cHeader,indexItem}
 ```
 
 #### 先下班了，持续更新。。。
