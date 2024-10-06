import mongoose,{Document,Schema} from "mongoose";

interface IUser extends Document{
    name:String;
}

const userSchema:Schema =new Schema({
    name:{type:String,required:true}
});

const User= mongoose.model<IUser>("User",userSchema);
export default User;