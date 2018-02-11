//获取应用实例
const app = getApp()
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    domain: app.data.domain,
    userInfo: {},
    hasUserInfo: false,
    curIndex:"town",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    movies: [
      { url: '../../dist/images/i1.jpg' },
      { url: '../../dist/images/i2.jpg' },
      { url: '../../dist/images/i3.jpg' },
    ],
    hidden: false,
    curNav: 0,
    curIndex: 1,
    minxianename:'town',
    minxian:[
      {
        index: 0,
        minxianename: 'town',
        cname:'镇'
      },
      {
        index: 1,  
        minxianename: 'village',      
        cname: '乡'
      },
    ],
    tabs: ["区域", "租金","户型", "更多"],
    sliderOffset: 0,
    sliderLeft: 0,
    autoplay: false,
    inputShowed: false,
    inputVal: "",
    yd:'yd',
    // 岷县左侧active标示
    minxianIndex: 0,
    // 默认镇数据
    minxianename: 'town',
    // 获取用户地理位置
    address: '获取地理位置中'
  

  },

  onLoad: function (options) {
    var that = this;

    // 实例化API核心类
    qqmapsdk = new QQMapWX({
        key: 'TQIBZ-WXKCO-RLCWU-SLTK3-FYZ43-7LBEY'
    });

    // 获取地理位置
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res);
        // 调用接口
        qqmapsdk.reverseGeocoder({
            location: {
                latitude: res.latitude,
                longitude: res.longitude
            },
            coord_type: 3,
            success: function(res) {
                console.log(res);
                that.setData({
                  address: res.result.address
                });
            },
            fail: function(res) {
                console.log(res);
            },
            complete: function(res) {

            }
        });
      }
    })

    // 良好的用户体验
    wx.showLoading({
      title: '获取中',
    })
    
    // 请求岷县数据
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
            url: app.data.domain + '/HmLandlordRent/index?wuid='+wuid,
            data: {status:2,type:1,retype:0},
            method: 'GET',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res);
              // if 
              if (res.data.status == 0) 
              { 
                  that.setData({
                    rent:res.data.data.rent,
                    bedroom:res.data.data.bedroom,
                    covered_area:res.data.data.covered_area,
                    floor:res.data.data.floor,
                    toilet:res.data.data.toilet,
                    orientation:res.data.data.orientation,
                    hm_lease_manner:res.data.data.hm_lease_manner,
                    housing_resource_genre:res.data.data.housing_resource_genre,
                    upfitter:res.data.data.upfitter,
                    hm_min_xian:res.data.data.hm_min_xian,
                    //详情列表数据
                    hm_landlord_rent:res.data.data.hm_landlord_rent
                  })
                  
              } 
              else
              {
                  that.setData({
                    hm_landlord_rent: false
                  })
              }

              // 良好的用户体验
              setTimeout(function(){
                wx.hideLoading()
              },2000)

            },
            fail: function (e) {
              console.log(e);
            }
          })
        }
      }
    })

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

  tabClick: function (e) {
    this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id,
        showModalStatus: true
    });
  },

  /**
   * 隐藏遮罩层
   */
  hideModal: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      activeIndex:'-1'
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  //去房屋详情
  gotoDetail:function(e){
      // 获取hmlrid
      var hmlrid = e.currentTarget.dataset.hmlrid;
      wx.navigateTo({
        url: '/pages/detail/detail?hmlrid=' + hmlrid
      })
  },

  // 区域左边列表选择
  selectMinxian(e){
    var that = this;

    var minxianIndex = e.target.dataset.index;
    var minxianename = e.target.dataset.minxianename;

    that.setData({
      minxianIndex: minxianIndex,
      minxianename: minxianename
    })

  },

  // 搜索条件区域岷县id
  selectMinxianId:function(e){
    var that = this;
    that.setData({
      hm_min_xian_id: e.target.dataset.id
    })
    // 获取区域岷县id
    console.log('获取区域岷县id：' + that.data.hm_min_xian_id);


    // 良好的用户体验
    wx.showLoading({
      title: '筛选中',
    })

    // 请求岷县数据
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
            url: app.data.domain + '/HmLandlordRent/index?wuid='+wuid+'&status=2&type=1&retype=0',
            data: {hm_min_xian_id:that.data.hm_min_xian_id},
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res);
              // if 
              if (res.data.status == 0) 
              { 
                  that.setData({
                    //详情列表数据
                    hm_landlord_rent:res.data.data.hm_landlord_rent
                  })
              }
              else
              {
                  that.setData({
                    hm_landlord_rent: false
                  })
              }

              // 良好的用户体验
              setTimeout(function(){
                wx.hideLoading()
              },2000)

            },
            fail: function (e) {
              console.log(e);
            }
          })
        }
      }
    })


  },

  //去定位搜索
  gotoLocation:function(e){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  bindPickerChange: function (e) {
    // 定义一个变量curindex 储存触发事件的数组对象的下标
    const curindex = e.target.dataset.current
    // 根据下标 改变该数组对象中的index值
    this.data.objArray[curindex].index = e.detail.value
    // 把改变某个数组对象index值之后的全新objArray重新 赋值给objArray
    this.setData({
      objArray: this.data.objArray
    })
  },

  /**
   * 卧室事件
   */
  checkChangeBedroom:function(e){
    var that = this

    // 获取选中下标
    var checkedIndex = e.detail.value;

    console.log(checkedIndex);

    // checked赋值为false
    for (var i = 0; i < that.data.bedroom.length; i++) {
       that.data.bedroom[i].checked = false;
    }

    var bedroomCheckedValue = [];
    // checked赋值为true
    for (var i = 0; i < checkedIndex.length; i++) {
       that.data.bedroom[checkedIndex[i]].checked = true;
       bedroomCheckedValue.push(that.data.bedroom[checkedIndex[i]].value);
    }

    that.setData({
        bedroom: that.data.bedroom,
        bedroomCheckedValue: bedroomCheckedValue
    })

    console.log('获取卧室CheckedValue：' + that.data.bedroomCheckedValue);

  },

  /**
   * 卫生间事件
   */
  checkChangeToilet:function(e){
    var that = this

    // 获取选中下标
    var checkedIndex = e.detail.value;

    console.log(checkedIndex);

    // checked赋值为false
    for (var i = 0; i < that.data.toilet.length; i++) {
       that.data.toilet[i].checked = false;
    }

    var toiletCheckedValue = [];
    // checked赋值为true
    for (var i = 0; i < checkedIndex.length; i++) {
       that.data.toilet[checkedIndex[i]].checked = true;
       toiletCheckedValue.push(that.data.toilet[checkedIndex[i]].value);
    }

    that.setData({
        toilet: that.data.toilet,
        toiletCheckedValue: toiletCheckedValue
    })

    console.log('获取卫生间CheckedValue：' + that.data.toiletCheckedValue);

  },


  /**
   * 朝向事件
   */
  checkChangeOrientation:function(e){
    var that = this

    // 获取选中下标
    var checkedIndex = e.detail.value;

    console.log(checkedIndex);

    // checked赋值为false
    for (var i = 0; i < that.data.orientation.length; i++) {
       that.data.orientation[i].checked = false;
    }

    var orientationCheckedValue = [];
    // checked赋值为true
    for (var i = 0; i < checkedIndex.length; i++) {
       that.data.orientation[checkedIndex[i]].checked = true;
       orientationCheckedValue.push(that.data.orientation[checkedIndex[i]].value);
    }

    that.setData({
        orientation: that.data.orientation,
        orientationCheckedValue: orientationCheckedValue
    })

    console.log('获取朝向CheckedValue：' + that.data.orientationCheckedValue);

  },



  /**
   * 建筑面积（平方米）
   */
  checkChangeCoveredArea:function(e){
    var that = this

    // 获取选中下标
    var checkedIndex = e.detail.value;

    console.log(checkedIndex);

    // checked赋值为false
    for (var i = 0; i < that.data.covered_area.length; i++) {
       that.data.covered_area[i].checked = false;
    }

    var coveredAreaCheckedValue = [];
    // checked赋值为true
    for (var i = 0; i < checkedIndex.length; i++) {
       that.data.covered_area[checkedIndex[i]].checked = true;
       coveredAreaCheckedValue.push(that.data.covered_area[checkedIndex[i]].value);
    }

    that.setData({
        covered_area: that.data.covered_area,
        coveredAreaCheckedValue: coveredAreaCheckedValue
    })

    console.log('获取建筑面积（平方米）CheckedValue：' + that.data.coveredAreaCheckedValue);

  },

  /**
   * 楼层事件
   */
  checkChangeFloor:function(e){
    var that = this

    // 获取选中下标
    var checkedIndex = e.detail.value;

    console.log(checkedIndex);

    // checked赋值为false
    for (var i = 0; i < that.data.floor.length; i++) {
       that.data.floor[i].checked = false;
    }

    var floorCheckedValue = [];
    // checked赋值为true
    for (var i = 0; i < checkedIndex.length; i++) {
       that.data.floor[checkedIndex[i]].checked = true;
       floorCheckedValue.push(that.data.floor[checkedIndex[i]].value);
    }

    that.setData({
        floor: that.data.floor,
        floorCheckedValue: floorCheckedValue
    })

    console.log('获取楼层CheckedValue：' + that.data.floorCheckedValue);

  },


  /**
   * 装修事件
   */
  checkChangeUpfitter:function(e){
    var that = this

    // 获取选中下标
    var checkedIndex = e.detail.value;

    console.log(checkedIndex);

    // checked赋值为false
    for (var i = 0; i < that.data.upfitter.length; i++) {
       that.data.upfitter[i].checked = false;
    }

    var upfitterCheckedValue = [];
    // checked赋值为true
    for (var i = 0; i < checkedIndex.length; i++) {
       that.data.upfitter[checkedIndex[i]].checked = true;
       upfitterCheckedValue.push(that.data.upfitter[checkedIndex[i]].value);
    }

    that.setData({
        upfitter: that.data.upfitter,
        upfitterCheckedValue: upfitterCheckedValue
    })

    console.log('获取装修CheckedValue：' + that.data.upfitterCheckedValue);

  },

  /**
   * 出租方式事件
   */
  checkChangeManner: function (e) {
    var that = this

    // 获取选中下标
    var checkedIndex = e.detail.value;

    console.log(checkedIndex);

    // checked赋值为false
    for (var i = 0; i < that.data.hm_lease_manner.length; i++) {
       that.data.hm_lease_manner[i].checked = false;
    }

    var hmLeaseMannerCheckedValue = [];
    // checked赋值为true
    for (var i = 0; i < checkedIndex.length; i++) {
       that.data.hm_lease_manner[checkedIndex[i]].checked = true;
       hmLeaseMannerCheckedValue.push(that.data.hm_lease_manner[checkedIndex[i]].cname);
    }

    that.setData({
        hm_lease_manner: that.data.hm_lease_manner,
        hmLeaseMannerCheckedValue: hmLeaseMannerCheckedValue
    })

    console.log('获取出租方式CheckedValue：' + that.data.hmLeaseMannerCheckedValue);

  },

  //重置 房型
  reset:function(e){
    var style = this.data.bedroom
    for (var i = 0; i < style.length; i++){
      style[i].checked = false;
    }
    this.setData({
      bedroom: style,
    })
    var style2 = this.data.toilet
    for (var i = 0; i < style2.length; i++) {
      style2[i].checked = false;
    }
    this.setData({
      toilet: style2,
    })
  },

  //重置 更多
  resetMore:function(e){
    //朝向
    var resetMore2 = this.data.orientation
    for (var i = 0; i < resetMore2.length; i++) {
      resetMore2[i].checked = false;
    }
    //建筑面积
    var resetMore3 = this.data.covered_area
    for (var i = 0; i < resetMore3.length; i++) {
      resetMore3[i].checked = false;
    }
   
    //楼层
    var resetMore5 = this.data.floor
    for (var i = 0; i < resetMore5.length; i++) {
      resetMore5[i].checked = false;
    }
    //装修
    var resetMore6 = this.data.upfitter
    for (var i = 0; i < resetMore6.length; i++) {
      resetMore6[i].checked = false;
    }
    
    //方式
    var resetMore9 = this.data.hm_lease_manner
    for (var i = 0; i < resetMore9.length; i++) {
      resetMore9[i].checked = false;
    }
    this.setData({
      orientation: resetMore2,
      covered_area: resetMore3,
      floor: resetMore5,
      upfitter: resetMore6,
      hm_lease_manner: resetMore9,
      
    })

  },

  // 租金tap事件
  tapRent: function (e) {
    var that = this;
    that.setData({
      rentIndex: parseInt(e.target.dataset.index),
      rentStart: e.target.dataset.start,
      rentEnd: e.target.dataset.end
    })

    console.log('获取租金开始：' + that.data.rentStart);
    console.log('获取租金结束：' + that.data.rentEnd);

    // 良好的用户体验
    wx.showLoading({
      title: '筛选中',
    })

    // 请求岷县数据
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
            url: app.data.domain + '/HmLandlordRent/index?wuid='+wuid+'&status=2&type=1&retype=0',
            data: {rentStart:that.data.rentStart,rentEnd:that.data.rentEnd},
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res);
              // if 
              if (res.data.status == 0) 
              { 
                  that.setData({
                    //详情列表数据
                    hm_landlord_rent:res.data.data.hm_landlord_rent
                  })
              }
              else
              {
                  that.setData({
                    hm_landlord_rent: false
                  })
              }

              // 良好的用户体验
              setTimeout(function(){
                wx.hideLoading()
              },2000)

            },
            fail: function (e) {
              console.log(e);
            }
          })
        }
      }
    })

  },

  /**
   * 房型搜索条件
   */
  houseTypeSearch: function (e) {
    var that = this;

    var bedroomCheckedValue;
    if (that.data.bedroomCheckedValue == undefined || that.data.bedroomCheckedValue == []) 
    {
        bedroomCheckedValue = false;
    }
    else 
    {
        bedroomCheckedValue = that.data.bedroomCheckedValue
    } 

    var toiletCheckedValue;
    if (that.data.toiletCheckedValue == undefined || that.data.toiletCheckedValue == []) 
    {
        toiletCheckedValue = false;
    }
    else 
    {
        toiletCheckedValue = that.data.toiletCheckedValue
    }

    // if

    if (bedroomCheckedValue == false && toiletCheckedValue == false) 
    {
          wx.showModal({
            title: '提示',
            content: '请选中筛选的条件！',
            showCancel: false
          })
    }
    else 
    {

        // 获取卧室选中值
        console.log(bedroomCheckedValue);
        // 获取卫生间选中的值
        console.log(toiletCheckedValue);

        bedroomCheckedValue = bedroomCheckedValue.toString();
        toiletCheckedValue = toiletCheckedValue.toString();

        // 良好的用户体验
        wx.showLoading({
          title: '筛选中',
        })

        // 请求岷县数据
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
                url: app.data.domain + '/HmLandlordRent/index?wuid='+wuid+'&status=2&type=1&retype=0',
                data: {bedroomCheckedValue:bedroomCheckedValue,toiletCheckedValue:toiletCheckedValue},
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res);
                  // if 
                  if (res.data.status == 0) 
                  { 
                      that.setData({
                        //详情列表数据
                        hm_landlord_rent:res.data.data.hm_landlord_rent
                      })
                  }
                  else
                  {
                      that.setData({
                        hm_landlord_rent: false
                      })
                  }

                  // 良好的用户体验
                  setTimeout(function(){
                    wx.hideLoading()
                  },2000)

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

  /**
   * 更多搜索条件
   */
  moreSearch: function (e) {
    var that = this;

    var orientationCheckedValue;
    if (that.data.orientationCheckedValue == undefined || that.data.orientationCheckedValue == []) 
    {
        orientationCheckedValue = 'false';
    }
    else
    {
        orientationCheckedValue = that.data.orientationCheckedValue;
    }

    // var coveredAreaCheckedValue;
    // if (that.data.coveredAreaCheckedValue == undefined || that.data.coveredAreaCheckedValue == []) 
    // {
    //     coveredAreaCheckedValue = false;
    // }
    // else
    // {
    //     coveredAreaCheckedValue = that.data.coveredAreaCheckedValue;
    // }

    // var floorCheckedValue;
    // if (that.data.floorCheckedValue == undefined || that.data.floorCheckedValue == []) 
    // {
    //     floorCheckedValue = false;
    // }
    // else
    // {
    //     floorCheckedValue = that.data.floorCheckedValue;
    // }

    var upfitterCheckedValue;
    if (that.data.upfitterCheckedValue == undefined || that.data.upfitterCheckedValue == []) 
    {
        upfitterCheckedValue = 'false';
    }
    else
    {
        upfitterCheckedValue = that.data.upfitterCheckedValue;
    }

    var hmLeaseMannerCheckedValue;
    if (that.data.hmLeaseMannerCheckedValue == undefined || that.data.hmLeaseMannerCheckedValue == []) 
    {
        hmLeaseMannerCheckedValue = 'false';
    }
    else
    {
        hmLeaseMannerCheckedValue = that.data.hmLeaseMannerCheckedValue;
    }

    // 筛选条件
    if (orientationCheckedValue == 'false' && upfitterCheckedValue == 'false' && hmLeaseMannerCheckedValue == 'false') 
    {
          wx.showModal({
            title: '提示',
            content: '请选中筛选的条件！',
            showCancel: false
          })
    }
    else
    {

          // 获取朝向选中值
          console.log(orientationCheckedValue);
          // 获取建筑面积选中值
          // console.log(coveredAreaCheckedValue);
          // 获取楼层选中值
          // console.log(floorCheckedValue);
          // 获取装修选中值
          console.log(upfitterCheckedValue);
          // 获取出租方式选中值
          console.log(hmLeaseMannerCheckedValue);

          // 良好的用户体验
          wx.showLoading({
            title: '筛选中',
          })

          // 请求岷县数据
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
                  url: app.data.domain + '/HmLandlordRent/index?wuid='+wuid+'&status=2&type=1&retype=0',
                  data: {
                    orientationCheckedValue:orientationCheckedValue.toString(),
                    upfitterCheckedValue:upfitterCheckedValue.toString(),
                    hmLeaseMannerCheckedValue:hmLeaseMannerCheckedValue.toString()
                  },
                  method: 'POST',
                  header: {
                      'content-type': 'application/json'
                  },
                  success: function (res) {
                    console.log(res);
                    // if 
                    if (res.data.status == 0) 
                    { 
                        that.setData({
                          //详情列表数据
                          hm_landlord_rent:res.data.data.hm_landlord_rent
                        })
                    }
                    else
                    {
                        that.setData({
                          hm_landlord_rent: false
                        })
                    }

                    // 良好的用户体验
                    setTimeout(function(){
                      wx.hideLoading()
                    },2000)

                  },
                  fail: function (e) {
                    console.log(e);
                  }
                })
              }
            }
          })
    }

  }

})
