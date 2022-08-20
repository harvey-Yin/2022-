// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    region: ["北京市", "北京市", "东城区"],
    regionID: 101010100,
    icon:999,
    text:"多云",
    temp:0,
    pressure:0,
    vis:0,
    windDir:0,
    windSpeed:0,
    windScale:0,
  },

  changeRegion: function (e) {
    this.setData({
      region: e.detail.value
    })
    this.getWeather();
  },

  //用于将城市名转化为城市id
  getRegion:function(){
    var that = this;

    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup?',
      data:{
        location:that.data.region[1],
        key:'b3247e83bb714301af7203e3f61b2d61'
      },
      success:function(res){
        // console.log(res.data),
        console.log(res.data.location[0].id),
        that.data.regionID = res.data.location[0].id
      },
    })
    
  },

  getWeather: function () {
    var that = this;
    this.getRegion();
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now?',
      data:{
        // location:that.data.region[1],
        location:that.data.regionID,
        key:'b3247e83bb714301af7203e3f61b2d61'
      },
      success:function(res){
        console.log(res.data);
        console.log(res.data.now.temp);
        that.setData({
          icon:res.data.now.icon,
          text:res.data.now.text,
          temp:res.data.now.temp,
          pressure:res.data.now.pressure,
          vis:res.data.now.vis,
          windDir:res.data.now.windDir,
          windSpeed:res.data.now.windSpeed,
          windScale:res.data.now.windScale,
        })
      },
    })
    
  },


  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
// onLoad: function(options){
//   this.getWeather();
// },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
      this.getWeather();
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})