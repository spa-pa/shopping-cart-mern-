import axios from "axios";
import { CLEAR_CART, CLEAR_ORDER, CREATE_ORDER,FETCH_ORDERS } from "../type";


export const createOrder=(order)=>async(dispatch)=>{
    const headers ={
            "Content-Type":"application/json",
            "authorization":localStorage.getItem("token")
    }
    const dataPost =JSON.stringify(order)
    await axios.post("/api/orders",dataPost,{headers}).then((response) => {
        const data= response.data
    // alert(JSON.stringify(data))
        dispatch({
            type:CREATE_ORDER,
            payload:data
        })
        localStorage.removeItem("cartItems")

        dispatch({type:CLEAR_CART})
    })   
}

export const clearOrder =()=>(dispatch)=>{
    dispatch({type:CLEAR_ORDER})
}
export const fetchOrders = () => (dispatch) => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: FETCH_ORDERS, payload: data });
      });
  };