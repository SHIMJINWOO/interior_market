import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    title:{type:String, trim:true, required:true, maxLength:30,minLength:2},
    content:{type:String, trim:true, required:true},
    hashtags:[{type:String}],
    rating:Number,
    createdAt:{type:Date, required:true, default:Date.now},
    reviewPicUrl: [String],
    owner: {type:mongoose.Schema.Types.ObjectId, required:true, ref : "User"},
});

reviewSchema.pre("save", async function(){
    console.log(this);
})

const reviewModel = mongoose.model("Review",reviewSchema);
export default reviewModel