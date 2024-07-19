import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String},
    desc: {type: String},
    joinedOn: {type: Date, default: Date.now},
    points: {type: Number, default: 0}  // New field for points
});


export default mongoose.model("User",userSchema)

