//app.js
// 引入表单验证
import wxValidate from 'utils/wxValidate'
App({
  data:{
    //域名
    domain: "https://ngrok.getcunji.com",
    // domain: "http://dev.minxianfd.vag",
    phone: "18883867534",
  },
  // onLaunch
  onLaunch: function () {
    // 3rd_session
    this.threerdLogin();
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) 
        {
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
        else
        {
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
  globalData: {
    userInfo: null
  },
  //创建表单验证
  wxValidate: (rules, messages) => new wxValidate(rules, messages),

  // threerdLogin
  threerdLogin : function () {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: that.data.domain + '/WxLogin/login',
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
              }
              else
              {
                wx.showModal({
                  title: '系统提示',
                  content: '获取登录态失败！',
                  showCancel: false
                })
              }
            },
            fail: function(e) {
              console.log(e);
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  }

})