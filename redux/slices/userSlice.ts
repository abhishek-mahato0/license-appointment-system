import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TUser={
    name:string;
    email:string;
    token:string;
    information_id?:string;
    citizenship_id?:string;
    license_id?:string;
    role:string;
    _id:string;
    office?:string;
    province?:string;
}
const initialState:TUser={
    name:"",
    email:"",
    token:"",
    role:"",
    _id:"",
    office:"",
    province:""
}

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action:PayloadAction<TUser>)=>{
            state.name=action.payload.name || "";
            state.email=action.payload.email || "";
            state.token=action.payload?.token || "";
            state.role=action.payload?.role || "";
            state._id=action.payload?._id || "";
            state.office=action.payload?.office || "";
            state.province=action.payload?.province || "";
        },
        removeUser:(state)=>{
            state.name="";
            state.email="";
            state.token="";
            state.role="";
            state._id="";
            state.office="";
            state.province="";
        }
    }
})

export const {setUser,removeUser}=userSlice.actions;
export default userSlice.reducer;