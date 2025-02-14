import jwt from 'jsonwebtoken';

const auth= (req, res, next) => {
  const token=req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });
  // console.log(token)
  try {
    const verified=jwt.verify(token, process.env.JWT_SECRET);
    req.user=verified;
    next();
  } catch(error){
    res.status(400).json({ message: 'Invalid token' });
  }
};

export default auth;