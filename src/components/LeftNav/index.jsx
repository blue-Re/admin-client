import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import menuList from '../../config/menuConfig';
import { Menu } from 'antd';

import './index.less'

const { SubMenu } = Menu;

class index extends Component {
  state = {
    collapsed: false,
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  // 根据menu的数据数组生成对应的标签数组
  // 使用map+递归调用
  getMenuNodes_map = (menuList) => {
    return menuList.map((item) => {
      if (!item.children) {
        return <Menu.Item key={item.key} icon={item.icon}><Link to={item.key}>{item.title}</Link></Menu.Item>
      } else {
        return <SubMenu key={item.key} icon={item.icon} title={item.title}>
          {this.getMenuNodes_map(item.children)}
        </SubMenu>
      }
    })
  }
  // 使用reduce+递归调用
  getMenuNodes_reduce = (menuList) => {
    const currentPath = this.props.location.pathname
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push((<Menu.Item key={item.key} icon={item.icon}><Link to={item.key}>{item.title}</Link></Menu.Item>))
      } else {
        // 查找与当前请求路劲匹配的子item
        const cItem = item.children.find(cItem => currentPath.indexOf(cItem.key) === 0)
        if (cItem) {
          this.openKey = item.key
        }

        pre.push((<SubMenu key={item.key} icon={item.icon} title={item.title}>
          {this.getMenuNodes_map(item.children)}
        </SubMenu>))
      }
      return pre
    }, [])
  }

  // 在第一次render之前调用一次
  componentWillMount() {
    this.menuNodes = this.getMenuNodes_reduce(menuList)
  }

  render() {
    // 得到当前请求的路径
    let currentPath = this.props.location.pathname
    // 得到需要打开菜单项的key
    const openKey = this.openKey

    if (currentPath.indexOf('/product') === 0) { // 说明当前请求的是商品或其子路由界面
      currentPath = '/product'
    }

    return (
      <div>
        <div className="left-nav">
          <Link to="/" className="left-nav-header">
            <img src="https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/baike/w=268;g=0/sign=e2708ab5f11986184147e88272d6494e/f2deb48f8c5494eea17400cd24f5e0fe98257e8b.jpg" alt="" />
            <h1>信院后台</h1>
          </Link>
          <Menu
            selectedKeys={[currentPath]}
            defaultOpenKeys={[openKey]}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
          >
            {/* 显示路由节点 */}
            {this.menuNodes}
          </Menu>
        </div>
      </div>
    )
  }
}
export default withRouter(index)
