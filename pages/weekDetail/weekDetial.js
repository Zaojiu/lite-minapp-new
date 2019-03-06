import { host } from '../../utils/conf.js';
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataT: '',
    webSrc:'', //h5地址
    shareImage:'',
    shareTitle:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      webSrc:host.web+`/topic_post/${options.id}`
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
  onShareAppMessage: function (e) {
    console.log(getCurrentPages())
    return {
      title: this.data.shareTitle,
      // path: options.webViewUrl,
      imageUrl: host.shareImage
    }
  },
  msgHandler:function(e) {
   
    
    this.setData({
      shareImage: e.detail.data[0][0],
      shareTitle: e.detail.data[0][1]
    })
  }
})