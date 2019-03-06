import { host } from '../../utils/conf.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      webSrc:'',
      typeId:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断1.登录2.会员
   var vipT = wx.getStorageSync("member");
    
    if (vipT.valid){
      if (vipT.memberId === "member-mars") { //火星
        this.setData({
          typeId: 1,
          webSrc: host.web + `/w-member/card`
        })
      } else if (vipT.memberId === "member-aia-mars") { //联名
        this.setData({
          typeId: 2,
          webSrc: host.web + `/w-member/card`
        })
      }else{ //普通
        this.setData({
          typeId: 0,
          webSrc: host.web + `/w-member/card`
        })
      } 
    }else{
      this.setData({
        typeId: -1,
        webSrc: host.web + `/w-member/action`
      })
    }
    // setInterval(function () {
     
    //   console.log(getCurrentPages())
    //   },1000);
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.hideShareMenu();
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
    app.getDetail();
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
  onShareAppMessage: function (options) {
    console.log(options)
  }
})