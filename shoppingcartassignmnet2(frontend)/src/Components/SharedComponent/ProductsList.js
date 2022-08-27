import React, { Component } from 'react'
import './Shared.css'
import FormatCurrency from './FormatCurrency';
import FilterProductsList from './FilterProductsList';
import CartList from './CartList';
import Modal from 'react-modal';
import {connect} from 'react-redux'
import  {fetchProducts} from '../ReduxComponent/Actions/ProductActions'
import  {addToCart} from '../ReduxComponent/Actions/CartActions'

class ProductsList extends Component {
  constructor(props) {

    super(props);
    this.state = {
      product:null
    }

  }
  componentDidMount(){
    

    this.props.fetchProducts()
    // alert(JSON.stringify(this.state.products))
  }
  // addToCart=(product)=>{
  //   const cartItems=this.state.cartItems.slice();
  //   let alreadyInCart =false ;
  //   cartItems.forEach((item)=>{
  //     if(item._id === product._id){
  //       item.count++;
  //       alreadyInCart =true;
  //     }

  //   });
  //   if(!alreadyInCart){
  //     cartItems.push({...product,count:1})
  //   }
  //   this.setState({cartItems})
  //   localStorage.setItem("cartItems",JSON.stringify(this.state.cartItems))

  // }
  // removeFromCart=(product)=>{
  //   const cartItems=this.state.cartItems.slice();
  //   this.setState({
  //     cartItems:cartItems.filter((x)=>x._id !== product._id)
  //   })
  //   localStorage.setItem("cartItems",JSON.stringify(cartItems.filter((x)=>x._id !== product._id)))

  // }
  // createOrder=(order)=>{
  //   alert(order.name)
  // }

  // sortProducts = (event) => {
  //   const sort = event.target.value;
  //   this.setState((state) => ({
  //     sort: sort,
  //     products: this.state.products.slice().sort((a, b) => (
  //       sort === "highest" ?
  //         ((a.price < b.price) ? 1 : -1) :
  //         sort === "lowest" ?
  //           ((a.price > b.price) ? 1 : -1) :
  //           ((a._id > b._id) ? 1 : -1)

  //     ))
  //   }))

  // }
  // filterProducts = (event) => {
  //   if (event.target.value === "") {
  //     this.setState({
  //       size: event.target.value,
  //       products: data.products
  //     })
  //   }
  //   else {
  //     this.setState({
  //       size: event.target.value,
  //       products: data.products.filter(
  //         (product) => product.availableSizes.indexOf(event.target.value)
  //           >= 0)

  //     })
  //   }
    
  // }
  openModal=(product)=>{
this.setState({product})
  }
  closeModal=()=>{
    this.setState({product:null})
  }
  render() {
    const {product}=this.state 
    return (
      <>
      
      <div className='main'>
      <FilterProductsList
          // count={!this.props.products ? 0 :this.props.products.length}
          // size={this.state.size}
          // sort={this.state.sort}
          // filterProducts={this.filterProducts}
          // sortProducts={this.sortProducts}
        />
      
        {!this.props.products ? (<div>Loading</div>):
        (
          
        <ul className='products'>
        {
          this.props.products.map((product) => (
            <li key={product._id}>
              <div className='product'>
                <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                </a>
                <div className='product-price'>
                  <div>{FormatCurrency(product.price)}</div>
                  <button className='button primary' 
                  onClick={()=>this.props.addToCart(product)}
                  >Add To Cart</button>

                </div>
              </div>

            </li>
          ))
        }

      </ul>)}
      
       
        
      </div>
      {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            {/* <Zoom> */}
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title}></img>
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Avaiable Sizes:{" "}
                    {product.availableSizes.map((x) => (
                      <span>
                        {" "}
                        <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{FormatCurrency(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(product)
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            {/* </Zoom> */}
          </Modal>
        )}
      <CartList />
      </>
    )
  }
}

export default connect((state) => ({ products: state.products.filteredItems  }),{
  fetchProducts,
  addToCart
})(ProductsList);