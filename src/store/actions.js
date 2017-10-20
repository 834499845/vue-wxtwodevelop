/**
 * Created by LangK on 2016/12/20.
 */
import Vue from 'vue'
require("../../API/config")
import inter from "../assets/request/inter"
import user from "../assets/request/user"
import site from "../assets/request/site"
export default {
  // 注册用户信息
  getRegisterUser({ }, postdata) {
    return user.registerUser(global.userRegisterPath, postdata)
  },
  // 积分商城列表
  getIntegralList({ }, postdata) {
    return inter.IntegralList(global.intersListPath, postdata)
  },
  // 商城详情
  getIntegralDetails({ }, postdata) {
    return inter.IntegralDetails(global.intersOnePath, postdata)
  },
  // 兑换积分
  getIntegralExchange({ }, postdata) {
    return inter.IntegralExchange(global.xechangePath, postdata)
  },
  // 用户信息
  getUserList({ }, postdata) {
    return user.userList(global.userDetailsPath, postdata)
  },
  // 我的好友列表
  getFriendMList({}, postdata) {
    return user.userFrinedMList(global.firstMPath, postdata)
  },
  // 邀请的好友二维码
  getFriendYQM({}, postdata) {
    return user.userFrinedTYQM(global.firstTPath, postdata)
  },
  // 查看用户的快递信息
  getSiteList({ }, postdata) {
    return site.findSite(global.findSitePath, postdata)
  },
  // 更新用户的快递信息
  getUpdateSite({ }, postdata) {
    return site.uodateSite(global.updateSitePath, postdata)
  },
  // // 从微信获取信息注册
  getWXUser({}, postdata) {
    return Vue.http.post('/home', postdata).then(response => {
      if (response.status === 200) {
        return Promise.resolve(response.body)
      } else {
        return Promise.reject(response.data.message)
      }
    })
  },
  // // 从微信获取信息注册
  getWxJssdk({}, postdata) {
    return Vue.http.post('/apphome', postdata).then(response => {
      if (response.status === 200) {
        return Promise.resolve(response.body)
      } else {
        return Promise.reject(response.data.message)
      }
    })
  }
}
