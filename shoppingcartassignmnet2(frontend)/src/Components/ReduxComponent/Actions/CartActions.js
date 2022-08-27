import { ADD_TO_CART, REMOVE_FROM_CART } from "../type";

export const addToCart =(product)=>(dispatch,getState)=>{
    // alert((getState().cart.cartItems).length)
    let alreadyExists=false;
    
    const cartItems =getState().cart.cartItems.slice()
    cartItems.forEach((x)=>{
        if(x._id===product._id) {
            alreadyExists=true;
            x.count++;
        }
    })
    if(!alreadyExists){
        cartItems.push({...product,count:1});
    }

    dispatch({
        type:ADD_TO_CART,
        payload:{cartItems},
    })
localStorage.setItem("cartItems",JSON.stringify(cartItems))

}

export const removeFromCart =(product)=>(dispatch,getState)=>{
    const cartItems =getState().cart.cartItems.slice().filter(
        x =>x._id !==product._id
    )

    dispatch({
        type:REMOVE_FROM_CART,
        payload:{cartItems}
    })
    
localStorage.setItem("cartItems",JSON.stringify(cartItems))
    

}