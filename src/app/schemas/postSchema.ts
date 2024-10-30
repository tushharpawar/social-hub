import {z} from "zod"

export const postSchema= z.object({
        postUrl:z.string(),
        caption:z.string(),
        likeCount:z.number()
})