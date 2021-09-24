import ajax from './ajax'
// 登陆
export const reqLogin = (username,password) => ajax('/login',{username,password},'POST')
// 添加用户
export const reqAddUser = (user)=> ajax('/manage/user/add',user,'POST')

// 请求天气的接口

