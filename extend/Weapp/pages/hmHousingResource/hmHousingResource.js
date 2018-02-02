//获取应用实例
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //上传图片信息
    files: [],
    upFliles: []
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

    // 验证表单
    that.WxValidate = app.wxValidate(
      {
        title: {
          required: true,
          minlength: 2,
          maxlength: 100,
        },
        describe: {
          required: true,
          minlength: 2,
          maxlength: 100,
        },
        trait: {
          required: true,
          minlength: 2,
          maxlength: 100,
        },
        in_time: {
          required: true
        },
      }
      , {
        title: {
          required: '请输入房源标题',
        },  
        describe: {
          required: '请输入周边环境',
        }, 
        trait: {
          required: '请输入房源特点',
        }, 
        in_time: {
          required: '请选择入住时间',
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

  /**
   * 上传图片
   */
  chooseImage: function (e) {
    var that = this;
    if (that.data.files.length < 5) {  

      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var tempFilePaths = res.tempFilePaths
            
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
              if (res.data.status == 1) {

                app.threerdLogin();

              } else {

                // 小程序用户id
                var wuid = res.data.data;

                // 友好提示
                wx.showToast({
                  icon: "loading",
                  title: "正在上传"
                });

                // 上传
                wx.uploadFile({
                  url: app.data.domain + '/HmHousingResource/upFliles',
                  filePath: tempFilePaths[0],
                  name: 'file',
                  success: function(res){
                    var data = JSON.parse(res.data);
                    // if 
                    if (data.status == 0) {
                      that.setData({
                        files: that.data.files.concat(tempFilePaths),
                        upFliles: that.data.upFliles.concat(data.data)
                      });
                    } else {
                      wx.showModal({
                        title: '错误提示',
                        content: data.msg,
                        showCancel: false
                      })
                    }
                  },
                  fail: function (e) {
                    console.log(e);
                    wx.showModal({
                      title: '提示',
                      content: '上传失败',
                      showCancel: false
                    })
                  },
                  complete: function () {
                    wx.hideToast();  //隐藏Toast
                  }
                })

              }
            }
          })

        }
      })

    } else {

      wx.showModal({
        title: '错误提示',
        content: '最多上传5张图片',
        showCancel: false
      })

    }  

  },
  
  /**
   * 预览图片
   */
  previewImage: function (e) {
    var that = this;
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: that.data.files // 需要预览的图片http链接列表
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 表单验证
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

      return false;

    } else if (that.data.upFliles.toString() == '') {

      wx.showModal({
        title: '错误提示',
        content: '请上传环景图片',
        showCancel: false
      })

      return false;

    } else {

      console.log(e.detail);
      console.log(that.data.upFliles);

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
          if (res.data.status == 1) {

            app.threerdLogin();

          } else {

            // 小程序用户id
            var wuid = res.data.data;

            //提交
            wx.request({
              url: app.data.domain + '/HmHousingResource/add?wuid='+wuid+'&hmlrid='+that.data.hmlrid,
              data: {
                title: e.detail.value.title,
                describe: e.detail.value.describe,
                trait: e.detail.value.trait,
                in_time: e.detail.value.in_time,
                path: that.data.upFliles.toString()
              },
              method: 'POST',
              header: {
                  'content-type': 'application/json'
              },
              success: function (res) {
                console.log(res);
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
    wx.navigateTo({
      url: '/pages/hmOwner/hmOwner?hmlrid=1',
    })
  },

})