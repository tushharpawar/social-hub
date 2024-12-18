import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name:"post",
    initialState:{
        posts:[],
        fetchedUserPosts:[],
    },
    reducers:{
        setPosts:(state,action)=>{
            state.posts = action.payload
        },
        setFetchedUserPosts:(state,action)=>{
            state.fetchedUserPosts = action.payload
        },
        resetPostSlice: () => {posts:null},
    },
})

export const {setPosts,setFetchedUserPosts,resetPostSlice} = postSlice.actions
export default postSlice.reducer