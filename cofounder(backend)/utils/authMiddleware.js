import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
// const secretKey = process.env.GOOGLE_CLIENT_SECRET;

const secretKey = "your_secret_key";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // Unauthorized if no token provided

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.sendStatus(403); // Forbidden if token is invalid or expired
    }
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};
