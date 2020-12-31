import Axios from 'axios'
import {ElMessage, ElLoading} from 'element-plus'
import router from '../router'

const CODE = 200
let Loading

const StartLoading = () => {
    Loading = ElLoading.service({
        lock: true,
        text: '加载数据中……',
        background: 'rgba(0, 0, 0, 0.3)'
    })
}
const StopLoading = () => {
    if(Loading) {
        Loading.close()
    }
}
Axios.interceptors.request.use(config => {
    StartLoading()
    if (sessionStorage.getItem('access_token')) {
        // 设置统一请求头
        config.headers['access-token'] = sessionStorage.getItem('access_token')
    }
    return config
},error => {
    StopLoading()
    return Promise.reject(error)
})
//响应拦截
Axios.interceptors.response.use(response => {
    // 关闭动画
    StopLoading()
    if (response.status === 250) {
        ElMessage.error('登录超时，请重新登录')
        // 清除token
        localStorage.removeItem('access_token');
        // 跳转到登录页面
        router.push('/login')
        return Promise.reject(response.data.msg)
    }
    if (response.data.code !== CODE) {
        return Promise.reject(response.data.msg)
    }
    return response.data
}, err => {
    StopLoading()
    return Promise.reject(err)
})


export default Axios
