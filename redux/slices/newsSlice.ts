import { INews } from "@/models/NewsModel";
import { apiinstance } from "@/services/Api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


type TNewsState={
    newsList:INews[],
    loading:boolean,
    error:boolean,
}

const initialState:TNewsState={
    newsList:[],
    loading:false,
    error:false,
}

export const fetchNews = createAsyncThunk("fetchNews", async () => {
    const res = await apiinstance.get(`admin/news`);
    return res.data;
 });

export const newsListSlice = createSlice({
    name:'newsList',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchNews.pending, (state, action) => {
         state.loading = true;
        })
        builder.addCase(fetchNews.fulfilled, (state, action) => {
         state.loading = false;
         state.newsList = action.payload;
        })
        builder.addCase(fetchNews.rejected, (state, action) => {
         state.error =true;
        })
       }
})

export default newsListSlice.reducer
