import { host } from '../../utils/conf.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webSrc: '', //h5地址
    shareImage:'',
    shareTitle:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      webSrc: host.web+`/items/video/${options.id}`
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
  shareData:function(e){
    console.log(e)
    this.setData({
      shareImage: e.detail.data[0][0],
      shareTitle: e.detail.data[0][1]
    })
  }
})