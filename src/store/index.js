/**
 * Created by LangK on 2016/12/20.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    // 商户详情时，商户的id
    interagsObj: {
      id: ''
    },
    // 用户注册成功后返回的信息
    regUserObj: {
      avatar: '',
      ctime: '',
      id: '',
      nickName: '',
      openId: '',
      otherCode: '',
      scores: '',
      selfCode: ''
    },
    // 用户注册成功后返回的信息
    WXuserObj: {
      openid: '',
      nickname: '',
      sex: '',
      language: '',
      city: '',
      province: '',
      country: '',
      headimgurl: ''
    }
  },
  mutations,
  actions
})



export default store
