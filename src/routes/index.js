/**
 * @file
 * Created by jiangjunhuan@yy.com on 17/2/7.
 */
const index = r => require(['views/index'], r);
const detail = r => require(['views/detail'], r);

// 根目录
const rootPath = '';

// 页面路由
const routes = [
  {
  	path: '/', 
    component: index,
    name: 'index'
  },
  {
  	path: '/detail/:id',
  	component: detail, 
  	name: 'detail',
  },
].map(route => {
  route.path = rootPath + route.path;
  return route;
});

// 404 页
// routes.push({path: '*', component: NotFound, name: 'notfound'});

export default routes;
