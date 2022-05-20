import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    namespaced: true,
    state: {
        token: '', //初始化token
        UserList: [],
        data: ""
    },
    mutations: {
        //存储token方法
        //设置token等于外部传递进来的值
        setToken(state, token) {
            state.token = token,
                window.sessionStorage.setItem('token', token)
        },
        setUserList(state, UserList) {
            //存储UserList方法
            //设置UserList等于外部传递进来的值
            state.UserList = UserList,
                window.localStorage.setItem('UserList', UserList)
        },
        setHeight(state, Height) {
            //存储Height方法(浏览器高度)
            //设置Height等于外部传递进来的值
            state.Height = Height,
                window.localStorage.setItem('Height', Height)
        },
        setData(state, data) {
            state.data = data
                // window.sessionStorage.setItem("data", data)
        },


    },
    getters: {
        //获取token方法
        //判断是否有token,如果没有重新赋值，返回给state的token
        getToken(state) {
            if (!state.token) {
                state.token = sessionStorage.getItem('token')
            }
            return state.token
        },
        //获取UserList方法
        getUserList(state) {
            // if (!state.UserList) {
            //   state.UserList = localStorage.getItem('UserList')
            // }
            return state.UserList
        },
        //获取浏览器高度    height   方法
        getHeight(state) {
            // if (!state.UserList) {
            //   state.UserList = localStorage.getItem('UserList')
            // }
            return state.Height
        },
        getData(state) {
            // if (!state.data) {
            //     state.data = window.sessionStorage.getItem("data")
            // }
            return state.data
        },
    },
    actions: {

    }
})