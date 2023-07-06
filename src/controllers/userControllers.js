import userModel from '../models/User.js';
import reviewModel from "../models/Review.js";
import bcrypt from 'bcrypt';
import fetch from "node-fetch";
import { async } from 'regenerator-runtime';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({email, socialOnly:false});
      if (!user) {
        return res.status(400).json({ error: 'Email not found' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(400).json({ error: 'Incorrect password' });
      }
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
      //res.json({ message: 'Login successful', user   });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while logging in' });
    }
};

//////////////////
export const joinUser = async (req, res) => {
  const { email, password, password2, name, phoneNumber } = req.body;
  if (password !== password2){
    return res.status(404).render("join",
    {errorMessage: "비밀번호가 일치하지 않습니다",
  }); 
  }
  const exists = await userModel.exists({ $or: [{ email }] });
  if (exists) {
      return res.status(404).render("join", {
        errorMessage: "This username/email is already taken.",
      });
    }
    try {
      await userModel.create({
        email, name, phoneNumber, password
      });
      return res.redirect("/login");
    } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering' });
}};

export const startNaverLogin= (req,res) =>{
  const client_id = process.env.NAVER_ID;
  const redirectURI = process.env.NAVER_REDIRECT;
  const state = process.env.NAVER_STATE;
  const api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
  //res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  return res.redirect(api_url);
}

export const callbackNaverLogin=async (req,res) =>{
  const client_id = process.env.NAVER_ID;
  const client_secret = process.env.NAVER_SECRET;
  const redirectURI = process.env.NAVER_REDIRECT;
  const code = req.query.code;
  const state = req.query.state;
    let api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
     + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
     };
    const tokenRequest  = await( 
      await fetch(api_url,{
      method:"POST",
      headers:{
        Accept: "application/json",
      },
    })).json();
    
    if("access_token" in tokenRequest){
      const {access_token} = tokenRequest;
      //const header = "Bearer " + access_token;
      const apiUrl = 'https://openapi.naver.com/v1/nid/me'
      const userData = await (
        await fetch(`${apiUrl}`,{
        headers:{
        Authorization:`Bearer ${access_token}`
        },
      })).json();
      const emailData = userData.response.email
      let user = await userModel.findOne({email: emailData})
      if (!user){
        user = await userModel.create({
          email:userData.response.email,
          name:userData.response.name,
          phoneNumber:userData.response.mobile,
          password:"",
          socialOnly: true,
        });
      } 
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/")
    } else{
      return res.redirect("/login")
    }
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.redirect("/")
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
  };
  
  
  export const logOut = (req,res) =>{
    req.session.destroy();
    return res.redirect("/")
  }

  
  export const userGetEdit = async (req,res) =>{
    const loggedInUser = req.session.user;
    return res.render('edit-profile', {pageTitle: '내 정보 수정', loggedInUser });
};
export const userPostEdit = async (req,res) =>{
  const {
    session: {
      user: { _id },
    },
    body: { name,phoneNumber },
  } = req;
  const updatedUser = await userModel.findByIdAndUpdate(
    _id,{
      name,phoneNumber
  },
  { new: true });
  req.session.user = updatedUser;
  return res.redirect("/users/edit-profile");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    return res.redirect("/");
  }
  return res.render("users/change-password", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;
  const user = await userModel.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The current password is incorrect",
    });
  }
  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The password does not match the confirmation",
    });
  }
  user.password = newPassword;
  await user.save();
  return res.redirect("/users/logout");
};

export const profileRead =async (req,res) =>{
  const { id } = req.params;
  const user = await userModel.findById(id).populate("reviews");
  if(!user){
    return res.status(404).render("404");
  }
  const reviews = await reviewModel.find({owner: user._id});
  return res.render('users/profile', {user, reviews})
}


export const introduce = (req, res) => {
  res.render('introduce', { pageTitle: '서비스 소개', siteName: '인테리어 마켓' });
};


export const service = (req, res) => {
  res.render('service', { pageTitle: '제품소개', siteName: '인테리어 마켓' });
};  