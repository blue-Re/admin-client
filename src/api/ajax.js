import axios from 'axios'
import { message } from 'antd'
export default function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    let result
    // 1. 执行异步ajax请求
    if (type === "GET") {
      result = axios.get(url, {
        params: data
      })
    } else {
      result = axios.post(url, data)
    }
    // 2.成功调用resolve，失败调用reject
    result.then(res => {
      resolve(res.data)
    }).catch(err => {
      // reject(err)
      message.error("请求出错了 " + err.message)
    })
  })
}