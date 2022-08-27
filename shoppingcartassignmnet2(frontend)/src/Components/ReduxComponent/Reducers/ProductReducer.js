import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_PRICE, FILTER_PRODUCTS_BY_SIZE } from "../type";

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
        
            return { items: action.payload,filteredItems:action.payload };
        case FILTER_PRODUCTS_BY_SIZE:
            return{
                ...state,
                size:action.payload.size,
                filteredItems:action.payload.items
            }  
            case FILTER_PRODUCTS_BY_PRICE:
                
                return{
                    ...state,
                    filteredItems:action.payload.items
                }  
        default:
            return state;
    }
}