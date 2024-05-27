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
    allNews:{
        loading:boolean,
        news:INews[]}
}

const initialState:TNewsState={
    adminNewsList:[],
    newsList: null,
    loading:false,
    error:false,
    allNews:{
        loading:false,
        news:[]
    }
}

export const fetchNews = createAsyncThunk("fetchNews", async ({from, to}:{ to:string, from:string }) => {
    const res = await apiinstance.get(`user/news?start=${from}&end=${to}`);
    return res.data;
 });

export const fetchallNews = createAsyncThunk("fetchallNews", async ({from, to}:{ to:string, from:string }) => {
    const res = await apiinstance.get(`user/news/all?start=${from}&end=${to}`);
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
        builder.addCase(fetchallNews.pending, (state, action) => {
         state.allNews.loading = true;
        })
        builder.addCase(fetchallNews.fulfilled, (state, action) => {
         state.allNews.loading = false;
         state.allNews.news = action.payload;
        })
        builder.addCase(fetchallNews.rejected, (state, action) => {
         state.error =true;
        })
       }, 
})

export default newsListSlice.reducer
