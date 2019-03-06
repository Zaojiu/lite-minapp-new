//app.js
import { host } from '/utils/conf.js';

//传递参数
App({
  //登录状态 是否过期
  isCode: function(){
    var _this =this;
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效
        console.log("登录状态未过期")
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
         _this.wxLogin() // 重新登录
      }
    })
  },
  //登录
  wxLogin:function(){
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.pData.code = res.code;
      }
    })
  },
  onLaunch: function (options) {
     this.wxLogin();
  
    this.isCode();
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
           this.getInfo();
        }else{
          
          setTimeout(()=>{
            wx.redirectTo({
              url: '/pages/login/login',
            })
          },1000)
         
          console.log('没有用户信息')
        }
      }
    })
  },
  //获取微信用户信息
  getInfo:function(){
    wx.getUserInfo({
      withCredentials: true,
      success: res => {
        console.log(res)
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo
        this.globalData.pData.rawData = res.rawData;
        this.globalData.pData.signature = res.signature;
        this.globalData.pData.encryptedData = res.encryptedData;
        this.globalData.pData.iv = res.iv;
        
        this.weiLogin(this.globalData.pData);
        setTimeout(() => {
          this.getDetail();
        }, 500)
       
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  //登录
  weiLogin:function(dataT){
    var _this = this;
    wx.request({
      url: host.api + `/api/oauth2/wechat/connect`, //
      data: dataT,
      method: 'GET',
      header: {
        'Accept': 'application/json' // 默认值
      },
      success(res) {
        var cookie = res.header['Set-Cookie'];
        wx.setStorageSync("sessionid", cookie)
      }
    });
  },
  //获取造就用户信息
  getDetail:function(){
    wx.request({
      url: host.api + `/api/user/detail`, //
      method: 'GET',
      header: { "cookie": wx.getStorageSync("sessionid") },
      success(res) {
        console.log(res);
        wx.setStorageSync("member", res.data.member)
      }
    });
  },
  globalData: {
    userInfo: null,
    pData : {
      device: "minapp",
      code: "",
      state: "",
      rawData: "",
      signature: "",
      encryptedData: "",
      iv: ""
    }
  }
})