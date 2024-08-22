import {z} from "zod"

export const noteSchema= z.object({
        content:z.string().min(1,"Note cant'be empty").max(500,"Only 300 characters allowed")
})