// pages/minte/minte.js
import { host } from '../../utils/conf.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userImage:'',
    userName:'' ,
    isUser:true,
    isVip:false,//是否为VIP
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.获取用户信息
    //2.是否为会员
    this.showUser();
    var vipT = wx.getStorageSync("member");
    if(vipT.valid){
      this.setData({
        isVip:true
      })
    }else{
      this.setData({
        isVip: false
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
 
  showUser(){
    var _this = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        console.log(res)
        _this.setData({
          userImage: res.data.avatarUrl,
          userName: res.data.nickName,
          isUser:false
        })

      }
    })
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var _this = this;
    //模拟加载
    setTimeout(function () {
      // complete
      app.getDetail();
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
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
    return {
      title: '造就发现创造力',
      imageUrl: host.shareImage
    }
  },
  userInfoHandler(data) {
    var _this = this;
    if (data.detail.errMsg == 'getUserInfo:ok') {
      console.log('授权成功!');
      console.log(data);
      var userInfo = data.detail.userInfo;
      wx.setStorage({
        key: 'userInfo',
        data: userInfo,
        success: function (res) {
          console.log('异步保存成功')
        }
      })
      this.showUser();

    } else {
      this.getIsShowUserInfo()
    }
  },
  //是否获取授权
  getIsShowUserInfo() {

  },
  onGotUserInfo: function (e) {
    console.log(e.detail.userInfo);
  },
  goVip:function(){
    wx.navigateTo({
      url: '../vip/vip',
    })
  }
})