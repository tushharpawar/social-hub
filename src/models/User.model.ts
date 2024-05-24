import mongoose ,{Schema,Document, Mongoose} from "mongoose";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    fullName: string;
    avatar: string;
    isVarified: boolean;
    verificationCode: string;
    verifiCationCodeExpires: Date;
    posts: string[];   //TODO: change to Posts[] 
    createdAt: Date;
    updatedAt: Date;
}

// Define the User Schema

export const UserSchema : Schema<User> = new mongoose.Schema({
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        fullName: {
            type: String,
        },
        avatar:{
            type: String,
            required: [true, "Avatar is required"],
        },
        isVarified: {
            type: Boolean,
            default: false,
        },
        verificationCode: {
            type: String,
            required: [true, "Verification code is required"],
        },
        verifiCationCodeExpires: {
            type: Date,
            required: [true, "Verification code expiry date is required"],
        },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
}, { timestamps: true });

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", UserSchema);
export default UserModel;