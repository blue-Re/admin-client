import React, { Component } from 'react'

import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

import './login.less'
import { Redirect } from 'react-router';
export default class Login extends Component {
  // 提交表单，请求登陆
  onFinish = async (values) => {
    // console.log('Success:', values);
    const { username, password } = values
    let result = await reqLogin(username, password)
    // console.log(result.data);
    if (result.status === 0) {
      message.success('登陆成功！')

      // 保存user
      const user = result.data
      memoryUtils.user = user
      storageUtils.saveUser(user)

      // 跳转页面
      this.props.history.replace('/')
    } else {
      message.error(result.msg)
    }
  };

  render() {
    const user = memoryUtils.user
    // 判断用户是否登录
    if (user && user._id) {
      return <Redirect to="/admin" />
    }
    return (
      <div className="login">
        <header className="login-header">
          <img src="https://www.cisau.com.cn/images/zhuye/head.png" alt="logo" />
          <h1>React项目:后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登陆</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入用户名!', },
                { max: 12, message: '用户名长度不可超过12位数' },
                { min: 4, message: '用户名最小长度不能小于4' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名密码必须是英文、数字、下划线组成' }
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码!', },
                { max: 12, message: '密码长度不可超过12位数' },
                { min: 4, message: '密码最小长度不能小于4' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名密码必须是英文、数字、下划线组成' }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
