// components/speakerUser/speakerUser.js
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
          discoverList: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getDetail:function(e){
      wx.navigateTo({
        url: '../userPage/userPage?id=' + e.currentTarget.dataset.id,
      })
    }
  }
})
