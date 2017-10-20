import Vue from 'vue'
const store = {
  // 更新收获地址信息
  uodateSite: function uodateSite(ip, postdata) {
    var ipStr = ip + '?consumerId=' + postdata.consumerId + '&mobile=' + postdata.mobile + '&contact=' + postdata.contact + '&address=' + postdata.address
    return Vue.http.get(ipStr, {}).then(response => {
      if (response.status === 200) {
        return Promise.resolve(response.body)
      } else {
        return Promise.reject(response.data.message)
      }
    })
  },
  // 获取用户快递信息
  findSite: function findSite(ip, postdata) {
    var ipStr = ip + '/' + postdata.consumerid
    return Vue.http.get(ipStr, {}).then(response => {
      if (response.status === 200) {
        return Promise.resolve(response.body)
      } else {
        return Promise.reject(response.data.message)
      }
    })
  }
}

export default store
