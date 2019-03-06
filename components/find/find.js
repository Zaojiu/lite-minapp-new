// components/find/find.js
const util = require('../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal, changedPath) {
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
    //详情
    detail(e){
      console.log(e.currentTarget.dataset.id);
        wx.navigateTo({
          url: '../shortVideo/shortVideo?id=' + e.currentTarget.dataset.id,
        })
    },
    //喜欢
    goLike(e){
      console.log(e.currentTarget.dataset)
      var index = e.currentTarget.dataset.index;
      var list = this.data.list;
      if (list[index].isFavourite == 0){
        list[index].isFavourite = 1;
        list[index].favourite  = list[index].favourite+1;
      }else{
        list[index].isFavourite = 0;
        list[index].favourite = list[index].favourite-1;
      }
      this.setData({
        list:this.data.list
      })
      util.hitAction(e.currentTarget.dataset.id, e.currentTarget.dataset.type, e.currentTarget.dataset.favourite);
    }
  }
})
