import { createSlice } from "@reduxjs/toolkit"


type DashboardTypes={
    trial:{},
    written:{},
    medical:{},
    totalCount:{
        Medical:number,
        Trial:number,
        Written:number
    },
}

const initialState: DashboardTypes={
   trial:{},
    written:{},
    medical:{},
    totalCount:{
        Medical:0,
        Trial:0,
        Written:0
    },
}
export const publicDasboard = createSlice({
    name:'Publicdashboard',
    initialState,
    reducers:{
       setTotalCount:(state,action)=>{
            state.totalCount=action.payload
       },
         setTrial:(state,action)=>{
              state.trial=action.payload
         },
            setWritten:(state,action)=>{
                state.written=action.payload
            },
            setMedical:(state,action)=>{
                state.medical=action.payload
            }
    }
})

export const {setTotalCount, setMedical, setTrial, setWritten}=publicDasboard.actions;
export default publicDasboard.reducer;