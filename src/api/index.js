import ajax from './ajax'
// 登陆
export const reqLogin = (username,password) => ajax('/login',{username,password},'POST')
// 添加用户
export const reqAddUser = (user)=> ajax('/manage/user/add',user,'POST')

// 获取分类列表(一级或二级)
export const reqCategory = (parentId)=>ajax('/manage/category/list',{parentId})

// 添加分类
export const reqAddCategory = (categoryName,parentId)=>ajax('/manage/category/add',{categoryName,parentId},'POST')

// 更新分类
export const reqUpdateCategory = ({parentId,categoryName})=>ajax('/manage/category/update',{parentId,categoryName})