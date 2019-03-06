// components/search/search.js
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
    isRight:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    btnClick:function(){
      this.setData({
        isRight:true
      })
    },
    //取消
    cancel:function(){
      this.setData({
        isRight: false
      })
    },
    searchBtn:function(){
      alert('触发搜索')
    }
  }
  
})
