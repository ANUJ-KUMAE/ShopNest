import { Login_Request, 
    Login_Success, 
    Login_Fail, 
    Clear_Error, 
    Logout_Success, 
    Logout_Fail,
    Load_LoginUser_Request,
    Load_LoginUser_Success,
    Load_LoginUser_Fail,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL
    } from "../Constants/LoginSignupConstant"

import {UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, CLEAR_ERRORS, RESET_UPDATE_PROFILE} from "../Constants/UpdateConstant"

const initialState = {
    loading:false,
    isAuthenticated:false,
    //user:{}
    user:null,
    error:null,
}

const updateInitialValue = {
    updateLoading:false,
    updateProfile:null,
    error:null,
}

const LoginReducer = (state=initialState, action) => {
    switch(action.type)
    {
        case Login_Request:
        case REGISTER_REQUEST:
        case Load_LoginUser_Request:
            return {
                loading:true,
                isAuthenticated:false
            }
        
        case Login_Success:
        case REGISTER_SUCCESS:
        case Load_LoginUser_Success:
            return {
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload,
                error:null,
            }

        case Logout_Success:
            return {
                loading:false,
                isAuthenticated:false,
                user:null,
                error:null,
            }

        case Logout_Fail:
            return {
                ...state,
                loading:false,
                isAuthenticated:false,
                error:action.payload
            }
        
        case Load_LoginUser_Fail:
            return {
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
            }
        
        case Login_Fail:
        case REGISTER_FAIL:
            return {
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
            }

        case Clear_Error:
            return {
                ...state,
                error:null
            }
        
         default:
            return state; 
    }
}

const UpdateProfile = (state=updateInitialValue,  action) => {
    
    switch(action.type)
    {
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                updateLoading:true,
            }
        
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                updateLoading:false,
                updateProfile:action.payload,
                error:null

            }
        
        case RESET_UPDATE_PROFILE:
            return{
                ...state,
                updateProfile:null,
                error:null
            }

        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                updateLoading:false,
                error:action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }

        default:
            return state
    }

}

export {LoginReducer,UpdateProfile}