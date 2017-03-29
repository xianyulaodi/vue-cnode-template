/*
* @author jiangjunhuan@yy.com
*/

var base = {
  Services: '',

  /*
  * @调手Y接口
  * @param 
  *   act   接口类名如data、device、ui
  *   mtd   接口方法
  *   args  参数
  *   error 失败回调
  */
  GET_YY_SERVICE: function(act,mtd,args,error) {
    try{
      return window.YYApiCore.invokeClientMethod(act, mtd, args);
    }catch(err){
      error && error(err);
    }
  },    
}

export default base;