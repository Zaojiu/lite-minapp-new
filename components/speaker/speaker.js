// components/speaker/speaker.js
import { host } from '../../utils/conf.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[],
      observer: function (newVal, oldVal, changedPath) {
        // console.log(newVal, oldVal, changedPath);
         this.setData({
           timeLineList: newVal
          })
        console.log(this.data.list);
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    labelTab:0,
    list:[]
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    switchTui: function (e) {
      console.log(e.target.dataset.current);
      this.setData({
        labelTab: e.target.dataset.current
      })
    },
    getData: function(e){
      // console.log(this.data.list)
      // this.setData({
      //   timeLineList: this.data.list
      // })
      
    },
    detail: function(e){
      // console.log(e.currentTarget.dataset.type)
      if (e.currentTarget.dataset.type == 119) {
        wx.navigateTo({
          url: '../weekDetail/weekDetial?id=' + e.currentTarget.dataset.id,
        })
      } else if (e.currentTarget.dataset.type == 121) {
         wx.navigateTo({
           url: '../videoDetail/videoDetail?id=' + e.currentTarget.dataset.id,
         })
      }
    }
  }
})
