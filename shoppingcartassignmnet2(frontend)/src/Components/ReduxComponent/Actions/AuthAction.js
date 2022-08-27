import { USER_LOGIN, USER_LOGOUT, USER_SIGNUP } from "../type"
import axios from "axios";
import { toast } from "react-toastify";

export const userLogin=(user)=> async(dispatch)=>{
    const headers ={
        "Content-Type":"application/json"
}
    await  axios.post("/api/user/signin",user,{headers}).then((response) => {
        
        const data= response.data
    
        if(data.loginResponce==="User Not Register" ){
          
              dispatch({
                type:USER_LOGIN,
                payload:"User Not Register !"
            })
        }
        else{

            localStorage.setItem("token", data.validator);
            
            dispatch({
                type:USER_LOGIN,
                payload:"Success Login !"
            })
        }
        
    }).catch((error) => {
        
        dispatch({
            type:USER_LOGIN,
            payload:"User Not Register !"
        })
      });
   
}

export const usersignup=(user)=> async(dispatch)=>{
    const headers ={
        "Content-Type":"application/json"

}
    await  axios.post("/api/user/signup",user,{headers}).then((response) => {
        
        const data= response.data
        
    
        if(data.status==="Successfully registered" ){
          
              dispatch({
                type:USER_SIGNUP,
                payload:"Successfully registered !"
            })
        }
        else{
            
            
            dispatch({
                type:USER_SIGNUP,
                payload:"Something went to wrong !"
            })
        }
        
    }).catch((error) => {
        dispatch({
            type:USER_SIGNUP,
            payload:"Something went to wrong !"
        })

      });
   
}

