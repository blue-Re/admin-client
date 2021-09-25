import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option
export default class AddForm extends Component {
  static propTypes = {
    categorys:PropTypes.array.isRequired, // 一级分类的数组
    parentId:PropTypes.string.isRequired  // 父分类的id
  }

  onCurrencyChange = (newCurrency) => {
    console.log(newCurrency);
  }
  inputValue = (event) => {
    console.log(event.target.value);
  }
  render() {
    // 取出数据
    const {categorys,parentId} = this.props
    return (
      <Form>
        <Item name="field" initialValue={parentId}>
          <Select onChange={this.onCurrencyChange}>
            <Option value="0">一级分类</Option>
            {/* <Option value="1">电脑</Option>
            <Option value="2">图书</Option> */}
            {
              categorys.map(c=><Option value={c._id}>{c.name}</Option>)
            }
          </Select>
        </Item>

        <Item name="field1">
          <Input onChange={this.inputValue} placeholder="请输入分类名称" />
        </Item>
      </Form>
    )
  }
}
