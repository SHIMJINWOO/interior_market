import User from '../models/User.js';
import bcrypt from 'bcrypt';
import fetch from "node-fetch";

export const loginUser = async (req, res) => {
    console.log(req.body);
    const { Email: email, password } = req.body;
  
    try {
      const user = await User.findByEmail(email);
  
      if (!user) {
        return res.status(400).json({ error: 'Email not found' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password_hash);
  
      if (!passwordMatch) {
        return res.status(400).json({ error: 'Incorrect password' });
      }
  
      // Set session or cookie here, if needed
  
      res.json({ message: 'Login successful', user   });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while logging in' });
    }
};




//////////////////
export const joinUser = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  try {
    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    await User.create(email, name, phoneNumber, password);

    // Set session or cookie here, if needed

    res.json({ message: 'Registration successful', user: { email, name, phoneNumber } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering' });
  }
};



export const introduce = (req, res) => {
  res.render('introduce', { pageTitle: '서비스 소개', siteName: '인테리어 마켓' });
};


export const service = (req, res) => {
  res.render('service', { pageTitle: '제품소개', siteName: '인테리어 마켓' });
};  

