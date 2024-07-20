import {z} from "zod"

export const noteSchema= z.object({
        content:z.string()
        .min(1,"comment should not be less than 1 character")
        .max(130,"Only 130 characters are allowed")
})
