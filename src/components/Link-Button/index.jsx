import React from 'react'
import './index.less'
// 定义一个自定义按钮，用于跳转
export default function index(props) {
  return (<button {...props} className="link-button"></button>)
}
