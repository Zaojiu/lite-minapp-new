// pages/longVideo/longVideo.js
const innerAudio = wx.createInnerAudioContext();
const innerVideo ='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    muted:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    innerAudio.src ='https://zaojiu.ku6.com/media/lt8PaikaJnYMTStM-25vG5c7c0_J?e=1543251600&token=Qa9nc-s0Ye2U8iHKefkJW4APRQZ_npOKUB9JUO5b:Lx3UDueOsJ39ZqRS4HziShbWRbk';
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.innerVideo = wx.createVideoContext('video');
    console.log(this.innerVideo);
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
  playTab:function(){
    
    // this.setData({
    //   muted:true
    // })
    
  }
})