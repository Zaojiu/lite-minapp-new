// components/course/course.js
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
          bookList: newVal
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
    getDetail: function (event) {
      wx.navigateTo({
        url: '../hearDetail/hearDetail?id=' + event.currentTarget.dataset.id,
      })
    }
  }
})
