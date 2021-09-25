import React, { Component } from 'react'

import { Button, Card, message, Table, Modal } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import PubSub from 'pubsub-js'
import LinkButton from '../../components/Link-Button'
import { reqCategory, reqUpdateCategory } from '../../api';
import AddForm from './AddForm';
import UpdateForm from './UpdateForm';
export default class Category extends Component {
  state = {
    categorys: [],// 一级分类列表
    subCategorys: [], // 二级分类列表
    loading: false, //是否正在获取数据
    parentId: '0', // 当前需要显示的分类列表的父类id
    parentName: "", // 当前需要显示的分类列表的父类名称
    showStatus: 0, // 表示添加、更新的确认框是否显示 0 都不显示  1 显示添加  2 显示更新
  }

  // 初始化table的列数组
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => ( // 返回需要显示的界面标签
          <spam>
            <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
            {this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null}

          </spam>
        )
      },

    ];
  }
  // 显示指定一级分类对象的二级列表
  showSubCategorys = (category) => {
    // 先更新状态再请求数据
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => { // 回调函数会在状态更新且重新render后执行
      // 获取二级分类列表哦
      this.getCategorys()
    })

  }
  // 获取一级、二级 分类列表
  getCategorys = async () => {
    // 在发请求前，显示loading
    this.setState({ loading: true })
    // 取出父类的id
    const { parentId } = this.state
    let result = await reqCategory(parentId)
    // 请求完成后结束
    this.setState({ loading: false })

    if (result.status === 0) {
      const categorys = result.data
      // 更新状态
      if (parentId === '0') {
        // 更新一级分类数据
        this.setState({ categorys })
      } else {
        // 更新二级分类数据
        this.setState({
          subCategorys: categorys
        })
      }
    } else {
      message.error('获取信息失败!')
    }
  }
  // 显示指定一级分类列表
  showCategorys = () => {
    // 更新为显示一级列表的状态
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  // 点击后，隐藏确定框
  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  }
  // 点击显示后，展示添加确认框
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }
  // 点击显示后，展示修改的确定框
  showUpdate = (category) => {
    // 保存分类对象
    this.category = category
    this.setState({
      showStatus: 2
    })
  }

  // 添加分类
  addCategory = () => {
    // console.log('add');
    // 隐藏确定框
    this.setState({
      showStatus:0
    })
    // 收集数据，提交添加请求
    
    // 冲农信获取分类列表
  }
  // 更新分类
  updateCategory = async () => {
    console.log('update');
    // 隐藏确定框
    this.setState({
      showStatus:0
    })
    const categoryId = this.category._id
    let categoryName
    // 通过pubsub来接收categoryName名字
    PubSub.subscribe('categoryName',function(msg,category_Name){
      console.log(msg,categoryName);
      categoryName = category_Name
    })
    // 发起请求更新数据列表
    const result = await reqUpdateCategory({categoryId,categoryName})
    if (result.status === 0) {
      // 重新显示列表
      this.getCategorys()
    }
  }

  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getCategorys()
  }

  render() {
    // 读取state的状态
    const { categorys, subCategorys, parentId, parentName, loading, showStatus } = this.state
    // 读取指定的分类
    const category = this.category || {} // 如果换没有，指定一个空对象
    // console.log(category);
    // card的左侧
    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <ArrowRightOutlined style={{ marginRight: 5 }} />
        <span>{parentName}</span>
      </span>
    )
    // card的右侧
    const extra = (
      <Button type='primary' onClick={this.showAdd}>
        <PlusOutlined />添加
      </Button>
    )


    return (
      <div>
        <Card title={title} extra={extra} >
          <Table
            rowKey='_id'
            bordered dataSource={parentId === '0' ? categorys : subCategorys}
            columns={this.columns}
            loading={loading}
            pagination={{ defaultCurrent: 1, showQuickJumper: true }}
          />;
          <Modal title="添加分类" visible={showStatus === 1} onOk={this.addCategory} onCancel={this.handleCancel}>
            <AddForm categorys={categorys} parentId={parentId}/>
          </Modal>
          <Modal title="更新分类" visible={showStatus === 2} onOk={this.updateCategory} onCancel={this.handleCancel}>
            <UpdateForm categoryName={category.name} />
          </Modal>
        </Card>
      </div>
    )
  }
}
