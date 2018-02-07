//app.js
// 引入表单验证
import wxValidate from 'utils/wxValidate'
App({
  data: {
      domain: 'https://ngrok.getcunji.com'
      //   domain: 'http://dev.minxianfd.vag'
  },
  onLaunch: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function (e) {
    var that = this;
    // checkSession
    wx.checkSession({
      success: function(){
        //session 未过期，并且在本生命周期一直有效
        console.log('//session 未过期，并且在本生命周期一直有效');
      },
      fail: function(){
        console.log('//登录态过期');
        // 3rd_session
        that.threerdLogin();
      }
    })
  },
  onHide: function (e) {
    console.log('当小程序从前台进入后台，会触发 onHide');
  },
  onError: function (e) {
    console.log(e);
  },
  //创建表单验证
  wxValidate: (rules, messages) => new wxValidate(rules, messages),
  // threerdLogin
  threerdLogin : function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: this.data.domain + '/WxLogin/login',
            data: {
              code: res.code
            },
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            success: function(res) {
              // if
              if (res.data.status == 0) 
              {
                // 本地缓存
                wx.setStorageSync('3rd_session', res.data.data);
                wx.reLaunch({
                  url: '/pages/index/index'
                })
              }
              else
              {
                wx.showModal({
                  title: '系统提示',
                  content: '获取登录态失败！',
                  showCancel: false
                })
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null
  }
})