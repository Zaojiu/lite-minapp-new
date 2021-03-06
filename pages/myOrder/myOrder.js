// pages/myOrder/myOrder.js
import { host } from '../../utils/conf.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tuiTab: 0,
    dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      webSrc: host.web + `/app/we/orders`
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu();
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
  onHide:function(){
    console.log(this.route)
  },
  onUnload:function(){
    console.log(this.route)
    
  },
  switchTui: function (e) {

    this.setData({
      tuiTab: e.target.dataset.current
    })
  },
  orderList: function(){
    wx.request({
      url: host.io + '/api/wallet/order?showItems=true', //
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          dataList: res.data.result

        })
        console.log(that.data.dataList)
      }
    })
  }
})