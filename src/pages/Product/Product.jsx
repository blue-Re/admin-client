import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'


import AddUpdate from './AddUpdate'
import ProductDetail from './ProductDetail'
import ProductHome from './ProductHome'

import './Product.less'
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product" component={ProductHome} exact/>
        <Route path="/product/detail" component={ProductDetail}/>
        <Route path="/product/addUpdate" component={AddUpdate}/>
        <Redirect to="/product"/>
      </Switch>
    )
  }
}
