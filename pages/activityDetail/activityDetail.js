// pages/activityDetail/activityDetail.js
var WxParse = require('../../wxParse/wxParse.js');
import { host } from '../../utils/conf.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      detail:'',
    ticketStatus:'',//票状态
    shareTitle:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //https://io.zaojiu.com/api/live/events/5bed2d841e4b400001ef8778
    this.setData({
      id:options.id
    })
    var that = this;
    var list = wx.request({
      url: host.api +'/api/zj/event/eventList/' + options.id, //
      
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
          console.log(res.data.results)

        that.setData({
          detail: res.data.results,
          shareTitle: res.data.results.title,
        })
        if(res.data.results.status == 0){
          that.setData({
            ticketStatus:'立即购票'
          })
        }else{
          that.setData({
            ticketStatus: '售票已结束'
          })
        }
        WxParse.wxParse('article', 'html', res.data.results.text, that, 5);
        console.log(that.data.detail);

      }
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
  //分享
  onShareAppMessage: function (options) {
    console.log(this.data.shareTitle);
    return {
      title: this.data.shareTitle,
      imageUrl: host.shareImage
    }
  },
  //购票
  goOrder: function(e){
    console.log(e.currentTarget.dataset.type)
    if (e.currentTarget.dataset.type == 0){
      wx.navigateTo({
        url: '../ticketPurchase/ticketPurchase?id=' + e.currentTarget.dataset.id,
      })
    }
    
  }
})