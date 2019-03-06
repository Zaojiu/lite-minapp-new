// components/videoList/videoList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal, changedPath) {
        // console.log(newVal, oldVal, changedPath);
        this.setData({
          videoList: newVal
        })
       

      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetail:function(e){
      wx.navigateTo({
        url: '../videoDetail/videoDetail?id=' + e.currentTarget.dataset.id,
      })
    }
  }
})
