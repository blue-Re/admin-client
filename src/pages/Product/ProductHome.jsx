import React, { Component } from 'react'
import { Card, Select, Input, Button, Table, message } from 'antd';
import LinkButton from '../../components/Link-Button'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api';

const Option = Select.Option


export default class ProductHome extends Component {
  state = {
    total: 0,//商品的总数量
    products: [],//商品数组
    loading: false,
    searchName: '',//搜索关键字
    searchType: 'productName',//根据哪个字段搜索


  }

  /* 初始化table的列数组 */
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '￥' + price
      },
      {
        width: 100,
        title: '状态',
        // dataIndex: 'status',
        render: (product) => {
          const { status, _id } = product
          return (
            <span>
              <Button type="primary" onClick={()=>this.updateStatus(_id, status === 1 ? 2 : 1)}>{status === 1 ? '下架' : '上架'}</Button>
              <span>{status === 1 ? '在售' : '已下架'}</span>
            </span>
          )
        }
      },
      {
        width: 100,
        title: '操作',
        render: (product) => {
          return (
            <span>
              <LinkButton onClick={() => this.props.history.push('/product/detail', { product })}>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          )
        }
      },
    ]
  }
  /* 获取指定页码的数据 */
  getProducts = async (pageNum) => {
    this.pageNum = pageNum // 保存pageNum 让其他方法都可以看见
    this.setState({ loading: true }) // 显示loading
    let result
    const { searchName, searchType } = this.state
    if (searchName) {
      result = await reqSearchProducts({ pageNum, pageSize: 3, searchName, searchType })
    } else {
      result = await reqProducts(pageNum, 3)
    }

    this.setState({ loading: false })//隐藏loading
    if (result.status === 0) {
      const { total, list } = result.data
      this.setState({
        total,
        products: list
      })
    }
  }

  // 更新指定商品的状态
  updateStatus = async (productId,status)=>{
    const result= await reqUpdateStatus(productId,status)
    if (result.status === 0) {
      message.success('更新状态成功！！！')
      this.getProducts(this.pageNum)
    }
  }

  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getProducts(1)
  }
  render() {





    // 取出状态
    const { products, total, loading, searchType, searchName } = this.state
    const title = (
      <span>
        <Select value={searchType} style={{ width: 120 }} onChange={value => this.setState({ searchType: value })}>
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input placeholder="关键字" style={{ width: 150, margin: '0 15px' }} value={searchName} onChange={event => this.setState({ searchName: event.target.value })} />
        <Button type="primary" onClick={() => this.getProducts(1)}>搜索</Button>
      </span>
    )
    const extra = (
      <Button type="primary">按钮</Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          loading={loading}
          dataSource={products}
          columns={this.columns}
          pagination={{ total: total, defaultPageSize: 3, onChange: this.getProducts, showQuickJumper: true }} />;
      </Card>
    )
  }
}
