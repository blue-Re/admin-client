import React, { Component } from 'react'
import { Redirect ,Switch,Route} from 'react-router'
import memoryUtils from '../../utils/memoryUtils'
import { Layout,  } from 'antd';
import Header from '../../components/Header';
import LeftNav from '../../components/LeftNav';

import Home from '../Home/Home'
import Category from '../Category/Category'
import Product from '../Product/Product'
import Role from '../Role/Role'
import User from '../User/User'
import Line from '../Charts/Line'
import Pie from '../Charts/Pie'
import Bar from '../Charts/Bar'





const {  Footer, Sider, Content } = Layout;
export default class Admin extends Component {
  render() {
    const user = memoryUtils.user
    if (!user || !user._id) {
      return <Redirect to='/login' />
    }
    return (
      <Layout style={{height:'100%'}}>
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{backgroundColor:"green"}}>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path="/category" component={Category}/>
              <Route path="/product" component={Product}/>
              <Route path="/role" component={Role}/>
              <Route path="/user" component={User}/>
              <Route path="/charts/bar" component={Bar}/>
              <Route path="/charts/line" component={Line}/>
              <Route path="/charts/pie" component={Pie}/>
              <Redirect to="/home"/>
            </Switch>
          </Content>
          <Footer style={{textAlign:"center",color:'#ccc'}}>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}
