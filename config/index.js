// see http://vuejs-templa
// tes.github.io/webpack for documentation.
var path = require('path');
var os = require('os');
var networkInterfaces = os.networkInterfaces();
var ip;

// 项目名称
var projectName = 'myWallet';

// CDN域名随机分配
var staticHost = [
  '//web.yystatic.com/project/group_act/'+projectName+'/mobile/',
  '//web1.yystatic.com/project/group_act/'+projectName+'/mobile/',
  '//web2.yystatic.com/project/group_act/'+projectName+'/mobile/',
  '//web3.yystatic.com/project/group_act/'+projectName+'/mobile/'
][Math.ceil(Math.random()*4) - 1];

for (var key in networkInterfaces) {
  networkInterfaces[key].forEach(item => {
    if (!item.internal && item.family === 'IPv4') {
      ip = item.address;
    }
  });
}

module.exports = {
  build: {
    env: require('./prod.env'),
    port: 8082,
    index: path.resolve(__dirname, '../dist/html/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: 'http://webapp.yy.com/dist/',
    // assetsPublicPath: staticHost,
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all staticø assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8081,
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
