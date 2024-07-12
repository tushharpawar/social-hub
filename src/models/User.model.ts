import mongoose ,{Schema,Document, Mongoose, ObjectId} from "mongoose";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    fullName: string;
    avatar: string;
    isVerified: boolean;
    verificationCode: string;
    verifiCationCodeExpires: Date;
    posts: ObjectId;   
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
            public_id:String,
            url:String,
        },
        isVerified: {
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
}, { timestamps: true });

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", UserSchema);
export default UserModel;