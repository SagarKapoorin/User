import express from 'express'
import User from '../models/index.js'
import auth from '../middleware/auth.js'

const search = express.Router();

//for searching user
search.get('/',auth,async(req, res)=>{
  try {
    const {query}=req.query;
    console.log(query)
    const user=await User.findOne({ $or: [{ username: query },{ email: query }]}, '-password'); //not allowing passwords
    if (!user)return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default search;