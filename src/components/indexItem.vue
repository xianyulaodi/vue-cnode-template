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
