var app = getApp();
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
      hmlrid: options.hmlrid
    })

    // 初始化表单验证
    that.WxValidate = app.wxValidate(
      {
        demand: {
          required: true,
          minlength: 2
        },
        description: {
          required: true,
          minlength: 2
        }
      }
      , {
        demand: {
          required: '请输入对业主的要求',
        },
        description: {
          required: '请输入对业主的描述',
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

  /**
   * 提交表单
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

    } else {

      console.log(that.data.hmlrid);
      console.log(e.detail.value);

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
            console.log('demand：' + e.detail.value.demand);
            console.log('description：' + e.detail.value.description);

            //提交
            wx.request({
              url: app.data.domain + '/HmOwner/add?wuid='+wuid+'&hmlrid='+that.data.hmlrid,
              data: {
                demand: e.detail.value.demand,
                description: e.detail.value.description
              },
              method: 'POST',
              header: {
                  'content-type': 'application/json'
              },
              success: function (res) {
                // if
                if (res.data.status == 0) 
                {
                    wx.redirectTo({
                      url: '/pages/hmLandlord/hmLandlord?hmlrid=' + res.data.data
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
  //下一页
  gotoNext: function () {
    wx.redirectTo({
      url: '/pages/hmLandlord/hmLandlord?hmlrid=1',
    })
  }
})