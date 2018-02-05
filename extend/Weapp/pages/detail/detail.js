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
                  console.log(res.data.data)
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
  onColletionTap: function (event) {
    // 获取房源ID
      var id = this.data.hm_landlord_rent.id
      console.log(id)
    var collectionStatus = this.data.collectionStatus
    if (collectionStatus == true){
      wx.showToast({
        icon:'success',
        title: '收藏成功',
        duration:3000,
        mask:true,
      })
      this.setData({
        collectionStatus:false
      })
    }else{
      wx.showToast({
        icon: 'success',
        title: '取消成功',
        duration: 3000,
        mask: true
      })
      this.setData({
        collectionStatus: true
      })
    }
  },
})