// components/follow/follow.js
const util = require('../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //领域
    listLY: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal, changedPath) {
        // console.log(newVal, oldVal, changedPath);
        this.setData({
          followLY: newVal
        })
       

      }
    },
    //讲者
    listUser: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal, changedPath) {
        // console.log(newVal, oldVal, changedPath);
        this.setData({
          followUser: newVal
        })


      }
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    showList:0,
    tuiTab: 0,
    listLY:[],
    listUser:[]
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getHeight: function(){
    
        console.log('follow');
      
    },
    switchTui: function (e) {
     
      this.setData({
        tuiTab: e.target.dataset.current
      })
    },
    // 讲者主页
    goUser: function(e){
      
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: '../userPage/userPage?id=' + e.currentTarget.dataset.id,
      })
    },
    // 标签主页
    goLabel: function (e) {
      wx.navigateTo({
        url: '../labelPage/labelPage?id=' + e.currentTarget.dataset.id,
      })
    },
    //关注
    goFollow(e){
      //获取下标
      var index = e.currentTarget.dataset.index;
      var list = this.data.listLY;
      var listUser = this.data.listUser;
      console.log(e.currentTarget.dataset.type)
      if (e.currentTarget.dataset.type == 1){
        if (list[index].isAttention == 0) {
          list[index].isAttention = 1;
        } else {
          list[index].isAttention = 0;
        }
        this.setData({
          listLY: this.data.listLY
        })
      }else{
       
        if (listUser[index].isAttention == 0) {
          listUser[index].isAttention = 1;
        } else {
          listUser[index].isAttention = 0;
        }
        this.setData({
          listUser: this.data.listUser
        })
        console.log(this.data.listUser)
      }
      
      util.follow(e.currentTarget.dataset.id, e.currentTarget.dataset.type, e.currentTarget.dataset.isattention);
    }
  }
})
