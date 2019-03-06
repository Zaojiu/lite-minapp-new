// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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
  userInfoHandler(data) {
    var _this = this;
    if (data.detail.errMsg == 'getUserInfo:ok') {

      console.log('授权成功!');
      var userInfo = data.detail.userInfo;
      wx.setStorage({
        key: 'userInfo',
        data: userInfo,
        success: function (res) {
          console.log('异步保存成功')
         
        }
      })
       app.getInfo();
      wx.switchTab({
        url: '../index/index',
      })
    } else {
     
    }
  },
})