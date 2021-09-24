import { Modal } from 'antd'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import menuList from '../../config/menuConfig'
import { formatDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../../components/Link-Button';
import './index.less'
class index extends Component {
  state = {
    currentTime: formatDate(Date.now()),//当前时间字符串
    dayPictureUrl: '',//天气图片url
    weather: ''//天气的文本
  }
  getTime = () => {
    // 每隔一秒获取时间，更新状态数据
    this.timeStart = setInterval(() => {
      const currentTime = formatDate(Date.now())
      this.setState({ currentTime })
    }, 1000)
  }

  // 得到头部title
  getTitle = () => {
    // 获取当前路径
    const path = this.props.location.pathname
    let title
    menuList.forEach((item) => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }

  // 退出
  logout = () => {
    Modal.confirm({
      content: '确认退出吗？',
      onOk: () => {
        // 删除保存的user数据，跳转到登陆页面
        storageUtils.removeUser()
        memoryUtils.user = {}

        // 跳转
        this.props.history.replace('/login')
      }
    })
  }

  // 在模板挂载之后循环改变时间
  componentDidMount() {
    this.getTime(this.timeStart)
  }

  // 组件卸载之前删除定时器
  componentWillUnmount() {
    clearInterval()
  }

  render() {
    const { currentTime, dayPictureUrl, weather } = this.state
    // 获取用户名
    const username = memoryUtils.user.username
    // 获取页面的title
    const title = this.getTitle()
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{username}</span>
          <LinkButton href="javascript:" onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather" />
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(index)