<template>
  <div id="app" class="views">
    <router-view @appchildsay="ApplistenToMyBoy" class="view" keep-alive></router-view>
  </div>

</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { MessageBox, Indicator } from 'mint-ui';
  import { Toast } from 'mint-ui';
  export default {
    name: 'views',
    data() {
      return {
        isLoad: true,
        chengYY: false,
        toUrlPathStr: ''
      }
    },
    computed: mapState(['regUserObj', 'WXuserObj']),
    created: function () {
      var self = this
      var urlStr = location.href
      var aa;
      // if (aa == 1) {
      // 判断url是否为正常url，如果正常，则进行下一步，否则跳转至正常url
      if (urlStr.indexOf('?') != -1 && urlStr.indexOf('&') != -1 && urlStr.indexOf('=') != -1 && urlStr.indexOf('#') != -1) {
        var isCodewen = self.isContains(urlStr, '?')
        var isCodeqi = self.isContains(urlStr, '&')
        var isCodedeng = self.isContains(urlStr, '=')
        var FXpathStr = ''
        var copyPathStr = ''
        // 如果是分享会进入
        if (urlStr.split('?')[1].split('&')[0].split('=')[0] == 'fenxiang' && urlStr.split('?')[1].split('&')[0].split('=')[1] == 'fenxiang') {
          var FXQpath = urlStr.split('?')[1].split('&')[1].split('=')[1]
          // 获取到分享时的页面信息
          location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx977fa7f817efc11f&redirect_uri=http%3a%2f%2fushown.juxiyo.com%2f&response_type=code&scope=snsapi_userinfo&state=' + FXQpath + '#wechat_redirect'
        } else {
          copyPathStr = urlStr.split('#')[1]
          FXpathStr = urlStr.split('?')[1].split('&')[1].split('=')[1].split('#')[0]
          if (isCodewen == true && isCodeqi == true && isCodedeng == true) {
            // WX获取用户
            self.getWXUser({
              url: urlStr
            }).then((data) => {
              if (data.data == 'error') {
                // alert('code错误')
                // 如果是复制的url地址，code会显示错误，跳转到授权页面。并传递一个参数，为复制url的页面。
                location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx977fa7f817efc11f&redirect_uri=http%3a%2f%2fushown.juxiyo.com%2f&response_type=code&scope=snsapi_userinfo&state' + copyPathStr + '=#wechat_redirect'
              } else {
                // alert('code正确')
                var dataObj = data.data
                var userObjs = JSON.parse(dataObj)
                self.WXuserObj.openid = userObjs.openid
                self.WXuserObj.nickname = userObjs.nickname
                self.WXuserObj.sex = userObjs.sex
                self.WXuserObj.language = userObjs.language
                self.WXuserObj.city = userObjs.city
                self.WXuserObj.province = userObjs.province
                self.WXuserObj.country = userObjs.country
                self.WXuserObj.headimgurl = userObjs.headimgurl
                // 注册用户信息
                self.getRegisterUser({
                  openId: self.WXuserObj.openid,
                  avatar: self.WXuserObj.headimgurl,
                  nickName: self.WXuserObj.nickname,
                }).then((data) => {
                  // console.log(data)
                  // alert(data)
                  self.regUserObj.avatar = data.data.data.avatar
                  self.regUserObj.ctime = data.data.data.ctime
                  self.regUserObj.id = data.data.data.id
                  self.regUserObj.nickName = data.data.data.nickName
                  self.regUserObj.openId = data.data.data.openId
                  self.regUserObj.otherCode = data.data.data.otherCode
                  self.regUserObj.scores = data.data.data.scores
                  self.regUserObj.selfCode = data.data.data.selfCode
                  localStorage.setItem('id', self.regUserObj.id)
                  localStorage.setItem('selfCo', self.regUserObj.selfCode)
                  if (FXpathStr.length > 0) {
                    if (FXpathStr == "integral") {
                      self.$router.push({
                        path: '/home/integral'
                      })
                    } else if (FXpathStr == "homepage") {
                      self.$router.push({
                        path: '/home/homepage'
                      })
                    } else {
                      self.$router.push({
                        path: '/' + FXpathStr
                      })
                    }
                  } else {

                  }
                }).catch(msg => {
                  // console.log(msg)
                  // alert(JSON.stringify(msg))
                  Toast({
                    message: '服务器错误',
                    className: 'toastLoad'
                  });
                })
              }
            }).catch(msg => {
            })
          } else {
            // 判断url不符合时跳转到别的地方
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx977fa7f817efc11f&redirect_uri=http%3a%2f%2fushown.juxiyo.com%2f&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect'
          }
        }
      } else {
        // 如果不符合url,直接跳转授权页面.
        location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx977fa7f817efc11f&redirect_uri=http%3a%2f%2fushown.juxiyo.com%2f&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect'
      }
      // }
    },
    beforeDestroy: function () {
      // localStorage.removeItem('id')
    },
    methods: {
      isContains(str, substr) {
        return str.indexOf(substr) >= 0;
      },
      // 监视当前在那个页面,并对其进行分享处理.
      ApplistenToMyBoy(val) {
        var self = this
        // alert(val)
        var urlStr = location.href
        self.toUrlPathStr = 'http://ushown.juxiyo.com?fenxiang=fenxiang&pathstr=' + val
        var lathPath = self.toUrlPathStr
        if (urlStr.indexOf('?') != -1) {
          if (self.chengYY == false) {
            self.getWxJssdk({
              urlStr: urlStr
            }).then((data) => {
              wx.config({
                'debug': false, // 开启调试模式
                'appId': data.appId, // 微信后分配的App唯一标识符
                'timestamp': data.timestamp, // 时间标记（服务端返回的配置数据是有时效的）
                'nonceStr': data.nonceStr, // 加密或签名用的随机字符串
                'signature': data.signature, // 签名（能够证明数据是否被篡改）
                'jsApiList': [ // 打算调用的微信的JSAPI的列表，只有在这个列表中的方法才能调用成功
                  'onMenuShareTimeline',
                  'onMenuShareAppMessage',
                  'onMenuShareQQ',
                  'onMenuShareWeibo',
                  'onMenuShareQZone',
                  'startRecord',
                  'stopRecord',
                  'onVoiceRecordEnd',
                  'playVoice',
                  'pauseVoice',
                  'stopVoice',
                  'onVoicePlayEnd',
                  'uploadVoice',
                  'downloadVoice',
                  'chooseImage',
                  'previewImage',
                  'uploadImage',
                  'downloadImage',
                  'translateVoice',
                  'getNetworkType',
                  'openLocation',
                  'getLocation',
                  'hideOptionMenu',
                  'showOptionMenu',
                  'hideMenuItems',
                  'showMenuItems',
                  'hideAllNonBaseMenuItem',
                  'showAllNonBaseMenuItem',
                  'closeWindow',
                  'scanQRCode',
                  'chooseWXPay',
                  'openProductSpecificView',
                  'addCard',
                  'chooseCard',
                  'openCard'
                ]
              })
              wx.ready(function () {
                self.chengYY = true
                // 分享给朋友 "http://" + global.logZSIp + ":" + global.logFileport + "/files" + val
                wx.onMenuShareAppMessage({
                  title: '91鱼书', // 分享标题
                  desc: self.WXuserObj.nickname + '邀请你加入-91鱼书', // 分享描述
                  imgUrl: 'http://116.62.217.15:9091/files/20170523/1.jpg', // 分享图标
                  link: lathPath, // 分享链接
                  type: '', // 分享类型,music、video或link，不填默认为link
                  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                  success: function () {
                  },
                  cancel: function () {
                  },
                  fail: function (err) {
                  }
                });
                // 分享给朋友圈
                wx.onMenuShareTimeline({
                  title: '91鱼书', // 分享标题
                  imgUrl: 'http://116.62.217.15:9091/files/20170523/1.jpg',
                  link: lathPath, // 分享链接// 分享图标
                  success: function () {
                  },
                  cancel: function () {
                  }
                });
                // 分享到qq
                wx.onMenuShareQQ({
                  title: '91鱼书', // 分享标题
                  desc: self.WXuserObj.nickname + '邀请你加入-91鱼书', // 分享描述
                  imgUrl: 'http://116.62.217.15:9091/files/20170523/1.jpg',// 分享图标
                  link: lathPath, // 分享链接
                  success: function () {
                    // 用户确认分享后执行的回调函数
                    // alert('分享QQ成功！')
                  },

                  cancel: function () {
                    // 用户取消分享后执行的回调函数
                    // alert('取消分享！')
                  }
                });
                // 分享到腾讯微博
                wx.onMenuShareWeibo({
                  title: '91鱼书', // 分享标题
                  desc: self.WXuserObj.nickname + '邀请你加入-91鱼书', // 分享描述
                  imgUrl: 'http://116.62.217.15:9091/files/20170523/1.jpg', // 分享图标
                  success: function () {
                    // 用户确认分享后执行的回调函数
                    // alert('分享QQ微博成功！')
                  },
                  link: lathPath, // 分享链接
                  cancel: function () {
                    // 用户取消分享后执行的回调函数
                    // alert('取消分享！')
                  }
                });
                // 分享到qq空间
                wx.onMenuShareQZone({
                  title: '91鱼书', // 分享标题
                  desc: self.WXuserObj.nickname + '邀请你加入-91鱼书', // 分享描述
                  imgUrl: 'http://116.62.217.15:9091/files/20170523/1.jpg', // 分享图标
                  success: function () {
                    // 用户确认分享后执行的回调函数
                    // alert('分享QQ空间成功！')
                  },
                  link: lathPath,// 分享链接
                  cancel: function () {
                    // 用户取消分享后执行的回调函数
                    // alert('取消分享！')
                  }
                });

              });
              wx.error(function (err) {
                // alert(JSON.stringify(err))
              });
            }).catch(msg => {
              // alert('服务器错误啦..')
            })
          } else {
            wx.onMenuShareAppMessage({
              title: '91鱼书', // 分享标题
              desc: self.WXuserObj.nickname + '邀请你加入-91鱼书', // 分享描述
              imgUrl: 'http://116.62.217.15:9091/files/20170523/1.jpg', // 分享图标
              link: lathPath, // 分享链接
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
              },
              cancel: function () {
              },
              fail: function (err) {
              }
            });
            // 分享给朋友圈
            wx.onMenuShareTimeline({
              title: '91鱼书', // 分享标题
              imgUrl: 'http://116.62.217.15:9091/files/20170523/1.jpg',
              link: lathPath, // 分享链接// 分享图标
              success: function () {
              },
              cancel: function () {
              }
            });
            // 分享到qq
            wx.onMenuShareQQ({
              title: '91鱼书', // 分享标题
              desc: '', // 分享描述
              imgUrl: 'http://116.62.217.15:9091/files/20170523/1.jpg',// 分享图标
              link: lathPath, // 分享链接
              success: function () {
                // 用户确认分享后执行的回调函数
                // alert('分享QQ成功！')
              },

              cancel: function () {
                // 用户取消分享后执行的回调函数
                // alert('取消分享！')
              }
            });
            // 分享到腾讯微博
            wx.onMenuShareWeibo({
              title: '91鱼书', // 分享标题
              desc: '', // 分享描述
              imgUrl: 'http://116.62.217.15:9091/files/20170523/1.jpg', // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
                // alert('分享QQ微博成功！')
              },
              link: lathPath, // 分享链接
              cancel: function () {
                // 用户取消分享后执行的回调函数
                // alert('取消分享！')
              }
            });
            // 分享到qq空间
            wx.onMenuShareQZone({
              title: '91鱼书', // 分享标题
              desc: '', // 分享描述
              imgUrl: 'http://116.62.217.15:9091/files/20170523/1.jpg', // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
                // alert('分享QQ空间成功！')
              },
              link: lathPath,// 分享链接
              cancel: function () {
                // 用户取消分享后执行的回调函数
                // alert('取消分享！')
              }
            });
          }
        }
      },
      ...mapActions(['getRegisterUser','getWXUser','getWxJssdk'])
    }
  }

</script>
<style>
  .loadIng {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    z-index: 1000000000;
    justify-content: center;
  }
  
  html,
  body,
  form,
  fieldset,
  p,
  div,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    -webkit-text-size-adjust: 100%;
  }
  
  body {
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }
  
  a {
    text-decoration: none;
  }
  
  img {
    border: 0px solid #ddd;
    outline: none;
  }
  
  [v-cloak] {
    display: none;
  }
  
  ul {
    margin: 0;
    padding: 0;
  }
  
  li {
    list-style: none;
  }
  
  .mint-button {
    height: 5rem;
  }
  
  p {
    margin: 0;
    padding: 0;
  }
  
  a,
  button,
  input,
  optgroup,
  select,
  textarea,
  div {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  
  body,
  html {
    margin: 0;
    padding: 0;
    font-family: "Microsoft YaHei", Arial, "Helvetica Neue", Helvetica, sans-serif;
    overflow-x: hidden;
    overflow-y: auto;
    min-width: 320px;
  }
  
  input,
  textarea {
    -webkit-appearance: none;
    outline: none;
  }
  
  a,
  img {
    -webkit-touch-callout: none;
  }
</style>