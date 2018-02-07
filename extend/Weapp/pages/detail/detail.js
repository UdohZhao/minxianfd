const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: app.data.domain,
    movies: [
      { url: '../../dist/images/1.jpg' },
      { url: '../../dist/images/2.jpg' },
      { url: '../../dist/images/3.jpg' },
    ],
    collectionStatus:true
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
          var wuid = res.data.data;

          that.setData({
            wuid: wuid
          });
          
          //提交
          wx.request({
            url: app.data.domain + '/HmLandlordRent/viewDetails?wuid='+wuid+'&id='+that.data.hmlrid,
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
                    hm_landlord_rent: res.data.data
                  })
                  // 当前用户是否收藏该房源
                  if (that.data.hm_landlord_rent.hm_owner_collect_id) 
                  {
                        that.setData({
                          collectionStatus:false
                        })
                  }
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
  
  //拨打电话
  Callphone:function(e){
    var telephone = e.target.dataset.telephone;
    console.log(telephone)
    wx.makePhoneCall({
      phoneNumber: telephone,
    })
  },

  //点击收藏
  onColletionTap: function (e) {
    var that = this;
  
    // 收藏房源
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

          // 判断是收藏事件还是取消收藏事件
          var requestUrl;
          if (that.data.collectionStatus) 
          {
              requestUrl = app.data.domain + '/HmLandlordRent/collect?wuid='+wuid+'&hmlrid='+that.data.hm_landlord_rent.id;
          }
          else
          {
              requestUrl = app.data.domain + '/HmLandlordRent/unCollect?wuid='+wuid+'&hmocid='+that.data.hm_landlord_rent.hm_owner_collect_id;
          }

          //提交
          wx.request({
            url: requestUrl,
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
                wx.showToast({
                  icon:'success',
                  title: res.data.msg,
                  duration:3000,
                  mask:true,
                })
                that.setData({
                  collectionStatus: res.data.data
                })
              }
              else
              {
                  wx.showModal({
                    title: '提示',
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
    
  },




})