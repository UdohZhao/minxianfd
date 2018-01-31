//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    movies: [
      { url: '../../dist/images/1.jpg' },
      { url: '../../dist/images/2.jpg' },
      { url: '../../dist/images/3.jpg' },
    ],
    hidden: false,
    curNav: 1,
    curIndex: 0,
    navList:[
      {
        id:1,
        name:'热门'
      },
      {
        id: 2,
        name: '镇'
      },
      {
        id: 3,
        name: '乡'
      },
    ],
    dishesList:[
      [
        {
          name:'岷阳镇',
          id:1,
          num:1,
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
          name: '清水乡',
          id: 10,
          num: 1
        },
        {
          name: '马坞乡',
          id: 11,
          num: 1
        }
      ],
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
    tabs: ["区域", "租金","类型", "更多"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    autoplay: false,
    inputShowed: false,
    inputVal: "",
    yd:'yd',
    objArray:[
        {
          array: ['不限', '东', '西', '南', '北', '东南', '东北', '东西', '西南', '西北', '南北'],
          index:0,
          name: '朝向'
        },  
        {
          array: ['不限', '低', '中', '高'],
          index: 0,
          name:'楼层'
        },
        {
          array: ['不限', '毛坯', '简单装修', '中等装修', '精装修', '豪华装修',],
          index: 0,
          name:'装修'
        },
        {
          array: ['不限', '一室', '二室', '三室', '四室', '五室', '五室以上'],
          index: 0,
          name:'居室'
        },
        {
          array: ['不限', '整租', '合租', '短租'],
          index: 0,
          name:'方式'
        },
        {
          array: ['不限', '60㎡以下', '60~70㎡', '70~80㎡', '70~80㎡', '80~90㎡', '90~100㎡', '100~120㎡', '120㎡以上'],
          index: 0,
          name:'面积'
        },
    ],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },
  //左边列表选择
  selectNav(event){
     let id = event.target.dataset.id,
    index = parseInt(event.target.dataset.index)
     self = this;
    this.setData({
      curNav: id,
      curIndex: index
    })
  },
  //点击地区搜索
  searchTap:function(e){
    var id = e.target.dataset.id
    console.log(id)
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

})
