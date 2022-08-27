import React, { Component } from 'react'
import ProductsList from '../SharedComponent/ProductsList'
import Footer from "./Footer";
import Header from "./Header";



import './Structure.css'


export default class Main extends Component {
  render() {
    return (
     
    <div className="grid-container">
     <Header/>
     <div className='content' style={{marginBottom:"1%"}}>
        <ProductsList/>
        
      </div>
     <Footer/>
    </div>
   
      
    )
  }
}
