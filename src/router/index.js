import Vue from 'vue'
import Router from 'vue-router'

import login from '../components/login.vue'
import main from '../components/main.vue'
import DataManage from '../components/dataManage.vue'
import EditorAdmini from '../components/editorAdmini.vue'


//管理员列表组件
import AdminForm from "../components/adminForm.vue";
// 添加管理员组件
import AddAdmin from "../components/addAdmin.vue";
// 用户编辑组件
import EditorUser from "../components/editorUser.vue";
//添加蜘蛛种类组件
import AddSpiders from "../components/addSpiders.vue";
//添加组件
import aaaa from "../components/aaaa.vue";
//添加组件
import SpidersForm from "../components/spidersForm";
//蜘蛛序列表组件
import SampleList from "../components/sampleList"
//新增序列组件
import SampleAdd from "../components/sampleAdd"
//序列详情界面
import Sample from "../components/sample"
//种类详情界面
import Details from "../components/details"
import Photo from "../components/photo"
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/main',
            name: 'main',
            component: main,
            redirect: '/DataManage',
            children: [{
                    path: '/DataManage',
                    component: DataManage,
                    meta: ["数据管理"],
                },
                {
                    path: '/EditorAdmini',
                    component: EditorAdmini,
                    meta: ["用户管理", "前台用户管理", "用户权限"],
                },
                {
                    path: '/EditorUser',
                    component: EditorUser,
                    meta: ["用户管理", "前台用户管理", "用户编辑"],
                },
                {
                    path: '/AdminForm',
                    component: AdminForm,
                    meta: ["用户管理", "后台用户管理", "管理员列表"],
                },
                {
                    path: '/AddAdmin',
                    component: AddAdmin,
                    meta: ["用户管理", "后台用户管理", "添加管理员"],
                },
                {
                    path: '/AddSpiders',
                    component: AddSpiders,
                    meta: ["添加蜘蛛种类"],
                },
                {
                    path: '/SpidersForm',
                    component: SpidersForm,
                    meta: ["数据删改"],
                },
                {
                    path: '/SampleList',
                    component: SampleList,
                    meta: ["蜘蛛序列表"],
                },
                {
                    path: '/SampleAdd',
                    component: SampleAdd,
                    meta: ["新增序列"],
                },
                {
                    path: '/Sample',
                    name: 'Sample',
                    component: Sample
                },
                {
                    path: '/Photo',
                    name: 'Photo',
                    component: Photo
                },

            ]
        },
        {
            path: '/aaaa',
            name: 'aaaa',
            component: aaaa
        },

    ]
})