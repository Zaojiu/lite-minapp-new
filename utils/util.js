import { host } from '/conf.js';
//时间格式化
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//关注 
//1.id(关注内容id) 2.type(0讲者1标签) 3.status(true关注或false取消)
const follow = (id,type,status ) => {
  var that = this;
  var statusT;
  if ( status== 0) {
    statusT = true;
  } else {
    statusT = false;
  }
  wx.request({
    url: host.api + `/api/zj/homePages/attention/${id}?type=${type}&isAttention=${statusT}`, //
    method: 'GET',
    header: { "cookie": wx.getStorageSync("sessionid") },
    success(res) {
      console.log(res);
    }
  })
}
//喜欢 
//1.id(喜欢内容id) 2.type(短视频) 3.status(true喜欢或false取消)
const hitAction = (id, type, status) => {
  var that = this;
  var statusT;
  if (status == 0) {
    statusT = true;
  } else {
    statusT = false;
  }
  wx.request({

    url: host.api + `/api/zj/homePages/hitAction/${id}?type=${type}&isFavorite=${statusT}`, //
    method: 'GET',
    header: { "cookie": wx.getStorageSync("sessionid") },
    success(res) {
      console.log(res);
    }
  })
}

module.exports = {
  formatTime: formatTime,
  follow: follow,
  hitAction: hitAction
}

