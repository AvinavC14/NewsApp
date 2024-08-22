import React, { Component } from 'react'
import Rhombus from './Rhombus.gif';
export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={Rhombus}/>
      </div>
    )
  }
}
