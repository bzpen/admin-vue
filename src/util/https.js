'use strict'

import axios from 'axios'
import { Message, } from 'element-ui'
import qs from 'qs'
import tools from './tools'
import loading from '../util/loading'


axios.interceptors.request.use(config => {
    // loading
    loading.startLoading()
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    loading.endLoading()
    return response
}, error => {
    loading.endLoading()
    return Promise.resolve(error.response)
})

function checkStatus(response) {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response.data
            // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: '网络异常'
    }
}

function checkStatus1(response) {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response
            // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: '网络异常'
    }
}

function checkCode(res) {
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (res.status === -404) {
        Message({
            message: res.msg,
            type: "error"
        })
    }
    if (res.data && (!res.data.success)) {
        Message({
            message: res.msg,
            type: "success"
        })
    }
    return res
}

export default {
    post(url, data) {
        return axios({
            method: 'post',
            baseURL: tools.serverAddr,
            url,
            data: qs.stringify(data),
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'token': sessionStorage.getItem('token'),
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    //返回文件
    post2(url, data) {
        return axios({
            method: 'post',
            baseURL: tools.serverAddr,
            url,
            data: JSON.stringify(data),
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token'),
            },
            responseType: 'blob',
        }).then(
            (response) => {
                return checkStatus1(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    post3(url, data) {
        console.log(JSON.stringify(data))
        return axios({
            method: 'post',
            baseURL: tools.serverAddr,
            url,
            data: JSON.stringify(data),
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token'),
            },

        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    get(url, params) {
        return axios({
            method: 'get',
            baseURL: tools.serverAddr,
            url,
            params, // get 请求时带的参数
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'token': sessionStorage.getItem('token'),
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    },
    get2(url, params) {
        url += params;
        return axios({
            method: 'get',
            baseURL: tools.serverAddr,
            url,
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'token': sessionStorage.getItem('token'),
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res)
            }
        )
    }
}