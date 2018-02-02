const app = getApp();
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    time: '获取验证码', //倒计时  
    currentTime:61,
    phone: false
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

    // 初始化表单
    that.WxValidate = app.wxValidate(
      {
        cname: {
          required: true,
          minlength: 2,
          maxlength: 10
        },
        phone:{
          required: true,
          tel:true
        }
      }
      , {
        cname: {
          required: '请输入姓名！',
        },
        phone:{
          required: '请输入有效的手机号码！',
        }
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

  // 获取用户输入的手机号码
  getInputPhone: function(e){
    var that = this;
    that.setData({
      phone: e.detail.value
    })
  },

  // 获取用户输入的验证码
  getInputCode: function(e){
    var that = this;
    that.setData({
      code: e.detail.value
    })
  },

  // 获取短信验证码
  getCode: function (options){
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: "剩余" + currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime:61,
          disabled: false   
        })
      }
    }, 1000)  
  },

  /**
   * 获取验证码
   */
  getVerificationCode: function (e) {
    var that = this
    // if
    if (that.isPoneAvailable(that.data.phone)) 
    {
      that.getCode();
      that.setData({
        disabled:true
      })
      // 发送短信验证码
      wx.request({
        url: app.data.domain + '/Sms/send',
        data: {
          phone: that.data.phone
        },
        header: {
            'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data)
        },
        fail: function (e) {
          console.log(e);
        }
      })
    }
    else
    {
      wx.showModal({
        title: '错误提示',
        content: '请输入有效的手机号码！',
        showCancel: false
      })
    }
  },

   // phone check
  isPoneAvailable: function (pone) {  
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;  
    if (!myreg.test(pone)) {  
      return false;  
    } else {  
      return true;  
    }  
  },

  // //获取短信验证码
  // mobileInputEvent: function (e) {
  //   this.setData({
  //     mobile: e.detail.value
  //   })
  // },
  // verifyCodeEvent: function (e) {
  //   if (this.data.buttonDisable) return false;
  //   var that = this;
  //   var c = 60;
  //   var intervalId = setInterval(function () {
  //     c = c - 1;
  //     that.setData({
  //       verifyCodeTime: c + 's后重发',
  //       buttonDisable: true
  //     })
  //     if (c == 0) {
  //       clearInterval(intervalId);
  //       that.setData({
  //         verifyCodeTime: '获取验证码',
  //         buttonDisable: false
  //       })
  //     }
  //   }, 1000)
  //   var mobile = this.data.mobile;
  //   var regMobile = /^1\d{10}$/;
  //   if (!regMobile.test(mobile)) {
  //     wx.showToast({
  //       title: '手机号有误！'
  //     })
  //     return false;
  //   }
  //   app.sendVerifyCode(function () { }, mobile);//获取短信验证码接口
  // },

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
         // 提示是否推广
          wx.showModal({
            title: '是否置顶推广',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/pay/pay',
                })
              }
            }
          })
      },
      fail: function (res) {
    
      },

    })

  },
  //跳转到支付页面
  gotoNext:function(){
    wx.redirectTo({
      url: '/pages/pay/pay',
    })
  }

})