var appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['岷阳镇', '蒲麻镇', '西寨镇', '清水乡', '梅川镇', '西江镇', '闾静镇', '十里镇', '茶埠镇', '中寨镇', '清水乡', '马坞乡', '寺沟乡', '麻子川', '秦许乡', '禾驮乡', '维新乡', '申都乡', '锁龙乡'],
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.WxValidate = appInstance.wxValidate(
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
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      town_village: this.data.array[e.detail.value]
    })
    //获取picker的值
    var ins = this.data.array[e.detail.value]
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

    /*
    * 查看获取的值
     */
    console.log(that.data.town_village)
    console.log(e.detail.value.address)
  
    //提交
    wx.request({
      url: '',
      data: {
        town_village: that.data.town_village,
        address: e.detail.value.address,
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
    wx.redirectTo({
      url: '/pages/hmDoorplate/hmDoorplate',
    })
  }
})