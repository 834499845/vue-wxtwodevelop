import Vue from 'vue'
const user = {
  // 注册用户信息
  registerUser: function registerUser(ip, postdata) {
    var ipStr = ip + '?openId=' + postdata.openId + '&nickName=' + postdata.nickName + '&avatar=' + postdata.avatar
    return Vue.http.get(ipStr, {}).then(response => {
      if (response.status === 200) {
        return Promise.resolve(response.body)
      } else {
        return Promise.reject(response.data.message)
      }
    })
  },
  // 获取用户信息
  userList: function userList(ip, postdata) {
    var ipStr = ip + "/" + postdata.consumerid
    return Vue.http.get(ipStr, {}).then(response => {
      if (response.status === 200) {
        return Promise.resolve(response.body)
      } else {
        return Promise.reject(response.data.message)
      }
    })
  },
  // 获取用户好友列表
  userFrinedMList: function userFrinedMList(ip, postdata) {
    var ipStr = ip + "/" + postdata.selfCode + "/" + postdata.pageno
    return Vue.http.get(ipStr, {}).then(response => {
      if (response.status === 200) {
        return Promise.resolve(response.body)
      } else {
        return Promise.reject(response.data.message)
      }
    })
  },
  // 获取用户好友列表
  userFrinedTYQM: function userFrinedTYQM(ip, postdata) {
    var ipStr = ip + "/" + postdata.id + "/" + postdata.selfcode
    console.log(ipStr)
    return Vue.http.get(ipStr, {}).then(response => {
      if (response.status === 200) {
        return Promise.resolve(response.body)
      } else {
        return Promise.reject(response.data.message)
      }
    })
  }
}

export default user
