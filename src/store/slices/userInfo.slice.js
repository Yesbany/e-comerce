import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce } from "../../utils/configAxios";
import { setProductsCartGlobal } from "./cart.slice";

const initialState = {
    user: {
        id: 0,
        firstName:  "",
        lastName: "",
        email: "",
        phone: "",
        createdAt: "",
        updatedAt: "",
    }, 
    token: "",
}

export const  userInfoSlice = createSlice({
    name: "userInfo",
    initialState: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : initialState,
    reducers: {
        setUserInfoGlobal: (state, action) => {
            return action.payload
        }
    }
})

export const {setUserInfoGlobal} = userInfoSlice.actions

export const loginUser = (data) => (dispatch) => {
    axiosEcommerce
        .post("/users/login", data)
        .then((res) => {
            localStorage.setItem("userInfo", JSON.stringify(res.data))
            dispatch(setUserInfoGlobal(res.data))
            
        })
        .catch((err) => console.log(err))
}

export const userLogOut = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch(setUserInfoGlobal(initialState))
    dispatch(setProductsCartGlobal([]))
}

export default userInfoSlice.reducer