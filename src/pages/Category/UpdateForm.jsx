import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
import PubSub from 'pubsub-js'
const Item = Form.Item
export default class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }
  inputValue = (event) => {
    console.log(event.target.value);
  }

  // componentWillMount(){
    
  // }
  render() {
    // 读取分类初始值名字
    const { categoryName } = this.props
    // console.log(categoryName);
    // 发布消息
    PubSub.publish('categoryName',categoryName)
    return (
      <Form>
        <Item name="field" >
          <Input value={categoryName} onChange={this.inputValue} placeholder="请输入分类名称" />
        </Item>
      </Form>
    )
  }
}
