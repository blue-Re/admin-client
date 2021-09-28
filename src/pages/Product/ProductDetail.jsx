import React, { Component } from 'react'
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import LinkButton from '../../components/Link-Button'
import { reqCategoryName } from '../../api';
const Item = List.Item

export default class ProductDetail extends Component {
  state = {
    cName1: '',//一级分类名称
    cName2: '' //二级分类名称
  }


  async componentDidMount() {
    // 得到当前商品的分类id
    const { pCategoryId, categoryId } = this.props.location.state.product
    if (pCategoryId === '0') { // 一级分类下的商品
      const result = await reqCategoryName(categoryId)
      const cName1 = result.data.name
      this.setState({ cName1 })
    } else {  // 二级分类下的商品
      // 以下存在效率问题
      /* const result1 = await reqCategoryName(pCategoryId)
      const result2 = await reqCategoryName(categoryId) */

      // 使用Promise的并发请求
      const result = Promise.all([reqCategoryName(pCategoryId),reqCategoryName(categoryId)])
      const cName1 = result[0].data.name
      const cName2 = result[1].data.name
      this.setState({
        cName1,
        cName2
      })
    }
  }

  render() {
    // console.log(this.props.location.state);
    // 读取路由携带过来的product数据
    const { name, detail, desc, price } = this.props.location.state.product
    const { cName1, cName2 } = this.state
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <ArrowLeftOutlined style={{ color: 'green', marginRight: 15, fontSize: 20 }} />
        </LinkButton>
        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="left">商品名称</span>
            <span >{name}</span>
          </Item>
          <Item>
            <span className="left">商品描述</span>
            <span >{desc}</span>
          </Item>
          <Item>
            <span className="left">商品价格</span>
            <span >{price}元</span>
          </Item>
          <Item>
            <span className="left">所属分类</span>
            <span >{cName1} {cName2 ? '-->' + cName2 : ''}</span>
          </Item>
          <Item>
            <span className="left">商品图片</span>
            <span >
              <img src="../../../public/logo512.png" alt="" className="product-img" />
              <img src="" alt="" />
            </span>
          </Item>
          <Item>
            <span className="left">商品详情</span>
            <span >{detail}</span>
          </Item>
        </List>
      </Card>
    )
  }
}
