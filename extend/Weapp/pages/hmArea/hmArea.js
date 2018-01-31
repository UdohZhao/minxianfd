var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      town_village_index: 0
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
            url: app.data.domain + '/HmArea/index?wuid='+wuid,
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
                    town_village: res.data.data.town_village,
                    hm_min_xian_id_arr: res.data.data.hm_min_xian_id_arr
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
                          url: 'pages/index/index'
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

    // 初始化表单验证
    that.WxValidate = app.wxValidate(
      {
        address: {
          required: true,
          minlength: 2,
          maxlength: 20,
        },
      }
      , {
        address: {
          required: '请输入街道及小区',
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
  bindPickerChange3: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      town_village_index: e.detail.value
    })
    console.log(that.data.town_village_index);
    console.log(that.data.hm_min_xian_id_arr[e.detail.value]);
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
              console.log('hm_min_xian_id：' + that.data.hm_min_xian_id_arr[that.data.town_village_index]);
              console.log('address：' + e.detail.value.address);

              //提交
              wx.request({
                url: app.data.domain + '/HmArea/add?wuid='+wuid+'&hmlrid='+that.data.hmlrid,
                data: {
                  hm_min_xian_id: that.data.hm_min_xian_id_arr[that.data.town_village_index],
                  address: e.detail.value.address
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res);
                  // if
                  if (res.data.data.status == 0) 
                  {
                      
                  } 
                  else
                  {
                      wx.showModal({
                        title: '错误提示',
                        content: res.data.data.msg,
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
      url: '/pages/hmDoorplate/hmDoorplate',
    })
  }
})