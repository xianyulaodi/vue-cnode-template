<template>
	<span>{{hTitle}}</span>
</template>


<script>
	import $base from 'components/base';
	export default {
	   props:{
	   	 hTitle:String  //也可以是空值
	   },
	   methods: {
	    //@设置App头部
	    setAppHeader(){
	       document.title = this.hTitle;
	    }
	   },
	   mounted: function () {
	     this.setAppHeader();
	   }
	 }
</script>
