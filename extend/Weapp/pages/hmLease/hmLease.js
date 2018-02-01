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
    var that = this;

    // 房源模块房东出租表主键id
    that.setData({
      hmlrid: options.hmlrid
    })

    // 请求租赁数据
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
            url: app.data.domain + '/HmLease/index?wuid='+wuid,
            data: {},
            method: 'GET',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
              // if 
              if (res.data.status == 0) 
              {
                  that.setData({
                    hm_lease_manner_cname: res.data.data.hm_lease_manner.cname,
                    hm_lease_manner_id: res.data.data.hm_lease_manner.id,
                    hm_lease_manner_index: 0,
                    hm_payment_method_cname: res.data.data.hm_payment_method.cname,
                    hm_payment_method_id: res.data.data.hm_payment_method.id,
                    hm_payment_method_index: 0,
                    hm_ancillary_facility: res.data.data.hm_ancillary_facility
                  })
              }
              else
              {
                  wx.showModal({
                    title: '提示',
                    content: '请点击确定重新载入！',
                    showCancel: false,
                    success: function(res) {
                      if (res.confirm) {
                        wx.reLaunch({
                          url: 'pages/index/index'
                        })
                      }
                    }
                  })
              }
            },
            fail: function (e) {
              console.log(e);
            }
          })
        }
      }
    })

    // 表单验证
    that.WxValidate = app.wxValidate(
      {
        rent: {
          required: true,
          digits: true,
          min: 1,
        },
        hm_ancillary_facility: {
          required: true
        }
      }
      , {
        rent: {
          required: '请输入期望租金',
        },
        hm_ancillary_facility: {
          required: '请选择配套设施',
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
    var that = this;
    that.setData({
      hm_lease_manner_index: e.detail.value
    })
  },

  //付款方式
  bindPickerChange2: function (e) {
    var that = this;
    that.setData({
      hm_payment_method_index: e.detail.value
    })
  },

  /** 
   * 房屋配套
   */
  checkboxChange:function(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  /**
   * 验证表单
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
      return false
    } else {
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
            if (res.data.status == 1) 
            {
              app.threerdLogin();
            }
            else
            {
              // 小程序用户id
              var wuid = res.data.data;

              console.log('小程序用户id：' + wuid);
              console.log('hmlrid：' + that.data.hmlrid);
              console.log('hm_lease_manner_id：' + that.data.hm_lease_manner_id[e.detail.value.hm_lease_manner_index]);
              console.log('hm_payment_method_id：' + that.data.hm_payment_method_id[e.detail.value.hm_payment_method_index]);
              console.log('hm_ancillary_facility：' + e.detail.value.hm_ancillary_facility.toString());
              console.log('rent：' + e.detail.value.rent);

              //提交
              wx.request({
                url: app.data.domain + '/HmLease/add?wuid='+wuid+'&hmlrid='+that.data.hmlrid,
                data: {
                  hm_lease_manner_id: that.data.hm_lease_manner_id[e.detail.value.hm_lease_manner_index],
                  hm_payment_method_id: that.data.hm_payment_method_id[e.detail.value.hm_payment_method_index],
                  hm_ancillary_facility: e.detail.value.hm_ancillary_facility.toString(),
                  rent: e.detail.value.rent
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                  // if
                  if (res.data.status == 0) 
                  {
                      console.log(res.data);
                  } 
                  else
                  {
                      wx.showModal({
                        title: '错误提示',
                        content: res.data.msg,
                        showCancel: false
                      })
                  }
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
  gotoNext: function () {
    wx.redirectTo({
      url: '/pages/services/services?hmlrid=1',
    })
  }
})