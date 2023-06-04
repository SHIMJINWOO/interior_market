// src/models/User.js
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
//이메일,이름,휴대폰번호,주소,생년월일?
const userSchema = new mongoose.Schema({
  title:{type:String, trim:true, required:true, maxLength:30,minLength:4},
  content:{type:String, trim:true, required:true},
  hashtags:[{type:String}],
  rating:Number,
  createdAt:{type:Date, required:true, default:Date.now},
});


const userModel = mongoose.model("User",userSchema);
export default userModel;
/*
class User {
  static async create({naverId, email, name}) {
    const [result] = await db.query(
      'INSERT INTO users (naverId, email, name) VALUES (?, ?, ?)',
      [naverId, email, name]
    );
    return result.insertId; // assuming your table has an auto-increment id column
  }

  static async findByEmail(email) {
    console.log('findByEmail called with email:', email);
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    console.log('findByEmail rows:', rows);
    return rows[0];
  }

  static async findByNaverId(naverId) {
    const [rows] = await db.query('SELECT * FROM users WHERE naverId = ?', [naverId]);
    return rows[0];
  }
}

User.findOrCreate = async function(profile) {
  // Find user
  const user = await this.findByNaverId(profile.naverId);
  // If user exists, return it
  if (user) return user;
  // If user doesn't exist, create it
  const newUser = await this.create(profile);
  return newUser;
};
*/
