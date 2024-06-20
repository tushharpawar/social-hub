import mongoose,{Schema,Document} from "mongoose";
import { User } from "./User.model";

export interface Subscription extends Document {
    followers:User;
    following:User;
    createdAt: Date;
    updatedAt: Date;
}

export const SubscriptionSchema : Schema<Subscription> = new mongoose.Schema({
    following:{
        type:Schema.Types.ObjectId,//whom a user is following
        ref:"User",
    },
    followers:{
        type:Schema.Types.ObjectId,//whom a user is followed by
        ref:"User",
    }
},{timestamps:true})

const SubscriptionModel = mongoose.models.Subscription as mongoose.Model<Subscription> || mongoose.model<Subscription>("Subscription",SubscriptionSchema)

export default SubscriptionModel;
