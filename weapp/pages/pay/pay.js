//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取用户登录信息
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    payList:[
      {
        id:1,
        num:'1天/3元',
        cost: 3
      },
      {
        id:2,
        num: '3天/7元',
        cost: 7
      },
      {
        id:3,
        num: '7天/18元',
        cost: 18
      },
      {
        id:4,
        num: '15天/35元',
        cost: 35
      },
      {
        id:5,
        num: '30天/60元',
        cost: 60
      },
    ],
    curNav: 1,
    curIndex: 0,
    cost:0,
    customArray: ['自定义天数', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }

      })
    }
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
  //选取金额
  payTap:function(e){
    let id = e.target.dataset.id,
    index = parseInt(e.target.dataset.index)
    var cost = e.target.dataset.cost
    console.log(cost)
    this.setData({
      curNav: id,
      curIndex: index,
      cost: cost
    })
  },
  bindPickerCustom: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var cost = parseInt(this.data.customArray[e.detail.value]*3)
    console.log(cost)
    this.setData({
      index: e.detail.value,
      cost : cost
    })
  },
  //调用支付接口
  gotoPay:function(e){
    var that = this;
    //查看获取用户登录信息
    console.log(that.data.userInfo)
    var cost = e.target.dataset.cost
    that.setData({
      loading:true
    })
  }
})