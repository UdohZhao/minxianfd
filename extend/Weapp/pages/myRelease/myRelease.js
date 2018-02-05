const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: app.data.domain,
    hm_landlord_rent: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 请求房源发布数据
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
          // var wuid = res.data.data;
          // 测试小程序用户id
          var wuid = 1;
          //提交
          wx.request({
            url: app.data.domain + '/HmLandlordRent/index?wuid='+wuid,
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
                    hm_landlord_rent: res.data.data.hm_landlord_rent
                  })
              }
              else
              {
                  that.setData({
                    hm_landlord_rent: false
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
   * 去往详细
   */
  gotoDetail: function (e) {
      // 获取hmlrid
      var hmlrid = e.currentTarget.dataset.hmlrid;
      wx.navigateTo({
        url: '/pages/detail/detail?hmlrid=' + hmlrid
      })
  },

  /**
   * 查看Msg
   */
  lookMsg: function (e) {
    console.log(e);
    wx.showModal({
      title: '管理员审核备注信息',
      content: e.currentTarget.dataset.msg,
      showCancel: false
    })
  },

  /**
   * 立即付款
   */
  atPay: function (e) {
    var that = this

    // 获取用户置顶推广数据
    var hm_promotion_id = e.currentTarget.dataset.hm_promotion_id;
    // 获取房源模块房东出租主键id
    that.setData({
      hmlrid: e.currentTarget.dataset.hmlrid
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

          // 提交
          wx.request({
            url: app.data.domain + '/WxPay/pay?wuid='+wuid+'&hmlrid='+that.data.hmlrid,
            data: {
              hmpid: hm_promotion_id.id,
              day: hm_promotion_id.day,
              total_fee: hm_promotion_id.cost
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
                    wx.reLaunch({
                      url: '/pages/success/success?hmlrid=' + that.data.hmlrid
                    })
                  },
                  'fail':function(e){
                    console.log(e);
                    if (e.errMsg === 'requestPayment:fail cancel') {                  
                        wx.showModal({
                          title: '提示',
                          content: '您取消了支付，是否离开支付页面？',
                          success: function(res) {
                            if (res.confirm) {
                              wx.reLaunch({
                                url: '/pages/me/me?hmlrid=' + that.data.hmlrid
                              })
                            } else if (res.cancel) {
                              console.log('用户点击了取消');
                            }
                          }
                        })
                    } else {                  
                        wx.showModal({
                          title: '提示',
                          content: res.errMsg + '，是否离开支付页面？',
                          success: function(res) {
                            if (res.confirm) {
                              wx.reLaunch({
                                url: '/pages/me/me?hmlrid=' + that.data.hmlrid
                              })
                            } else if (res.cancel) {
                              console.log('用户点击了取消');
                            }
                          }
                        })
                    }
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