import { apiinstance } from "@/services/Api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export type Toffice={
    _id?:number,
    name:string,
    address:string,
    province:string,
    district:string,
    createdBy:string,
}

type TofficeList={
    officeList:Toffice[],
    loading:boolean,
    error:boolean,
}

const initialState: TofficeList={
    officeList:[],
    loading:false,
    error:false,
}

export const fetchOffices = createAsyncThunk("fetchOffices", async () => {
    const res = await apiinstance.get(`admin/offices`);
    return res.data;
 });

export const officeListSlice = createSlice({
    name:'officeList',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchOffices.pending, (state, action) => {
         state.loading = true;
        })
        builder.addCase(fetchOffices.fulfilled, (state, action) => {
         state.loading = false;
         state.officeList = action.payload;
        })
        builder.addCase(fetchOffices.rejected, (state, action) => {
         state.error =true;
        })
       }
})

export default officeListSlice.reducer
