import mongoose from "mongoose";

const connectToMongo = async(uri)=>{
    mongoose.connect(uri).then(c=>console.log(`Mongodb is connect to ${c.Collection.name}`)).catch((error)=>console.log(error));
};

export default connectToMongo;