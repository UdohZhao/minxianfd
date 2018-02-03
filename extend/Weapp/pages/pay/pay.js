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
    var that = this;

    // 房源模块房东出租表主键id
    that.setData({
      // hmlrid: options.hmlrid
      hmlrid: 1
    })

    // 请求岷县数据
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
          //提交
          wx.request({
            url: app.data.domain + '/HmPromotionCost/index?wuid='+wuid,
            data: {},
            method: 'GET',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res);
              // if 
              if (res.data.status == 0) 
              {
                  that.setData({
                    hm_promotion_cost_arr: res.data.data,
                    curNav: res.data.data[0].id,
                    day: res.data.data[0].day,
                    cost: res.data.data[0].cost
                  })
              }
              else
              {
                  wx.showModal({
                    title: '提示',
                    content: '请点击确定重新载入！',
                    showCancel: false,
                    success: function(res) {
                      if (res.confirm) {
                        wx.reLaunch({
                          url: '/pages/index/index'
                        })
                      }
                    }
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
   * 选取金额
   */
  payTap:function(e){
    var that = this
    let id = e.target.dataset.id
    var day = e.target.dataset.day
    var cost = e.target.dataset.cost
    that.setData({
      curNav: id,
      day: day,
      cost: cost
    })
  },

  /**
   * 微信支付
   */
  wxpay: function (e) {
    var that = this
    // 金额
    var total_fee = that.data.cost;

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

          // 提交
          wx.request({
            url: app.data.domain + '/WxPay/pay?wuid='+wuid+'&hmlrid='+that.data.hmlrid,
            data: {
              day: that.data.day,
              total_fee: total_fee
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
              // if
              if (res.data.status == 0) {
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
              } else {
                  wx.showModal({
                    title: '错误提示',
                    content: res.data.msg,
                    showCancel: false
                  })
              }
            }
          })
        }
      }
    })
  }

})