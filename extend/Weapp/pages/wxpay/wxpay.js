// pages/wxpay/wxpay.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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

  /**
   * 微信支付
   */
  wxpay: function (e) {
    var that = this
    // 金额
    var total_fee = e.target.dataset.fee;
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
          wx.request({
            url: app.data.domain + '/WxPay/pay',
            data: {
              wuid: wuid,
              total_fee: total_fee
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
              var payment = res.data.data;
              wx.requestPayment({
                'timeStamp': payment.timeStamp,
                'nonceStr': payment.nonceStr,
                'package': payment.package,
                'signType': payment.signType,
                'paySign': payment.paySign,
                'success':function(res){
                  console.log(res);
                },
                'fail':function(e){
                  console.log(e);
                }
              })
            }
          })
        }
      }
    })
  }
})