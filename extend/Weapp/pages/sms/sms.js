// pages/sms/sms.js
//获取应用实例
const app = getApp()
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

  // 获取用书输入的手机号码
  getPhone: function(e){
    var that = this;
    that.setData({
      phone: e.detail.value
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

  getVerificationCode(){
    var that = this
    // if
    if (that.isPoneAvailable(that.data.phone)) 
    {
      that.getCode();
      that.setData({
        disabled:true
      })
      // 发送短信验证码
      wx.request({
        url: app.data.domain + '/Sms/send',
        data: {
          phone: that.data.phone
        },
        header: {
            'content-type': 'application/json'
        },
        method: 'POST',
        success: function(res) {
          console.log(res.data)
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
  }



})