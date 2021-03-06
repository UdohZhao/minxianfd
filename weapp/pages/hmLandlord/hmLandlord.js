var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //验证码倒计时
    verifyCodeTime: '获取验证码',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.WxValidate = appInstance.wxValidate(
      {
        title: {
          required: true,
          minlength: 2,
          maxlength: 20,
        },
      }
      , {
        cname: {
          required: '请输入房源标题',
        },
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
  //获取短信验证码
  mobileInputEvent: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  verifyCodeEvent: function (e) {
    if (this.data.buttonDisable) return false;
    var that = this;
    var c = 60;
    var intervalId = setInterval(function () {
      c = c - 1;
      that.setData({
        verifyCodeTime: c + 's后重发',
        buttonDisable: true
      })
      if (c == 0) {
        clearInterval(intervalId);
        that.setData({
          verifyCodeTime: '获取验证码',
          buttonDisable: false
        })
      }
    }, 1000)
    var mobile = this.data.mobile;
    var regMobile = /^1\d{10}$/;
    if (!regMobile.test(mobile)) {
      wx.showToast({
        title: '手机号有误！'
      })
      return false;
    }
    app.sendVerifyCode(function () { }, mobile);//获取短信验证码接口
  },
  //跳转到支付页面
  gotoNext:function(){
    wx.redirectTo({
      url: '/pages/pay/pay',
    })
  }

})