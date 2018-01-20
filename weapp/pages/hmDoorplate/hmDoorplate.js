var appInstance = getApp();
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
    this.WxValidate = appInstance.wxValidate(
      {
        cname: {
          required: true,
          minlength: 2,
          maxlength: 20,
        },
        building: {
          required: true,
          digits: true,
          number: true,
          min: 0,
          max: 1000
        },
        unit: {
          required: true,
          digits: true,
          number: true,
          min: 0,
          max: 100
        },
        household: {
          required: true,
          digits: true,
          number: true,
          min: 0,
          max: 100
        },
        present_floor: {
          required: true,
          digits: true,
          number: true,
          min: 0,
          max: 100
        },
        total_floor: {
          required: true,
          digits: true,
          number: true,
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
    //提交
    /**
     * 看出获取的值
     */
    console.log(e.detail.value.cname)
    console.log(e.detail.value.building)
    console.log(e.detail.value.unit)
    console.log(e.detail.value.household)
    console.log(e.detail.value.present_floor)
    console.log(e.detail.value.total_floor)
    /**
     * 发起请求
     */
    wx.request({
      url: '',
      data: {
        Realname: e.detail.value.name,
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
  gotoNext:function(){
    wx.redirectTo({
      url: '/pages/hmBasics/hmBasics',
    })
  }
})