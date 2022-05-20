import fetch from '@/config/fetch'
/**
 * 登陆
 */

export const login = data => fetch('/admin/login', data, 'POST');

/**
 * 添加管理员
 */

export const addAdmin = data => fetch('/admin/addAdmin', data, 'POST');

/**
 * 获取管理员列表
 */

export const getAdmins = data => fetch('/admin/getAdmins', data, 'POST');

/**
 * 删除管理员
 */

export const delete_Admin = data => fetch('/admin/delete_Admin', data, 'POST');

/**
 * 获取用户列表 
 */

export const getUsers = data => fetch('/user/getUsers', data, 'POST');

/**
 * 删除用户
 */

export const deleteUser = data => fetch('/user/deleteUser', data, 'POST');

/**
 * 批量删除用户
 */

export const deleteUsers = data => fetch('/user/deleteUsers', data, 'POST');

/**
 * 用户升级
 */

export const up_User = data => fetch('/user/up_User', data, 'POST');

/**
 * 用户降级
 */

export const down_User = data => fetch('/user/down_User', data, 'POST');

/**
 * token验证
 */

export const token = data => fetch('/admin/token', data, 'POST');

/**
 * 添加蜘蛛种类
 */

export const insert = data => fetch('/spider/insert', data, 'POST');

/**
 * 获取蜘蛛表
 */

export const getAll = data => fetch('/spider/getAll', data, 'POST');

/**
 * 删除一条spider记录
 */

export const deletespider = data => fetch('/spider/delete', data, 'POST');

/**
 * 更新一条spider数据
 */

export const updata = data => fetch('/spider/updata', data, 'POST');