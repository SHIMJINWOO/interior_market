// src/models/User.js
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
//이메일,비밀번호,이름,휴대폰번호,주소,생년월일?
const userSchema = new mongoose.Schema({
  email:{type:String, trim:true, required:true, unique: true},
  password:{type:String, trim:true},
  name:{type:String, required:true},
  phoneNumber:{type:String, required:true},
  socialOnly:{type:Boolean, default:false},
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

userSchema.pre("save", async function(){
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
})

const userModel = mongoose.model("User",userSchema);
export default userModel;