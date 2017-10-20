import Vue from 'vue'
const inter = {
    // 商城列表
    IntegralList: function IntegralList(ip, postdata) {
        var ipStr = ip + "/" + postdata.page_no
        return Vue.http.get(ipStr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 商城详情
    IntegralDetails: function IntegralDetails(ip, postdata) {
        var ipStr = ip + "/" + postdata.id
        return Vue.http.get(ipStr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 积分兑换
    IntegralExchange: function IntegralExchange(ip, postdata) {
        var ipStr = ip + "?consumerId=" + postdata.consumerId + "&productId=" + postdata.productId;
        return Vue.http.get(ipStr, {}).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    }
}

export default inter
