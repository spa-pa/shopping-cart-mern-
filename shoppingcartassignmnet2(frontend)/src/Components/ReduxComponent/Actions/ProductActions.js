import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_PRICE, FILTER_PRODUCTS_BY_SIZE } from "../type";
import axios from "axios";

export const fetchProducts =()=>async(dispatch)=>{ 
    await  axios.get("/api/products").then((response) => {
        const data= response.data
        
        dispatch({
            type:FETCH_PRODUCTS,
            payload:data
        })
    })   
}

export const filterProducts =(products,size)=>(dispatch)=>{
    dispatch({
        type:FILTER_PRODUCTS_BY_SIZE,
        payload:{
            size:size,
            items:
            size=== "" ? products:
            products.filter(x=>x.availableSizes.indexOf(size)>0)
        }
    })
}

export const sortProducts=(filteredProducts,sort) =>(dispatch)=>{
 var sortedProducts =filteredProducts.slice()

// if(sort === "latest"){
//     sortedProducts.slice().sort((a,b)=>(a._id >b._id ?1 :-1))
// }
// else{
    sortedProducts=sortedProducts.slice().sort((a,b)=>
    
    sort === "highest" ?
            ((a.price < b.price) ? 1 : -1) :
            sort === "lowest" ?
              ((a.price > b.price) ? 1 : -1) :
              ((a._id > b._id) ? 1 : -1)
        
        )
// }


    dispatch({
        type:FILTER_PRODUCTS_BY_PRICE,
        payload:{
            sort:sort,
            items:sortedProducts
        }
    })
}