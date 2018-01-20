//获取应用实例
var appInstance = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
    //验证码倒计时
    verifyCodeTime:'获取验证码',
    //上传图片信息
    files: [],
    formdata: '',  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.WxValidate = appInstance.wxValidate(
      {
        title: {
          required: true,
          minlength: 2,
          maxlength: 20,
        },
      }
      , {
        cname: {
          required: '请输入房源标题',
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
  //上传照片
  chooseImage: function (e) {
    var that = this;
    if (this.data.files.length < 5) {  
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        console.log(that.data.files.concat(res.tempFilePaths))
      }
    })
    }else{
      wx.showToast({
        title: '最多上传5张图片',
        icon: 'loading',
        duration: 3000
      });
    }  
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  
 

  //表单验证
 
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
    *  提交
    *  查看提交内容
    */
    console.log(e.detail.value.describe)
    console.log(e.detail.value.title)
    console.log(e.detail.value.trait)
    console.log(that.data.files)
    // picker的值
    console.log(this.data.date)
    /*
     * 发起请求
     * 
     */
    wx.request({
      url: 'https://127.0.0.1',
      data: {
        describe: e.detail.value.describe,
        title: e.detail.value.title,
        trait: e.detail.value.trait,
        hm_view_images_id: that.data.files,
        in_time: this.data.date,
      },
      method: 'POST',
      success: function (requestRes) {
        
      /**
       *  请求成功之后，跳转到下一页
       */
      // wx.navigateTo({
      //   url: '/pages/hmArea/hmArea',
      // })

      },
      fail: function (res) {
        wx.showModal({
          title: '错误',
          content: '请求失败',
        })
      },
      
    })
    
  },
  //下一页
  gotoNext:function(){
    wx.navigateTo({
      url: '/pages/hmArea/hmArea',
    })
  },

})