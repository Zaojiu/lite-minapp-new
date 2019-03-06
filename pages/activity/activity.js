// pages/activity/activity.js
import moment from '../../utils/Monment.js';
import { host } from '../../utils/conf.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    event:[],
    pageIndex:0,
    isLoading: '奋力加载中',
    isNoList:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var newDate = moment().format('YYYY-MM-DD');//当前时间
    this.getData(0);
   
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
    if (!this.data.isNoList){
      this.setData({
        pageIndex:this.data.pageIndex+1
      })
      this.getData(this.data.pageIndex)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '造就发现创造力',
      imageUrl: host.shareImage
    }
  },
  getData(pageIndex){
    var that = this;
    var list = wx.request({
      url: host.api + `/api/zj/event/eventList?pageSize=10&pageIndex=${pageIndex}`, 
      data: {
        even: [],
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var list = res.data.results.items;
       that.more(list)
        for (var i = 0; i < list.length; i++) {
          that.data.event.push(list[i]);
        }
        that.setData({
          event: that.data.event,
         

        })
      }
    })
  },
  //加载更多
  more: function (len) {
    console.log(len);
    if (len == 0 | len == undefined) {
      this.setData({
        isNoList: true,
        isLoading: '暂无更多'
      })
      return;
    } else {
      this.setData({
        isNoList: false,
        isLoading: '奋力加载中'
      })
    }
  },
  getDetail(event){
    console.log(event.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../activityDetail/activityDetail?id=' + event.currentTarget.dataset.id,
    })

  }
})