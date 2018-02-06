Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [
      { url: '../../dist/images/u1.jpg' },
      { url: '../../dist/images/u2.jpg' },
      { url: '../../dist/images/u3.jpg' },
      { url: '../../dist/images/u4.jpg' },
      
    ],
    // gcData:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  //发布房源
  ListingServices:function(e){
    wx.navigateTo({
      url: '/pages/hmBasics/hmBasics',
    })
  }
})