/**
 * Created by jiangjunhuan@foxmail.com on 17/2/7.
 * 基于 express 的接口处理定义
 * See http://expressjs.com/zh-cn/4x/api.html
 */

module.exports = {
  api: '/api/hello',
  response: function (req, res) {
    res.send(`
      <p>hello test</p>
    `);
  }
}