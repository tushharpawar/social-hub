import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name:'comment',
    initialState:{
        comments:[]
    },
    reducers:{
        setComment:(state,action) => {
            state.comments = action.payload
        },
    }

})

export const {setComment} = commentSlice.actions
export default commentSlice.reducer