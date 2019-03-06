// pages/courseDetail/courseDetail.js
import { host } from '../../utils/conf.js';
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:'',
    courseList:[],
    currentTab: 0, //预设当前项的值
    tabRight: '50vw',
    webSrc:'',
    shareImage:'',
    sahreTitle:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      webSrc: host.web + `/app/course/${options.id}/cover`
    })
    // var that = this;
    // wx.request({
    //   // url: host.io + '/api/course/courses/2000' + options.id, 
    //   url: host.api + '/api/course/courses/2000',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //     that.setData({
    //       dataList: res.data

    //     })
    //     console.log(that.data.dataList)
    //     WxParse.wxParse('article', 'html', res.data.course.content, that, 5);
    //   }
    // });
    // wx.request({
    //   // url: host.io + '/api/course/courses/2000' + options.id, 
    //   url: host.api + '/api/course/courses/2000/items_info',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     var list = res.data.result;
    //     console.log(list)
    //     for(var i=0;i<list.length;i++){
    //       list[i].duration = that.formatSeconds(list[i].duration)
    //     }
    //     that.setData({
    //       courseList: list

    //     })
       
    //   }
    // })
   
  },
  //课程时间格式化
  formatSeconds: function (msd) {
    let result = '';
    if (msd == 0 || msd == '0' || msd == ''){
        result ="00'00''";
    }else{
    
    let time = parseFloat(msd) / 1000;
    let num = 60;
   

    if (null != time) {
      if (time > 60) {
        let numT = time / num;
        let numS = parseInt(numT);
        let numM = (parseFloat(numT) - numS) * 60;

        result = numS + "'" + parseInt(numM) + "''";//课程时长 52’36’’
      } else {
        result = (time) + "’";
      }
    }
    }
    return result;
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
  shareData: function (e) {
    console.log(e)
    this.setData({
      shareImage: e.detail.data[0][0],
      shareTitle: e.detail.data[0][1]
    })
  },
 // 点击标题切换当前页时改变样式
  swichNav: function (e) {

    var cur = e.target.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  if(this.data.currentTab==0){
    this.setData({
      tabRight: '50vw'
    })
  }else{
    this.setData({
      tabRight:'0'
    })
  }
   

  }
  
})