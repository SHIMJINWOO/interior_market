import User from '../models/User.js';

export const home = (req, res) => {
    res.render('home', { pageTitle: 'Home', siteName: 'Daily Echo Check' });
  };
  
export const login = (req, res) => {
    res.render('login', { pageTitle: 'Login', siteName: 'Welcome to Daily Echo Check' });
  };

export const join = (req, res) => {
    return res.render('join', { pageTitle: 'Join', siteName: 'Welcome to Daily Echo Check New Member'});
  };
  
  