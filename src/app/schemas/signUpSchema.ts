import {z} from "zod"

export const signUpSchema = z.object({
    username:z.string()
    .min(2,"Usernameshould not be less than 2 characters")
    .max(15,"Username must be less than 15 characters")
    .regex(/^[a-z][a-z0-9._]+$/,'Username must not contain special characters')
    .toLowerCase()
    ,

    email:z.string().email({message:"Invalid email address"}),

    password:z.string().min(8,{message:"Password should not be less than 8 characters"}),

    fullName:z.string(),
})