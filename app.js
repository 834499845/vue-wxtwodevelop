/**
 * Created by LangK on 2016/12/20.
 */
var path = require('path')
var http = require("http");
var express = require('express')
var proxyMiddleware = require('http-proxy-middleware')
const bodyParser = require('body-parser')
require('body-parser-xml')(bodyParser)
const crypto = require('crypto')

const app = express()
const toke = require('./toke.js')
const getTok = require('./WX/getToken.js')
const getUser = require('./WX/getUser.js')
const getJdk = require('./WX/getJssdk.js')

require('./API/config.js')
const config = require('./WXconfig.js')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.xml({
  limit: '2MB',
  xmlParseOptions: {
    normalize: true,
    normalizeTags: true,
    explicitArray: false
  }
}))
app.use(express.static(path.join(__dirname, '/dist/')))
// 获取用户信息
app.post('/home', function (req, res) {
  var codeStr = req.body.url
  if (codeStr.length > 0) {
    var code = codeStr.split('?')[1].split('&')[0].split('=')[1]
    let _res = res
    console.log('code:::', code)
    if (code) {
      getUser.getToken(code).then(data => {
        var tokenObj = JSON.parse(data)
        // console.log('根据code获取token--', tokenObj)
        var openId = tokenObj.openid
        var AccessToken = tokenObj.access_token
        var refreshTtoken = tokenObj.refresh_token
        if (openId && AccessToken && refreshTtoken) {
          toke.openId = openId
          toke.AccessToken = AccessToken
          toke.refreshTtoken = refreshTtoken
        }
        if (tokenObj.errmsg) {
          getUser.getUserInfo(toke.AccessToken, toke.openId).then(data => {
            console.log('用户数据:::', data)
            _res.status(200).json({
              'status': 200,
              'data': 'error'
            })
          })
        } else {
          getUser.getUserInfo(toke.AccessToken, toke.openId).then(data => {
            console.log('用户数据:::', data)
            _res.status(200).json({
              'status': 200,
              'data': data
            })
          })
        }
      })
    } else if (toke.AccessToken.length > 0) {
      console.log('code有问题')
    } else {
      console.log('code有问题')
    }
  }
})
// jssdk信息
app.post('/apphome', function (req, res) {
  var clientUrl = req.body.urlStr.split('#')[0]
  console.log('url+++++++++++++', clientUrl)
  // console.log(config.appId)
  let _res = res
  getJdk(clientUrl).then(data => {
    console.log('JSSDK:::', data)
    _res.status(200).json({
      signature: data[0],
      timestamp: data[1],
      nonceStr: data[2],
      appId: config.appId
    })
  })
})
// 微信二维码
// app.post('/friendTEwm', function (req, res) {
//   let _res = res
//   ewm.getEwmTicket().then(data => {
//     console.log(data)
//     _res.status(200).json({
//       "img": 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + data.ticket
//     })
//   })
// })
// 代理
var proxyTable = {
  '/client/product': {
    target: "http://" + global.logIp + ":" + global.logport,
    changeOrigin: true
  },
  '/client/application': {
    target: "http://" + global.logIp + ":" + global.logport,
    changeOrigin: true
  },
  '/client/consumer': {
    target: "http://" + global.logIp + ":" + global.logport,
    changeOrigin: true
  },
  '/client/wechat': {
    target: "http://" + global.logIp + ":" + global.logport,
    changeOrigin: true
  }
}
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})



app.listen(80, function () {
  console.log('Server running at port:' + 80);
});









// var PORT = 80;                 //监听8080端口号
// var http = require('http');
// var qs = require('qs');
// var TOKEN = 'yezhenxubu';           //必须与测试号所填写的Token相同

// function checkSignature(params, token) {
//   var key = [token, params.timestamp, params.nonce].sort().join('');
//   //将token （自己设置的） 、timestamp（时间戳）、nonce（随机数）三个参数进行字典排序
//   var sha1 = require('crypto').createHash('sha1');
//   //将上面三个字符串拼接成一个字符串再进行sha1加密
//   sha1.update(key);
//   return sha1.digest('hex') == params.signature;
//   //将加密后的字符串与signature进行对比，若成功，返回echostr
// }

// var server = http.createServer(function (request, response) {
//   var query = require('url').parse(request.url).query;
//   var params = qs.parse(query);
//   console.log(params);
//   console.log("token :", TOKEN);
//   if (!checkSignature(params, TOKEN)) {
//     //如果签名不对，结束请求并返回
//     response.end('signature fail');
//   }

//   if (request.method == "GET") {
//     //如果请求是GET，返回echostr用于通过服务器有效校验
//     // response.end(params.echostr);
//   } else {
//     //否则是微信给开发者服务器的POST请求
//     var postdata = '';
//     request.addListener("data", function (postchunk) {
//       console.log('postchunk:', postchunk)
//       postdata += postchunk;
//     });
//     //获取到了POST数据
//     request.addListener("end", function () {
//       console.log(postdata);
//       response.end('success ');
//     });
//   }
// });

// server.listen(PORT, function () {
//   console.log('Server running at port:' + PORT);
// });