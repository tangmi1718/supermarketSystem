// 封装axios

// 引入axios.js
import axios from 'axios'

//引入qs.js
import qs from 'qs'

// 设置请求的服务器根目录
axios.defaults.baseURL ='http://172.16.11.209:666';

import local from '@/utils/local'

// axios请求拦截器
axios.interceptors.request.use(config => {
    // 获取token
    const token = local.get('yiyayiyayo');
    config.headers.authorization = `Bearer ${token}` 
    return config;
})

export default {
    // get请求
    get(url,params={}) {
        return new Promise((resolve,reject) => {
            axios.get(url,{params})
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => {
                reject(err)
            })
        })
    },
    // post请求
    post(url,params={}) {
        return new Promise((resolve,reject) => {
            axios.post(url,qs.stringify(params))
            .then((response) => {
                resolve(response.data);
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}