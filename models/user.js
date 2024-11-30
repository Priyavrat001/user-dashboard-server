import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    }
},
{
    timestamps: true,
});

const User = mongoose.model("User", schema);

export default User;