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

    // 表单验证
    that.WxValidate = app.wxValidate(
      {
        cname: {
          required: true,
          minlength: 2,
          maxlength: 20,
        },
        building: {
          required: true,
          digits: true,
          min: 0,
          max: 100
        },
        unit: {
          required: true,
          digits: true,
          min: 0,
          max: 100
        },
        household: {
          required: true,
          digits: true,
          min: 0,
          max: 100
        },
        present_floor: {
          required: true,
          digits: true,
          min: 0,
          max: 100
        },
        total_floor: {
          required: true,
          digits: true,
          min: 0,
          max: 100
        },
      }
      , {
        cname: {
          required: '请输入小区名称',
        },
        building: {
          required: '请输入楼号',
        },
        unit: {
          required: '请输入单元号',
        },
        household: {
          required: '请输入门户号',
        },
        present_floor: {
          required: '请输入楼层',
        },
        total_floor: {
          required: '请输入总楼层',
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

  /**
   * 验证表单
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
            console.log('房源主键id：' + that.data.hmlrid);
            console.log(e.detail.value.cname)
            console.log(e.detail.value.building)
            console.log(e.detail.value.unit)
            console.log(e.detail.value.household)
            console.log(e.detail.value.present_floor)
            console.log(e.detail.value.total_floor)

            //提交
            wx.request({
              url: app.data.domain + '/HmCommunity/add?wuid='+wuid+'&hmlrid='+that.data.hmlrid,
              data: {
                cname: e.detail.value.cname,
                building: e.detail.value.building,
                unit: e.detail.value.unit,
                household: e.detail.value.household,
                present_floor: e.detail.value.present_floor,
                total_floor: e.detail.value.total_floor
              },
              method: 'POST',
              header: {
                  'content-type': 'application/json'
              },
              success: function (res) {
                // if
                if (res.data.status == 0) 
                {
                    console.log(res.data);
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
  gotoNext:function(){
    wx.redirectTo({
      url: '/pages/hmLease/hmLease?hmlrid=1',
    })
  }
})