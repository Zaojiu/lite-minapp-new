// pages/hearDetail/hearDetail.js
import { host } from '../../utils/conf.js';
var WxParse = require('../../wxParse/wxParse.js');
const innerAudio = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false,
    duration:'',//总时间
    dTime:'',//播放时间
    srcAudio:'../../assets/image/bigPlayN.png',//播放图片
    slider:0,//进度比例
    playTime:0,//什么时间播放时间
    dataList:[],
    webSrc:'',
    shareImage: '',
    sahreTitle: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      webSrc: host.web + `/book/detail/${options.id}`
    })
    // var that = this;
    // wx.request({
    //   url: host.api + '/api/course/resources/' + options.id, //
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     that.setData({
    //       dataList: res.data.resourceInfo
    //     })
    //     console.log(res.data.resourceInfo.defaultItemInfo.audioUrl)
    //     innerAudio.src = res.data.resourceInfo.defaultItemInfo.audioUrl;
    //     innerAudio.onCanplay(() => {
    //       innerAudio.duration //类似初始化-必须触发-不触发此函数延时也获取不到
    //       setTimeout(function () {
    //         //在这里就可以获取到大家梦寐以求的时长了
    //         that.setData({
    //           dTime: that.transTime(innerAudio.duration)
             
    //         });
    //         // console.log(that.data.dTime);
    //       }, 500)  //这里设置延时获取
    //     })

      
    //     that.setData({
    //       dataList: res.data.resourceInfo,
    //       duration: that.formatSeconds(res.data.resourceInfo.defaultItemInfo.duration),
    //       dTime: innerAudio.duration
    //     })
    //     WxParse.wxParse('article', 'html', res.data.resourceInfo.content, that, 5);
    //    }
    // });
    
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
  play: function () {

    if (this.data.isPlay){
      
      innerAudio.pause();
      this.setData({ isPlay: false,
        srcAudio:'../../assets/image/bigPlayN.png'
       });
      

    }else{
     
      innerAudio.play();
      this.setData({ isPlay: true,
        srcAudio: '../../assets/image/bigPlayY.jpg'
       });
    
      this.updateTime();
    }
   
    

    
  },

  timeSliderChanged: function (e) {
    // console.log(innerAudio.currentTime)
    // if (!innerAudio.duration)
    //   return;

    // var time = this.duration * e.detail.value / 100;

    // this.setData({
    //   audioAction: {
    //     method: 'setCurrentTime',
    //     data: time
    //   }
    // });
    
  },
  //拖拽音频进度
  changeAudio:function(e){
    innerAudio.pause();
    
    
    let time=(innerAudio.duration) * ((e.detail.value)/100);

    innerAudio.seek(time,3);
    innerAudio.play();
    this.setData({
      isPlay: true,
      srcAudio: '../../assets/image/bigPlayY.jpg'
    });
    this.updateTime();

  },
  //转换音频时长显示
  transTime:function(time) {

    let duration = parseInt(time);
    let vDuration = duration / 60;
    let minute = parseInt(vDuration);
    let sec = duration % 60 + '';
    let isM0 = ':';
    if (minute == 0) {
      minute = '00';
    } else if (minute < 10) {
      minute = '0' + minute;
    }
    if (sec.length == 1) {
      sec = '0' + sec;
    }
    return minute + isM0 + sec

  },
  //课程时间格式化
  formatSeconds:function(msd) {
    let time = parseFloat(msd) / 1000;
    let num = 60;
    let result = '';

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
    return result;
  },
  updateTime: function(){
    
    setTimeout(() => {
      innerAudio.duration
      
      innerAudio.onTimeUpdate(() => {
        
        //  console.log(innerAudio.duration)   //总时长
        //  console.log(innerAudio.currentTime)   //当前播放进度
        const sss = Math.floor(innerAudio.currentTime) / Math.floor(innerAudio.duration);
        const surTime = innerAudio.duration - innerAudio.currentTime;//剩余时长

        this.setData({
          slider: Math.round(sss * 100),
          dTime: this.transTime(surTime)
        })
       
      })
    }, 500)
  }
})