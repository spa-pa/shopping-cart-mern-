import { USER_LOGIN, USER_SIGNUP } from "../type";


export const authReducer=(state={user:" "},action)=>{
   
    switch(action.type){
        case USER_LOGIN:
        return {
            user:action.payload
        }
        case USER_SIGNUP:
        return {
            user:action.payload
        }
        
        default :
        return state
    }
}