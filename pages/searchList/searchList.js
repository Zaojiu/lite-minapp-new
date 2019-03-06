// pages/searchList/searchList.js
import { host } from '../../utils/conf.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isRight: false,
    text:'',//搜索的内容
    interval: 5000,
    duration: 1000,
    winHeight: "",//窗口高度
    height: 1500,//高度
    isScollTop: false, //是否滚动页面
    currentTab: 0, //预设当前项的值
    discoverList:[],//短视频集合
    videoList: [],//视频集合
    speakerList:[],//讲者集合
    eventList: [],//活动集合
    courseList: [],//课程集合
    bookList: [],//听书集合
    isLoading: '奋力加载中',
    isNoList: false,
    pageIndex1:0, //短视频页码
    pageIndex2: 0,//视频页码
    pageIndex3: 0, //讲者页码
    pageIndex4: 0, //活动页码
    pageIndex5: 0, //课程页码
    pageIndex6: 0, //听书页码
    searchData: [],//最近搜索
    isClose: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      text:options.text
    })
    
  this.getList( options.text);
   
   
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

    var curTab = this.data.currentTab;//tab下标
    var text = this.data.text; //搜索内容
    if (curTab == 0) {
      if(this.isPage(this.data.discoverList.length)){
        this.setData({
          pageIndex1: this.data.pageIndex1 + 1
        })
        this.getPageList(200, text, this.data.pageIndex1);
      }
      
    } else if (curTab == 1) {
      if (this.isPage(this.data.videoList.length)) {
        this.setData({
          pageIndex2: this.data.pageIndex2 + 1
        })
        this.getPageList(121, text, this.data.pageIndex2);
      }
    } else if (curTab == 2) {
      if (this.isPage(this.data.speakerList.length)) {
        this.setData({
          pageIndex3: this.data.pageIndex3 + 1
        })
        this.getPageList(118, text, this.data.pageIndex3);
      }
    } else if (curTab == 3) {
      if (this.isPage(this.data.eventList.length)) {
        this.setData({
          pageIndex4: this.data.pageIndex4 + 1
        })
        this.getPageList(122, text, this.data.pageIndex4);
      }
    } else if (curTab == 4) {
      if (this.isPage(this.data.courseList.length)) {
        this.setData({
          pageIndex5: this.data.pageIndex5 + 1
        })
        this.getPageList(120, text, this.data.pageIndex5);
      }
    } else if (curTab == 5) {
      if (this.isPage(this.data.bookList.length)) {
        this.setData({
          pageIndex6: this.data.pageIndex6 + 1
        })
        this.getPageList(210, text, this.data.pageIndex6);
      }
    }else{
      this.more(0);
    }
   
      
    
   
  },
  //是否加载分页
  isPage:function(len){
    if(len>0){
      //是否被10整除 
      var re = /^[0-9]+$/;
      var lens = len / 10;
      console.log(lens);
      return re.test(lens);
    }else{
      return false;
    }
   
    
  },
  onPageScroll: function (e) { //滚动超过50

    if (e.scrollTop >= 50) {
      
    } else {
      
    }
    this.setHeight();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  btnClick: function () {
    this.setData({
      isRight: true
    })
  },
  //取消
  cancel: function () {
    this.setData({
      isRight: false
    })
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
  
    var cur = e.target.dataset.current;
    if (this.data.currentTab == cur) { 
      return false; 
    }else {
      this.setData({
        currentTab: cur
      })
      
    }
    this.getList(this.data.text)
    this.setHeight();
  },
  //滚动切换
  switchTab: function (e) {
    
    this.setData({
      currentTab: e.detail.current

    })
    this.getList(this.data.text)
    this.setHeight();
    
  },
  //加载更多
  more: function (len) {
   
   try{
     if (len == 0 || len == undefined || len.length < 10) {
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
   }catch(e){
     this.setData({
       isNoList: true,
       isLoading: '暂无更多'
     })
   }
    
  },
  //获取查询数据
  getList(query){
    var that = this;
    var type ;
    if (that.data.currentTab == 0){
      if (this.data.discoverList.length != 0) {
        return;
      }
      type = 200;
     
    } else if (that.data.currentTab == 1){
      if (this.data.videoList.length != 0) {
        return;
      }
      type =121;
      
    } else if (that.data.currentTab == 2) {
      if (this.data.speakerList.length != 0) {
        return;
      }
      type = 118;
    } else if (that.data.currentTab == 3) {
      if (this.data.eventList.length != 0) {
        return;
      }
      type = 122;
    } else if (that.data.currentTab == 4) {
      if (this.data.courseList.length != 0) {
        return;
      }
      type = 120;
    } else if (that.data.currentTab == 5) {
      if (this.data.bookList.length != 0) {
        return;
      }
      type = 210;
    }
   wx.request({
      url: host.api + `/api/zj/homePages/getSearchResults/${type}?pageSize=10&pageIndex=0&q=${query}`, //
      data: {
        even: [],
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
       
        var list = res.data.results.items;
        if (list != 'undefined' && list != undefined) {
        if(that.data.currentTab==0){//短视频
        
          that.setData({
            discoverList: list
          })
        } else if (that.data.currentTab == 1){//视频
        
          that.setData({
            videoList: list
          })
        } else if (that.data.currentTab == 2) {//讲者
        
          that.setData({
            speakerList: list
          })
        } else if (that.data.currentTab == 3) {//活动
          
          that.setData({
            eventList: list
          })
        } else if (that.data.currentTab == 4) {//课程
          
          that.setData({
            courseList: list
          })
        } else if (that.data.currentTab == 5) {//听书
         
          that.setData({
            bookList: list
          })
        }
        }
        that.more(list)
       
        that.setHeight();
      }
    });
  },
  //重新定义swiper-item高度
  setHeight:function(){
    var that = this;
    var tab = this.data.currentTab;
    var query = wx.createSelectorQuery();
      query.select(`.followL${tab}`).boundingClientRect(function (rect) {
       
        that.setData({
          height: rect.height +52
        })

      }).exec();
  },
  //分页处理
  getPageList:function(type,query,pageIndex){
    var that = this;
    wx.request({
      url: host.api + `/api/zj/homePages/getSearchResults/${type}?pageSize=10&pageIndex=${pageIndex}&q=${query}`, //
      data: {
        even: [],
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        var list = res.data.results.items;
        console.log(list);
        if (list != 'undefined' && list != undefined){

        
        if (that.data.currentTab == 0) {//短视频
          for(var i=0;i<list.length;i++){
            that.data.discoverList.push(list[i]);
          }
          that.setData({
            discoverList: that.data.discoverList
          })
        } else if (that.data.currentTab == 1) {//视频
          for (var i = 0; i < list.length; i++) {
            that.data.videoList.push(list[i]);
          }
          
          that.setData({
            videoList: that.data.videoList
          })
        } else if (that.data.currentTab == 2) {//讲者
          for (var i = 0; i < list.length; i++) {
            that.data.speakerList.push(list[i]);
          }
          that.setData({
            speakerList: that.data.speakerList
          })
        } else if (that.data.currentTab == 3) {//活动
          for (var i = 0; i < list.length; i++) {
            that.data.eventList.push(list[i]);
          }
          that.setData({
            eventList: that.data.eventList
          })
        } else if (that.data.currentTab == 4) {//课程
          for (var i = 0; i < list.length; i++) {
            that.data.courseList.push(list[i]);
          }
          that.setData({
            courseList: that.data.courseList
          })
        } else if (that.data.currentTab == 5) {//听书
          for (var i = 0; i < list.length; i++) {
            that.data.bookList.push(list[i]);
          }
          that.setData({
            bookList: that.data.bookList
          })
        }
        }
        that.more(list)

        that.setHeight();
      }
    });
  },
  //点击最近搜索
  bClick(event) {
    var txt = event.currentTarget.dataset.text;
    this.setData({
      text:txt
    });
    this.searchBtn(txt,false);
  },
  //搜索
  searchBtn: function (e,type) {
    //判断点击还是输入的结果
    var val;
    if(type===false){
      val = e;
    }else{
      val = e.detail.value;
      var value = wx.getStorageSync('searchText');

      if (value.length < 3) {
        value.unshift(val);
      } else {
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
    }
     

    try {
      //重新搜索数据前清空
      this.setData({
        discoverList: [],//短视频集合
        videoList: [],//视频集合
        speakerList: [],//讲者集合
        eventList: [],//活动集合
        courseList: [],//课程集合
        bookList: [],//听书集合
      })
      this.getList(val);
      this.setData({
        isRight: false
      })
      // wx.navigateTo({
      //   url: '../searchList/searchList?text=' + val,
      // })

    } catch (e) {
      console.log(e);

    }

  },
  //点击搜索框
  btnClick: function () {
    this.setData({
      isRight: true
    })
    var txt = wx.getStorageSync('searchText');
    if (txt == '') {
      wx.setStorage({
        key: 'searchText',
        data: [],
        success: function (res) {
          console.log('异步保存成功')
        }
      })

    }
    this.setData({
      searchData: txt
    })
    if (this.data.searchData.length > 0) {
      this.setData({
        isClose: true
      })
    }
    console.log(this.data.searchData);



  },
  //取消
  cancel: function () {
    this.setData({
      isRight: false
    })
  },
  //清除最近搜索
  close: function () {
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
  }
})