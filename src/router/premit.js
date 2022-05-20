import router from "./index";
import { Message } from "element-ui";
import { token } from "../api/getData";
import api from "../api/api";


// //路由守卫
router.beforeEach((to, from, next) => {
    //新路由守卫
    const res = api.token();

    res
        .then((data) => {
            // console.log("路由守卫");
            // console.log(data);
            if (to.path == "/") {
                console.log("路由守卫");
                console.log(data);
                if (data.success == false) {
                    next();
                } else if (data.success == true) {
                    /*
                     *调用全局存储token
                     */
                    // sessionStorage.setItem('token', data.token),
                    Message({
                        type: "success",
                        message: data.msg,
                    });
                    next('/main');
                }
                next()
            } else if (data.success == false) {
                console.log(data)
                Message({
                    type: "error",
                    message: "请登录",
                });
                next('/');
            } else {
                /*
                 *调用全局存储token
                 */
                next();
            }
        })
        .catch((err) => {
            console.log(err),
                this.$notify.error({
                    title: "系统错误",
                    message: "系统错误，请稍后在试！",
                });
        });


    // //旧路由守卫
    // if (to.path == "/") {
    //     window.localStorage.setItem('token', 234)
    //     if (localStorage.getItem('token') === null) {
    //         next();
    //     } else {
    //         Message({
    //             type: "success",
    //             message: "您已经登录过了",
    //         });
    //         next('/Main');
    //     }
    // } else if (localStorage.getItem('token') === null) {
    //     Message({
    //         type: "error",
    //         message: "请登录",
    //     });
    //     next('/');

    // } else {
    //     next()
    // }


    // //没有路由守卫
    // if (to.path == "/") {
    //     window.localStorage.setItem('token', 234)
    //     if (localStorage.getItem('token') === null) {
    //         next();
    //     } else {
    //         Message({
    //             type: "success",
    //             message: "您已经登录过了",
    //         });
    //         next('/Main');
    //     }
    // } else if (localStorage.getItem('token') === null) {
    //     Message({
    //         type: "error",
    //         message: "请登录",
    //     });
    //     next('/');

    // } else {
    //     next()
    // }



})