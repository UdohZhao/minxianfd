var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array1: ['整租', '合租', '短租'],
    index1: 0,
    array2: ['押一付三', '押一付二', '押一付一', '押二付一', '半年付', '年付', '面议'],
    index2: 0,
    items: [
      { name: 'CHA', value: '床' },
      { name: 'BIX', value: '冰箱' },
      { name: 'XYJ', value: '洗衣机' },
      { name: 'XZF', value: '可做饭' },
      { name: 'WYF', value: '包物业费' },
      { name: 'JZG', value: '集中供暖' },
      { name: 'KTI', value: '空调' },
      { name: 'SHF', value: '沙发' },
      { name: 'WSJ', value: '独立卫生间' },
      { name: 'QNF', value: '包取暖费' },
      { name: 'DSJ', value: '电视' },
      { name: 'RSQ', value: '热水器' },
      { name: 'YIG', value: '衣柜' },
      { name: 'YAT', value: '阳台' },
    ],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.WxValidate = app.wxValidate(
      {
        rent: {
          required: true,
          digits: true,
          number: true,
          min: 0,
        },
      }
      , {
        rent: {
          required: '请输入期望租金',
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
  //出租方式
  bindPickerChange1: function (e) {
    this.setData({
      index1: e.detail.value,
      id1:1
    })
  },
  //付款方式
  bindPickerChange2: function (e) {
    this.setData({
      index2: e.detail.value,
      id2: 2
    })
  },
  checkboxChange:function(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      hm_ancillary_facility:e.detail.value
    })
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
     * 查看获取到的数据
     */
    console.log(that.data.id1)
    console.log(that.data.id2)
    console.log(e.detail.value.rent)
    console.log(that.data.hm_ancillary_facility)
    wx.request({
      url: '',
      data: {
        rent: e.detail.value.rent,
      },
      method: 'POST',
      success: function (requestRes) {
        that.setData({ submitHidden: true })
        app.userState.status = 0
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
      url: '/pages/services/services?hmlrid=1',
    })
  }
})