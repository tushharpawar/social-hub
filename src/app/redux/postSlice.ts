import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name:"post",
    initialState:{
        posts:null,
        fetchedUserPosts:[],
    },
    reducers:{
        setPosts:(state,action)=>{
            state.posts = action.payload
        },
        setFetchedUserPosts:(state,action)=>{
            state.fetchedUserPosts = action.payload
        }
    }
})

export const {setPosts,setFetchedUserPosts} = postSlice.actions
export default postSlice.reducer