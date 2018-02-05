const app = getApp();
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    time: '获取验证码', //倒计时  
    currentTime:61,
    phone: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 房源模块房东出租表主键id
    that.setData({
      hmlrid: options.hmlrid
    })

    // 初始化表单
    that.WxValidate = app.wxValidate(
      {
        cname: {
          required: true,
          minlength: 2,
          maxlength: 10
        },
        phone:{
          required: true,
          tel:true
        },
        code:{
          required: true
        }
      }
      , {
        cname: {
          required: '请输入姓名！',
        },
        phone:{
          required: '请输入有效的手机号码！',
        },
        code:{
          required: '验证码不能为空！',
        }
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }, 

  // 获取用户输入的手机号码
  getInputPhone: function(e){
    var that = this;
    that.setData({
      phone: e.detail.value
    })
  },

  // 获取用户输入的验证码
  getInputCode: function(e){
    var that = this;
    that.setData({
      code: e.detail.value
    })
  },

  // 获取短信验证码
  getCode: function (options){
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: "剩余" + currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime:61,
          disabled: false   
        })
      }
    }, 1000)  
  },

  /**
   * 获取验证码
   */
  getVerificationCode: function (e) {
    var that = this
    // if
    if (that.isPoneAvailable(that.data.phone)) 
    {
      that.getCode();
      that.setData({
        disabled:true
      })

      // 3rd_session
      wx.request({
        url: app.data.domain + '/WxLogin/checkRedis', 
        data: {
          threerd_session: wx.getStorageSync('3rd_session')
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          // 3rd_session
          if (res.data.status == 1) 
          {
            app.threerdLogin();
          }
          else
          {
            // 小程序用户id
            var wuid = res.data.data;

            console.log('小程序用户id：' + wuid);
            console.log('hmlrid：' + that.data.hmlrid);
            console.log('phone：' + that.data.phone);

            //提交
            wx.request({
              url: app.data.domain + '/Sms/send?wuid='+wuid+'&hmlrid='+that.data.hmlrid,
              data: {
                phone: that.data.phone
              },
              method: 'POST',
              header: {
                  'content-type': 'application/json'
              },
              success: function (res) {
                // if
                if (res.data.status == 0) 
                {
                    that.setData({
                      smsCode: res.data.data
                    })
                } 
                else
                {
                    wx.showModal({
                      title: '错误提示',
                      content: res.data.msg,
                      showCancel: false
                    })
                }
              },
              fail: function (e) {
                console.log(e);
              }
            })
          }
        }
      })

    }
    else
    {
      wx.showModal({
        title: '错误提示',
        content: '请输入有效的手机号码！',
        showCancel: false
      })
    }
  },

   // phone check
  isPoneAvailable: function (pone) {  
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;  
    if (!myreg.test(pone)) {  
      return false;  
    } else {  
      return true;  
    }  
  },

  /**
   * 表单验证
   */
  formSubmit: function (e) {
    var that = this;
    //提交错误描述
    if (!that.WxValidate.checkForm(e)) {
      console.log(e.detail)
      const error = that.WxValidate.errorList[0]
      // `${error.param} : ${error.msg} `
      wx.showModal({
        title: '错误提示',
        content: `${error.msg} `,
        showCancel: false
      })

      return false

    } else if (that.data.code != that.data.smsCode) {

      wx.showModal({
        title: '错误提示',
        content: '验证码错误！',
        showCancel: false
      })

    } else {

      // 3rd_session
      wx.request({
        url: app.data.domain + '/WxLogin/checkRedis', 
        data: {
          threerd_session: wx.getStorageSync('3rd_session')
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          // 3rd_session
          if (res.data.status == 1) 
          {
            app.threerdLogin();
          }
          else
          {
            // 小程序用户id
            var wuid = res.data.data;

            console.log('小程序用户id：' + wuid);
            console.log('hmlrid：' + that.data.hmlrid);
            console.log('cname：' + e.detail.value.cname);
            console.log('phone：' + e.detail.value.phone);

            //提交
            wx.request({
              url: app.data.domain + '/HmLandlord/add?wuid='+wuid+'&hmlrid='+that.data.hmlrid,
              data: {
                cname: e.detail.value.cname,
                phone: e.detail.value.phone
              },
              method: 'POST',
              header: {
                  'content-type': 'application/json'
              },
              success: function (res) {
                // if
                if (res.data.status == 0) 
                {
                    var data = res.data;
                    console.log(data);                  
                    wx.showModal({
                      title: '提示',
                      content: '是否需要置顶推广？',
                      success: function(res) {
                        if (res.confirm) {
                          wx.reLaunch({
                            url: '/pages/pay/pay?hmlrid=' + data.data
                          })
                        } else if (res.cancel) {
                          wx.reLaunch({
                            url: '/pages/me/me?hmlrid=' + data.data
                          })
                        }
                      }
                    })
                } 
                else
                {
                    wx.showModal({
                      title: '错误提示',
                      content: res.data.msg,
                      showCancel: false
                    })
                }
              },
              fail: function (e) {
                console.log(e);
              }
            })
          }
        }
      })

    }

  },
  //跳转到支付页面
  gotoNext:function(){
    wx.redirectTo({
      url: '/pages/pay/pay',
    })
  }

})