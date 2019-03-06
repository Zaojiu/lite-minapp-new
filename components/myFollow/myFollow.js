// components/follow/follow.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showList: 0,
    tuiTab: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getHeight: function () {

      console.log('follow');

    },
    switchTui: function (e) {

      this.setData({
        tuiTab: e.target.dataset.current
      })
    }

  }
})
