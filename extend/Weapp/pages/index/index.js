//获取应用实例
const app = getApp()

Page({
  data: {
    domain: app.data.domain,
    userInfo: {},
    hasUserInfo: false,
    curIndex:"town",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    movies: [
      { url: '../../dist/images/1.jpg' },
      { url: '../../dist/images/2.jpg' },
      { url: '../../dist/images/3.jpg' },
    ],
    hidden: false,
    curNav: 0,
    curIndex: 1,
    cname:'town',
    navList:[
      {
        id:'0',
        cname:'town',
        name:'镇'
      },
      {
        id: '1',
        cname:'village',        
        name: '乡'
      },
    ],
    dishesList:[
      [
        {
          name: '岷阳镇',
          id: 1,
          num: 1
        },
        {
          name: '蒲麻镇',
          id: 2,
          num: 1
        },
        {
          name: '西寨镇',
          id: 3,
          num: 1
        },
        {
          name: '梅川镇',
          id: 4,
          num: 1
        },
        {
          name: '西江镇',
          id: 5,
          num: 1
        },
        {
          name: '闾静镇',
          id: 6,
          num: 1
        },
        {
          name: '十里镇',
          id:7,
          num: 1
        },
        {
          name: '茶埠镇',
          id: 8,
          num: 1
        },
        {
          name: '中寨镇',
          id: 9,
          num: 1
        },
      ],
      [
        {
          name: '清水乡',
          id: 10,
          num: 1
        },
        {
          name: '马坞乡',
          id: 11,
          num: 1
        },
        {
          name: '寺沟乡',
          id: 12,
          num: 1
        },
        {
          name: '麻子川',
          id: 13,
          num: 1
        },
        {
          name: '秦许乡',
          id: 14,
          num: 1
        },
        {
          name: '禾驮乡',
          id: 15,
          num: 1
        },
        {
          name: '维新乡',
          id: 16,
          num: 1
        },
        {
          name: '申都乡',
          id: 17,
          num: 1
        },
        {
          name: '锁龙乡',
          id: 18,
          num: 1
        },
      ],
    ],
    tabs: ["区域", "租金","房型", "更多"],
    sliderOffset: 0,
    sliderLeft: 0,
    autoplay: false,
    inputShowed: false,
    inputVal: "",
    yd:'yd',

    items: [
      {
        value:'一室',
        name:0,
        checked: false,
      },
      {
        value: '二室',
        name: 1,
        checked: false,
      },
      {
        value: '三室',
        name: 2,
        checked: false,
      },
      {
        value: '四室',
        name: 3,
        checked: false,
      },
      {
        value: '五室',
        name: 4,
        checked: false,
      },
      {
        value: '五室以上',
        name: 5,
        checked: false,
      }
    ],
    items1: [
      {
        value: '独卫',
        name: 0,
        checked: false,
      },
      {
        value: '二卫',
        name: 1,
        checked: false,
      },
      {
        value: '三卫',
        name: 2,
        checked: false,
      },
      {
        value: '三卫以上',
        name: 3,
        checked: false,
      }
    ],
    items2: [
      {
        value: '朝东',
        name: 0,
        checked: false,
      },
      {
        value: '朝西',
        name: 1,
        checked: false,
      },
      {
        value: '朝南',
        name: 2,
        checked: false,
      },
      {
        value: '朝北',
        name: 3,
        checked: false,
      },
      {
        value: '朝南北',
        name: 4,
        checked: false,
      }
    ],
    items3: [
      {
        value: '30平以下',
        name: 0,
        checked: false,
      },
      {
        value: '30-50平',
        name: 1,
        checked: false,
      },
      {
        value: '50-70平',
        name: 2,
        checked: false,
      },
      {
        value: '70-90平',
        name: 3,
        checked: false,
      },
      {
        value: '90-120平',
        name: 4,
        checked: false,
      },
      {
        value: '120-150平',
        name: 5,
        checked: false,
      },
      {
        value: '150-200平',
        name: 6,
        checked: false,
      },
      {
        value: '200-300平',
        name: 7,
        checked: false,
      },
      {
        value: '300平以上',
        name: 8,
        checked: false,
      }
    ],
    items4: [
      {
        value: '近地铁',
        name: 0,
        checked: false,
      },
      {
        value: '精装修',
        name: 1,
        checked: false,
      },
      {
        value: '新上房源',
        name: 2,
        checked: false,
      },
      {
        value: '随时看房',
        name: 3,
        checked: false,
      },
      {
        value: '有车位',
        name: 4,
        checked: false,
      }
    ],
    items5: [
      {
        value: '低楼层',
        name: 0,
        checked: false,
      },
      {
        value: '中楼层',
        name: 1,
        checked: false,
      },
      {
        value: '高楼层',
        name: 2,
        checked: false,
      }
    ],
    items6: [
      {
        value: '精装修',
        name: 0,
        checked: false,
      },
      {
        value: '普通装修',
        name: 1,
        checked: false,
      },
      {
        value: '毛坯房  ',
        name: 2,
        checked: false,
      }
    ],
    items7: [
      {
        value: '市政供暖',
        name: 0,
        checked: false,
      },
      {
        value: '自供暖',
        name: 1,
        checked: false,
      }
    ],
    items8: [
      {
        value: '有电梯',
        name: 0,
        checked: false,
      },
      {
        value: '无电梯',
        name: 1,
        checked: false,
      }
    ],
    items9: [
      {
        value: '不限',
        name: 0,
        checked: false,
      },
      {
        value: '整租',
        name: 1,
        checked: false,
      },
      {
        value: '合租',
        name: 2,
        checked: false,
      }
    ],
  },

  onLoad: function (e) {
    var that = this;
    
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
            data: {status:2,type:1},
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
                console.log(res.data.data)
                // console.log(res.data.data.hm_landlord_rent)
                
              }
              else
              {
                  that.setData({
                    hm_landlord_rent: false
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
  //左边列表选择
  selectNav(event){
     let id = event.target.dataset.id,
    index = parseInt(event.target.dataset.index);
    var  cname = event.target.dataset.cname
    console.log(cname)
     self = this;
    this.setData({
      curNav: id,
      curIndex: index,
      cname:cname
    })
    console.log(this.data.curNav)
    console.log(this.data.cname)
  },

  //点击地区搜索
  searchTap:function(e){
    var id = e.target.dataset.id
    console.log(id)
    var  index = parseInt(e.target.dataset.index)
    this.setData({
      listActive: index
    })

    wx.navigateTo({
      url: '/pages/index/index',
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

  //选取搜索条件
  checkChange:function(e){
    console.log('radio发生change事件，携带value值为：', e)
    var that = this
    that.setData({
      value: e.detail.value
    })
    var items = this.data.bedroom;
    console.log(this.data.items)
    var checkArr = e.detail.value;
    console.log(checkArr)
    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items[i].checked = false;
        console.log(items)
      } else {
        items[i].checked = true;
        console.log(items)
        
      }
    }
    this.setData({
      bedroom: items,
    }) 
  },
  //卫
  checkChangeToilet:function(e){
    console.log('radio发生change事件，携带value值为：', e)
    var that = this
    that.setData({
      value1: e.detail.value
    })
    var items1 = this.data.toilet;
    console.log(items1)
    var checkArr = e.detail.value;
    console.log(checkArr)
    for (var i = 0; i < items1.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items1[i].checked = true;
      } else {
        items1[i].checked = false;
      }
    }
    this.setData({
      toilet: items1, 
    }) 
  },
  //朝向
  checkChangeDirection: function (e) {
    console.log('radio发生change事件，携带value值为：', e)
    var that = this
    that.setData({
      value1: e.detail.value
    })
    var items2 = this.data.orientation;
    console.log(items2)
    var checkArr = e.detail.value;
    console.log(checkArr)
    for (var i = 0; i < items2.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items2[i].checked = true;
      } else {
        items2[i].checked = false;
      }
    }
    this.setData({
      orientation: items2,
    })
  },
  //面积
  checkChangeArea:function(e) {
    console.log('radio发生change事件，携带value值为：', e)
    var that = this
    that.setData({
      value1: e.detail.value
    })
    var items3 = this.data.covered_area;
    console.log(items3)
    var checkArr = e.detail.value;
    console.log(checkArr)
    for (var i = 0; i < items3.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items3[i].checked = true;
      } else {
        items3[i].checked = false;
      }
    }
    this.setData({
      covered_area: items3,
    })
  },

  //楼层
  checkChangeFloor:function(e) {
    console.log('radio发生change事件，携带value值为：', e)
    var that = this
    that.setData({
      value1: e.detail.value
    })
    var items5 = this.data.floor;
    console.log(items5)
    var checkArr = e.detail.value;
    console.log(checkArr)
    for (var i = 0; i < items5.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items5[i].checked = true;
      } else {
        items5[i].checked = false;
      }
    }
    this.setData({
      floor: items5,
    })
  },
  //装修
  checkChangeFitment: function (e) {
    console.log('radio发生change事件，携带value值为：', e)
    var that = this
    that.setData({
      value1: e.detail.value
    })
    var items6 = this.data.upfitter;
    console.log(items6)
    var checkArr = e.detail.value;
    console.log(checkArr)
    for (var i = 0; i < items6.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items6[i].checked = true;
      } else {
        items6[i].checked = false;
      }
    }
    this.setData({
      upfitter: items6,
    })
  },

  
  //方式 --单选
  checkChangeWay: function (e) {
    console.log('radio发生change事件，携带value值为：', e)
    var that = this
    that.setData({
      value1: e.detail.value
    })
    var items9 = this.data.hm_lease_manner;
    console.log(items9)
    var checkArr = e.detail.value;
    console.log(checkArr)
    for (var i = 0; i < items9.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items9[i].checked = true;
      } else {
        items9[i].checked = false;
      }
    }
    this.setData({
      hm_lease_manner: items9,
    })
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
  
    var  index = parseInt(e.target.dataset.index)
    console.log(index)
    this.setData({
      listActive: index
    })
    console.log(this.data.listActive)
  }

})
