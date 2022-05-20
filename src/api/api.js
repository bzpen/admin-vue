import https from "../util/https"

/**
 * 管理员登录
 * @param {*} data 
 * @returns 
 */
const adminLogin = data => https.post('admin/login', data);
/**
 * token判断
 * @param {*} data 
 * @returns 
 */
const token = data => https.get('token', data);
/**
 * 添加管理员
 * @param {*} data 
 * @returns 
 */
const addAdmin = data => https.post('tb-admin/add', data);
/**
 * 获取管理员列表(带搜索)
 * @param {*} data 
 * @returns 
 */
const adminList = data => https.get('view-admin/list', data);
/**
 * 单条删除管理员
 * @param {*} data 
 * @returns 
 */
const adminDel = data => https.get2('tb-admin/del/', data);
/**
 * 批量删除管理员
 * @param {*} data 
 * @returns 
 */
const listDel = data => https.post3('tb-admin/delList', data);
/**
 * 用户权限返回
 * @param {*} data 
 * @returns 
 */
const roleGet = data => https.get('tb-role/gets', data);
/**
 * 获取用户列表
 * @param {*} data 
 * @returns 
 */
const userList = data => https.get('view-user/gets', data);
/**
 * 删除单个用户
 * @param {*} data 
 * @returns 
 */
const userDel = data => https.get2('user/del/', data);
/**
 * 批量删除用户
 * @param {*} data 
 * @returns 
 */
const userListDel = data => https.post3('user/delList', data);
/**
 *  获取蜘蛛序列表
 * @param {*} data 
 * @returns 
 */
const sampleList = data => https.get('view-sample/list', data);
/**
 *  蜘蛛种类获取
 * @param {*} data 
 * @returns 
 */
const spiderList = data => https.get('tb-spider/list', data);
/**
 *  删除单条序列
 * @param {*} data 
 * @returns 
 */
const sampleDel = data => https.get2('tb-sample/del/', data);
/**
 *  批量删除序列
 * @param {*} data 
 * @returns 
 */
const sampleListDel = data => https.post3('tb-sample/delList', data);
/**
 *  根据id获取基因序列信息
 * @param {*} data 
 * @returns 
 */
const sampleGet = data => https.get2('view-sample/get/', data);
/**
 *  蜘蛛序列添加
 * @param {*} data 
 * @returns 
 */
const sampleUpdate = data => https.post('tb-sample/update', data);
/**
 *  蜘蛛序列检测接口
 * @param {*} data 
 * @returns 
 */
const sampleCheckList = data => https.get('tb-sample/checkList', data);
/**
 *  序列编号检测接口
 * @param {*} data 
 * @returns 
 */
const sampleCheckNumber = data => https.get('tb-sample/checkNumber', data);
/**
 *  蜘蛛序列添加
 * @param {*} data 
 * @returns 
 */
const sampleAdd = data => https.post('tb-sample/add', data);
/**
 *  蜘蛛种类添加insert
 * @param {*} data 
 * @returns 
 */
const spiderAdd = data => https.post('tb-spider/add', data);
/**
 *  获取单个蜘蛛种类数据（包括图片）
 * @param {*} data 
 * @returns 
 */
const spiderGet = data => https.get2('tb-spider/get/', data);
/**
 *  删除单个蜘蛛种类数据
 * @param {*} data 
 * @returns 
 */
const spiderDel = data => https.get2('tb-spider/del/', data);
/**
 *  删除图片
 * @param {*} data 
 * @returns 
 */
const delImage = data => https.get('tb-spider/delImage', data);
/**
 *  升级
 * @param {*} data 
 * @returns 
 */
const roleUp = data => https.get2('user/roleUp/', data);
/**
 *  降级
 * @param {*} data 
 * @returns 
 */
const roleDown = data => https.get2('user/roleDown/', data);
/**
 *  获取管理员登录记录
 * @param {*} data 
 * @returns 
 */
const getLogAdmin = data => https.get('log/getLogAdmin', data);
/**
 *  获取用户登录记录
 * @param {*} data 
 * @returns 
 */
const getLogUser = data => https.get('log/getLogUser', data);
/**
 *  获取登录记录
 * @param {*} data 
 * @returns 
 */
const getLog = data => https.get('log/getLog', data);
/**
 *  导出返回excel表格
 * @param {*} data 
 * @returns 
 */
const exportExcel = data => https.post2('view-sample/exportExcel', data);
export default {
    addAdmin,
    adminList,
    adminDel,
    adminLogin,
    token,
    listDel,
    roleGet,
    userList,
    userDel,
    userListDel,
    sampleList,
    spiderList,
    sampleDel,
    sampleGet,
    sampleUpdate,
    sampleListDel,
    sampleCheckList,
    sampleCheckNumber,
    sampleAdd,
    spiderAdd,
    spiderGet,
    spiderDel,
    delImage,
    roleUp,
    roleDown,
    getLogAdmin,
    getLogUser,
    getLog,
    exportExcel
}