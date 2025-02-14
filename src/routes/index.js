import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/index.js'
import { registerSchema, loginSchema } from '../validation/index.js'
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();

//Register User
router.post('/register',async(req, res)=>{
  try {
    const validated=registerSchema.safeParse(req.body);
    if (!validated.success) {
        console.log("parsed data incorrect");
        res.status(400).json({ message: "Validation failed" });
        return;
      }
    const {username, email, password, fullName, gender, dateOfBirth, country}=validated.data;
    // console.log(validated)
    const existing=await User.findOne({ $or: [{ email }, { username }] });
    if (existing)return res.status(400).json({ message: 'User already exists' });
    const hashed=await bcrypt.hash(password, 10);
    const newUser=new User({ username, email, password: hashed, fullName, gender, dateOfBirth, country });
    // console.log(newUser)
    await newUser.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.errors || 'Invalid data' });
  }
});

// Login User
router.post('/login',async(req, res)=>{
  try {
    const validated=loginSchema.safeParse(req.body);
    if (!validated.success) {
        console.log("parsed data incorrect");
        res.status(400).json({ message: "Validation failed" });
        return;
      }
    const { email,password }=validated.data;
    // console.log(validated)
    const user=await User.findOne({ email });
    if (!user)return res.status(400).json({ message: 'Invalid credentials' });
    // console.log(user)
    const isMatch=await bcrypt.compare(password,user.password);
    if (!isMatch)return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id },process.env.JWT_SECRET);
    res.json({ token, user: { username: user.username, email: user.email, fullName: user.fullName } });
} catch (error) {
    res.status(500).json({ message: error.errors || 'Invalid data' });
  }
});
export default router;
