var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
        array1: ['住宅', '别墅', '写字楼', '商铺'],
        index1: 0,
        array2: ['毛坯', '简单装修', '中等装修', '精装修', '豪华装修',],
        index2: 0,
        array3: ['东', '西', '南', '北', '东南', '东北', '东西', '西南', '西北', '南北'],
        index3: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.WxValidate = appInstance.wxValidate(
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
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value,
      housing_resource_genre: this.data.array1[e.detail.value]
    })
    //获取picker的值
    var ins = this.data.array1[e.detail.value]
    console.log('输出的是' + ins)
  },
  //装修
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value,
      decorate_degree: this.data.array2[e.detail.value]
    })
    //获取picker的值
    var ins = this.data.array2[e.detail.value]
    console.log('输出的是' + ins)
  },
  //朝向
  bindPickerChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value,
      orientation: this.data.array3[e.detail.value]
    })
    //获取picker的值
    var ins = this.data.array3[e.detail.value]
    console.log('输出的是' + ins)
  },

  formSubmit: function (e) {
    //提交错误描述
    if (!this.WxValidate.checkForm(e)) {
      console.log(e.detail)
      const error = this.WxValidate.errorList[0]
      // `${error.param} : ${error.msg} `
      wx.showToast({
        title: `${error.msg} `,
        image: '../../dist/images/error.png',
        duration: 2000
      })
      return false
    }
    this.setData({ submitHidden: false })
    var that = this

    /**
     *查看获取到的数据
     */
    console.log(that.data.housing_resource_genre)
    console.log(that.data.decorate_degree)
    console.log(that.data.orientation)    
    console.log(e.detail.value.area)
    
    //提交
    wx.request({
      url: '',
      data: {
        area: e.detail.value.area,
        habitable_room: e.detail.value.habitable_room,
        living_room: e.detail.value.living_room,
        shower_room: e.detail.value.shower_room,
      },
      method: 'POST',
      success: function (requestRes) {
        that.setData({ submitHidden: true })
        appInstance.userState.status = 0
        wx.navigateBack({
          delta: 1
        })
      },
      fail: function () {
      },
      complete: function () {
      }
    })

  },
  //下一页
  gotoNext: function () {
    console.log('是否点击有效')
    wx.redirectTo({
      url: '/pages/hmLease/hmLease',
    })
  }
})