// pages/ticketPurchase/ticketPurchase.js
import { host } from '../../utils/conf.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    detail:[],
    totalPrice:0,//总价
    activePrice:0,//选中票单价
    activeName:'',//选中票名称
    activeNum:0,//选中票数量
    webSrc:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

    
      this.setData({
        webSrc: host.web+`/app/events/${options.id}/tickets/purchase`
      })
   


    var that = this;
    var list = wx.request({
      url: host.api + '/api/zj/event/eventList/' + options.id, //

      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.results)

        that.setData({
          detail: res.data.results
        })
        that.setData({
          totalPrice: that.data.detail.ticketLists[0].presentPrice
        })
        that.setData({
          activeName: that.data.detail.ticketLists[0].ticketName
        })

      }
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
    var that = this;
    var list = wx.request({
      url: host.api + '/api/zj/event/eventList/' + options.id, //

      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
      }
    })
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
  // 加票 1.类型2.可购买数量3.价格4.票名称
  addTicket(){

  },
  // 减票
  reduceTicket() {

  },
  //切换票
  tabActive(e){
    console.log(e.currentTarget.dataset.index)
   
  }
})