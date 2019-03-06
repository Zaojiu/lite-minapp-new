import { host } from '../../utils/conf.js'


//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
     '1','2','3'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500,
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
   
    height:1500,//高度
    isScollTop:false, //是否滚动页面
    tops_left:14,     //移动距离
    isFocus:false,    //是否获取搜索框焦点
    timeLineList:[],  //时刻列表
    pageIndex:0,     //页码1
    pageSize:10,     //页数1
    discoverList: [],  //社区列表
    pageIndex2: 0,     //页码2
    pageSize2: 10,     //页数2
    pageIndex3: 0,     //页码3
    pageSize3: 10,     //页数3
    followLY:[],       //推荐领域
    followUser:[],    //推荐讲者
    isNoList:false,
    isLoading:'奋力加载中',
    isRight: false,
    searchData:[],//最近搜索
    isClose:false,
    seaTxt:'',
    isFoFav:false,  //是否有关注或喜欢
    faFavList:[] 
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(app.globalData.userInfo);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //初始化数据
    this.getData(this.data.pageIndex, this.data.pageSize);
    this.getData2(this.data.pageIndex2,this.data.pageSize2);
    this.getData3();
    this.isFoFav();
  },
  
  //时刻
  getData(pageIndex,pageSize){
    var that = this;
    var list = wx.request({
      url: host.api + `/api/timeline/timelineList?pageIndex=${pageIndex}&pageSize=${pageSize}`, //
      data: {
        even: [],
      },
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
       var dataList = that.data.timeLineList;
       
        var list = res.data.results.items;
        //为空
        that.more(list.length);
         //根据publishAt判断月份和第几周
        for (var i = 0; i < list.length;i++){
          // console.log((list[i].publishAt));
          var year = (list[i].publishAt).slice(0, 4);//年份
         var month = (list[i].publishAt).slice(5,7);//月份
          var day = (list[i].publishAt).slice(8,10);//日
          var time = that.getMonthWeek(year,month,day);//转化日期
         
          var timeList = { 'month': time.getMonth, 'week': time.getWeek } 
          //保存周期
          list[i].month = time.getMonth;
          list[i].week = time.getWeek;
          // console.log(list[i].month, list[i].week)
        }
        //保存是否显示时间数据
        for(var j = 0;j<list.length;j++){
          
          if (list[j+1]!=undefined){
            if (list[j].week == list[j + 1].week){
              list[j].isShowDate = false;
            }else{
              list[j].isShowDate = true;
            }
            // console.log(list[j].isShowDate)
          }else{
            list[j].isShowDate = true;
          }
           that.data.timeLineList.push(list[j]);
          }
        dataList.concat(list);
          //  console.log(that.data.timeLineList);
         that.setData({
           timeLineList: dataList
         })
        that.tabHeight();
       
        
      }   
      
    })
   
  },
  //社区
  getData2:function(pageIndex2,pageSize2){
    var that =this;
    var list = wx.request({
      url: host.api + `/api/zj/homePages/discoverList?pageSize=${pageSize2}&pageIndex=${pageIndex2}`, //
      data: {
        even: [],
      },
      method: 'GET',
      header: { "cookie": wx.getStorageSync("sessionid") },
      success(res) {
        var list = res.data.results.items;
        //为空
        that.more(list.length);
        for(var i = 0;i<list.length;i++){
          that.data.discoverList.push(list[i])
        }
        that.setData({
          discoverList: that.data.discoverList
        })
        that.tabHeight();
      }
    });
  },
  //我的关注/喜欢
  isFoFav:function(){
    var _this = this;
    wx.request({
      url: host.api + `/api/zj/homePages/attentionList?pageSize=${_this.data.pageSize3}&pageIndex=${_this.data.pageIndex3}`, //

      data: {
        even: [],
      },
      method: 'GET',
      header: { "cookie": wx.getStorageSync("sessionid") },
      success(res) {
        if(res.data.code =='-1'){
          _this.setData({
            isFoFav: false
          })
        }else{
          _this.setData({
            isFoFav: true
          })
          var list = res.data.results.items;
          //为空
          _this.more(list.length);
          for (var i = 0; i < list.length; i++) {
            _this.data.faFavList.push(list[i])
          }
          _this.setData({
            faFavList: _this.data.faFavList
          })
          _this.tabHeight();
        } 
           
      }
    })
  },
  //关注推荐
  getData3: function () {
    var that = this;
     wx.request({
      url: host.api + `/api/zj/homePages/interestedTagList`, //
      
      data: {
        even: [],
      },
      method: 'GET',
       header: { "cookie": wx.getStorageSync("sessionid") },
      success(res) {
        var list = res.data.results.items;
        that.setData({
          followLY:list
        })
      }
    });
    wx.request({
      url: host.api + `/api/zj/homePages/interestedSpeakersList`, //
      data: {
        even: [],
      },
      method: 'GET',
      header: { "cookie": wx.getStorageSync("sessionid") },
      success(res) {
        var list = res.data.results.items;
        that.setData({
          followUser: list
        })
      }
    });
  },
  onReady: function () {
    

  },
  //加载更多
  more:function(len){
    if (len == 0) {
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
  //发布时间获取
  getMonthWeek:function(a,b,c){
    var monthT = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
    /**
         * a = d = 当前日期
         * b = 6 - w = 当前周的还有几天过完(不算今天)
         * a + b 的和在除以7 就是当天是当前月份的第几周
        */
            var date = new Date(a, parseInt(b) - 1, c),
                w = date.getDay(),
                  d = date.getDate();
            if (w == 0) {
                 w = 7;
    
    }
    //年月周
            var config = {
              getYear: date.getFullYear(),
              getMonth: monthT[(date.getMonth())],
              getWeek: monthT[(Math.ceil((d + 6 - w) / 7))-1] 
             }
            // var config = {
            //   getMonth: date.getMonth() + 1,
            //   getYear: date.getFullYear(),
            //   getWeek: Math.ceil((d + 6 - w) / 7)
            // }
    // console.log(config.getMonth,config.getWeek)
           return config;
  },
  //页面滚动到底部
  onReachBottom: function(e){
    this.tabHeight();
    var tab = this.data.currentTab;
    if(!this.data.isNoList){
      if(tab == 0){
        this.setData({
          pageIndex: this.data.pageIndex + 1
        })
        // console.log(this.data.pageIndex);
        this.getData(this.data.pageIndex, this.data.pageSize);
      }else if(tab == 1){
        this.setData({
          pageIndex2: this.data.pageIndex2 + 1
        })
        // console.log(this.data.pageIndex);
        this.getData2(this.data.pageIndex2, this.data.pageSize);
      }else if(tab == 2){
        if (this.data.isFoFav){
          this.setData({
            pageIndex3: this.data.pageIndex3 + 1
          })
          // console.log(this.data.pageIndex);
          this.isFoFav();
        }
        
      }
    }
  },
  onPageScroll: function (e) { //滚动超过50
   
    if(e.scrollTop>=50){
      this.setData({
        isScollTop: true
       
      })
    }else{
      this.setData({
        isScollTop: false

      })
    }
   
  },
  onPullDownRefresh:function(e){
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var _this = this;
    //模拟加载
    setTimeout(function () {
      // complete
      _this.getData3();
      _this.isFoFav();
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);

  },
  //获取用户信息
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
  
  
  // 点击标题切换当前页时改变样式
    swichNav: function (e) {
      
      this.more(1);
    var cur = e.target.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
      this.tabHeight();
     
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.more(1);
    this.setData({
      currentTab: e.detail.current
    });
    
    this.tabHeight();
  },
  //初始化swiper高度
  tabHeight:function(){
    
    var tab = this.data.currentTab;
    var query = wx.createSelectorQuery();
    var that = this;
    if (tab == 0) {
     
      that.setData({
        tops_left: 14
      })
      query.select('.followL').boundingClientRect(function (rect) {
        that.setData({
          height: rect.height + 52
        })

      }).exec();
    } else if (tab == 1) {
     
      that.setData({
        tops_left: 14 + 66
      })
      query.select('.followL1').boundingClientRect(function (rect) {
        that.setData({
          height: rect.height + 52
        })

      }).exec();
    } else if (tab == 2) {
      that.setData({
        tops_left: 14 + 66 * 2
      })
      query.select('.followL2').boundingClientRect(function (rect) {
        that.setData({
          height: rect.height + 52
        })
     
      }).exec();
    }
  },
  bClick(event){
    wx.navigateTo({
      url: '../searchList/searchList?text=' + event.currentTarget.dataset.text,
    })
  },
  //搜索
  searchBtn: function (e) {
    var val = e.detail.value;
    
    try {
      var  value = wx.getStorageSync('searchText');
      
      if( value.length<3){
       value.unshift(val);
      }else{
        value.unshift(val);
        value.pop();
      }
      wx.setStorage({
        key: 'searchText',
        data: value,
        success: function (res) {
          console.log('异步保存成功')
        }
      })
     
      wx.navigateTo({
        url: '../searchList/searchList?text=' + val,
      })
      this.cancel();
      this.setData({
        seaTxt:''
      })
    } catch (e) {
     
     
    }
    
  },
  //点击搜索框
  btnClick: function () {
    this.setData({
      isRight: true
    })
    var txt = wx.getStorageSync('searchText');
    if (txt ==''){
      wx.setStorage({
        key: 'searchText',
        data: [],
        success: function (res) {
          console.log('异步保存成功')
        }
      })
     
    }
      this.setData({
        searchData:txt
      })
      if(this.data.searchData.length>0){
        this.setData({
          isClose: true
        })
      }
      // console.log(this.data.searchData);
    
    

  },
  //取消
  cancel: function () {
    this.setData({
      isRight: false
    })
  },
  //清除最近搜索
  close:function () {
    this.setData({
      isRight: false,
      isClose: false
    })
    wx.setStorage({
      key: 'searchText',
      data: [],
      success: function (res) {
        console.log('异步保存成功')
      }
    })
  },
  //分享
  onShareAppMessage:function(options){
    return {
      title:'造就发现创造力',
      imageUrl:host.shareImage
    }
  }

})
