import React, { Component } from 'react'

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.less'
export default class Login extends Component {

  onFinish = (values) => {
    console.log('Success:', values);
  };

  render() {
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
                {required: true,message: '请输入用户名!',},
                {max:12,message:'用户名长度不可超过12位数'},
                {min:4,message:'用户名最小长度不能小于4'},
                {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名密码必须是英文、数字、下划线组成'}
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {required: true,message: '请输入密码!',},
                {max:12,message:'密码长度不可超过12位数'},
                {min:4,message:'密码最小长度不能小于4'},
                {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名密码必须是英文、数字、下划线组成'}
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
