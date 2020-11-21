/* global SERVER_URI */
import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router'
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  config.baseURL = process.env.NODE_ENV === 'production' ? SERVER_URI : ''
  return config
})

axios.interceptors.response.use(res => {
  if (!res.data.success) {
    Message.error(res.data.message)
    return Promise.reject(res.data.message)
  }
  return res
}, () => {
  Message.error('身份验证错误, 请重新登录!')
  router.push('/login')
})
export default {
  login(data) {
    return axios({
      method: 'post',
      url: '/api/TempUser/TempUserMemberLogin',
      data
    })
  },
  logout() {
    return axios({
      methods: 'get',
      url: '/api/TempUser/LogOut'
    })
  },
  ValidateKeyAllow(params) {
    return axios.get('/api/TempUser/ValidateKeyAllow', {
      params
    })
  },
  TempUserGetTradeSummary(params) {  // 订单数据
    return axios.get('/api/TempUser/TempUserGetTradeSummary', {
      params
    })
  },
  TempUserGetTradeItem(params) { // 订单详情
    return axios.get('/api/TempUser/TempUserGetTradeItem', {
      params
    })
  }
}
