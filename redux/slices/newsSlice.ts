import { apiinstance } from "@/services/Api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export type INews = {
    _id?: string | undefined;
    title: string;
    description: string;
    img: string;
    category: string;
    createdBy: {_id:string, name: string } | undefined;
    date: Date;
}

type TNewsState={
    adminNewsList:INews[],
    newsList:{ featured:INews[], general:INews[], featuredall:INews[] } | null,
    loading:boolean,
    error:boolean,
}

const initialState:TNewsState={
    adminNewsList:[],
    newsList: null,
    loading:false,
    error:false,
}

export const fetchNews = createAsyncThunk("fetchNews", async () => {
    const res = await apiinstance.get(`user/news`);
    return res.data;
 });
 export const fetchAdminNews = createAsyncThunk("fetchAdminNews", async ({to, from, category}:{to:string, from:string, category:string}) => {
    const res = await apiinstance.get(`admin/news?to=${to}&from=${from}&category=${category}`);
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
        builder.addCase(fetchAdminNews.pending, (state, action) => {
         state.loading = true;
        })
        builder.addCase(fetchAdminNews.fulfilled, (state, action) => {
         state.loading = false;
         state.adminNewsList = action.payload;
        })
        builder.addCase(fetchAdminNews.rejected, (state, action) => {
         state.error =true;
        })
       }, 
})

export default newsListSlice.reducer
