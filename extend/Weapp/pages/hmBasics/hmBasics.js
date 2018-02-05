var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      housing_resource_genre: ['其它', '住宅', '别墅', '写字楼', '商铺'],
      housing_resource_genre_index: 0,
      decorate_degree: ['其它', '豪华装修', '精装修', '中等装修', '简装修', '毛坯',],
      decorate_degree_index: 0,
      orientation: ['南北', '南', '东南', '东', '西南', '北', '西', '东西', '东北', '西北'],
      orientation_index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 初始化表单验证
    that.WxValidate = app.wxValidate(
      {
        habitable_room: {
          required: true,
          digits: true,
          min: 0,
          max: 20
        },
        living_room: {
          required: true,
          digits: true,
          min: 0,
          max: 20
        },
        shower_room: {
          required: true,
          digits: true,
          min: 0,
          max: 20
        },
        area: {
          required: true,
          digits: true,
          number: true,
          min: 0,
          max:1000
        },
      }
      , {
        habitable_room: {
          required: '请输入几室',
        },
        living_room: {
          required: '请输入几厅',
        },
        shower_room: {
          required: '请输入几卫',
        },
        household: {
          required: '请输入门户号',
        },
        area: {
          required: '请输入房屋面积',
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
  // 房源类型
  bindPickerChange1: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      housing_resource_genre_index: e.detail.value,
    })
  },
  //装修
  bindPickerChange2: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      decorate_degree_index: e.detail.value
    })
  },
  //朝向
  bindPickerChange3: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      orientation_index: e.detail.value
    })
  },

  // 表单提交
  formSubmit: function (e) {
    var that = this;

    // 提交错误描述
    if (!that.WxValidate.checkForm(e)) {
      console.log(e.detail)
      const error = that.WxValidate.errorList[0]
      // `${error.param} : ${error.msg} `
      // wx.showToast({
      //   title: `${error.msg} `,
      //   image: '../../dist/images/error.png',
      //   duration: 2000
      // })
      wx.showModal({
        title: '错误提示',
        content: `${error.msg} `,
        showCancel: false
      })
      return false
    } else {
        // 3rd_session
        console.log(wx.getStorageSync('3rd_session'))
        
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
                url: app.data.domain + '/HmBasics/add?wuid='+wuid,
                data: {
                  housing_resource_genre: that.data.housing_resource_genre_index,
                  decorate_degree: that.data.decorate_degree_index,
                  orientation: that.data.orientation_index,
                  area: e.detail.value.area,
                  habitable_room: e.detail.value.habitable_room,
                  living_room: e.detail.value.living_room,
                  shower_room: e.detail.value.shower_room
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res);
                  console.log('请求成功')
                },
                fail: function (e) {
                  console.log(e);
                  console.log('请求失败')
                  
                }
              })
            }
          }
        })
    }

    // that.setData({ submitHidden: false })

    /**
     *查看获取到的数据
     */
    // console.log(that.data.housing_resource_genre_index)
    // console.log(that.data.decorate_degree_index)
    // console.log(that.data.orientation_index)
    // console.log(e.detail.value.habitable_room)
    // console.log(e.detail.value.living_room)
    // console.log(e.detail.value.shower_room)    
    // console.log(e.detail.value.area)

  },
  //下一页
  gotoNext: function () {
    wx.redirectTo({
      url: '/pages/hmArea/hmArea?hmlrid=1'
    })
  }
})