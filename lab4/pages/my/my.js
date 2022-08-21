// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:  1,
    nickName: "未登录",
    src: "/images/index1.png",
    newsList: [],
    is_Login : false,
  },

  getMyInfo: function (e) {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          src: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
          is_Login : true
        })
      }
    })
    this.getMyFavorites()
  },

  //更新number
  getMyFavorites: function () {
    let info = wx.getStorageInfoSync() //读取本地缓存信息
    console.log(info)
    let keys = info.keys //获取全部key信息 
    let num = keys.length //获取收藏新闻数量

    let myList = [];
    for (var i = 0; i < num - 1; i++) {
      let obj = wx.getStorageSync(keys[i])
      myList.push(obj)
    }
    //更新收藏列表
    this.setData({
      newsList: myList,
      number: num
    })
  },
  goToDetail: function (e) {
    //获取携带data-id的数据
    let id = e.currentTarget.dataset.id
    //console.log(e)
    //携带新闻ID进行页面跳转
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onLoad() {
 
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
    if (this.data.is_Login) {
      this.getMyFavorites()
    }
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

  
})