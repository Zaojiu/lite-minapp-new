import { host } from '../../utils/conf.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    dataList: [],//课程
    bookList: [],//听书
    pageIndex: 0,
    pageIndex2: 0,
    isLoading: '奋力加载中',
    isNoList: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options, query) {
    wx.setNavigationBarTitle({
      title: '已购'
    })
    this.loadList(120, 0);
   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('-------onReady');
    wx.hideShareMenu();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('-------onShow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('-------onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('-------onUnload');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('-------onPullDownRefresh');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('-------onReachBottom');
    if (!this.data.isNoList) {


      if (this.data.currentTab == 0) {
        this.setData({
          pageIndex: this.data.pageIndex + 1
        })
        this.loadList(120, this.data.pageIndex);
      } else {
        this.setData({
          pageIndex2: this.data.pageIndex2 + 1
        })
        this.loadList(210, this.data.pageIndex2);
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('-------onShareAppMessage');
  },
  switchTab: function (e) {

    this.setData({
      currentTab: e.target.dataset.current,

    })
    if (this.data.currentTab == 1 && this.data.bookList.length == 0) {
      this.loadList(210, 0);
    } else if (this.data.currentTab == 0 && this.data.bookList.length == 0) {
      this.loadList(120, 0);
    }

  },
  loadList: function (type, pageIndex) {
    var that = this;
    wx.request({
      url: host.api + `/api/course/resources/my?type=${type}&pageIndex=${pageIndex}&pageSize=10`, //
      header: { "cookie": wx.getStorageSync("sessionid") },
      success(res) {
        var list = res.data.results.items;
        that.more(list.length);
        if (type == '120' && list != undefined) {
          for (var i = 0; i < list.length; i++) {
            that.data.dataList.push(list[i])
          }
          that.setData({
            dataList: that.data.dataList
          })
        } else if (type == '210' && list != undefined) {
          for (var i = 0; i < list.length; i++) {
            that.data.bookList.push(list[i])
          }
          that.setData({
            bookList: that.data.bookList
          })
        }
      }
    })
  },
  //加载更多
  more: function (len) {
   
    console.log(len)
    if (len == 0 || len == undefined || len<10) {
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
  getDetail(event) {//内容详情

    console.log(event.currentTarget.dataset.type)
    if (event.currentTarget.dataset.type == 1) {
      wx.navigateTo({
        url: '../courseDetail/courseDetail?id=' + event.currentTarget.dataset.id,
      })
    } else if (event.currentTarget.dataset.type == 2) {
      wx.navigateTo({
        url: '../hearDetail/hearDetail?id=' + event.currentTarget.dataset.id,
      })
    }


  }
})