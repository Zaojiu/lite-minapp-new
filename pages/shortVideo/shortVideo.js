import { host } from '../../utils/conf.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    vertical:true,
    constrols: false,
    hide:false,
    webSrc:'',//地址
    shareImage:'',
    sahreTitle:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      webSrc: host.web+'/items/smallVideo/'+options.id
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
  onShareAppMessage: function (options) {
    
    return {
      title: this.data.shareTitle,
      // path: options.webViewUrl,
      imageUrl: host.shareImage
    }
  },
  // 滚动切换标签样式
  switchTab: function (e) {
   console.log(e);

   
  },
  videoShare: function(e){
  
    this.setData({
      shareImage: e.detail.data[0][0],
      shareTitle: e.detail.data[0][1]
    })
  }
})