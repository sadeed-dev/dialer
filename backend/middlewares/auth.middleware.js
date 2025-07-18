import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, jwtSecret);

    const user = await User.findOne({
      where: {
        id: decoded.id,
        // email: decoded.email, // Optional for extra safety
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};



// import jwt from 'jsonwebtoken';
// import jwksClient from 'jwks-rsa';
// import User from '../models/user.model.js';
// import dotenv from 'dotenv';
// dotenv.config();

// const tenantId = process.env.MICROSOFT_TENANT_ID;
// const clientId = process.env.MICROSOFT_CLIENT_ID;
// const jwtSecret = process.env.JWT_SECRET;

// const client = jwksClient({
//   jwksUri: `https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys`,
// });

// const getKey = (header, callback) => {
//   if (!header.kid) {
//     return callback(new Error('Missing KID in token header'));
//   }

//   client.getSigningKey(header.kid, (err, key) => {
//     if (err) return callback(err);
//     const signingKey = key.getPublicKey();
//     callback(null, signingKey);
//   });
// };

// export const authMiddleware = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
//   if (!token) return res.status(401).json({ message: 'No token provided' });

//   // ✅ 1. Try custom JWT first (for OTP login)
//   try {
//     const decoded = jwt.verify(token, jwtSecret);

//     const user = await User.findOne({ where: { id: decoded.id, mobile: decoded.mobile } });
//     if (!user) return res.status(404).json({ message: 'User not found in database' });

//     req.user = user;
//     return next();
//   } catch (err) {
//     console.log('Fallback to Microsoft token...');
//   }

//   // ✅ 2. Fallback to Microsoft token (RS256)
//   jwt.verify(
//     token,
//     getKey,
//     {
//       audience: clientId,
//       issuer: `https://login.microsoftonline.com/${tenantId}/v2.0`,
//       algorithms: ['RS256'],
//     },
//     async (err, decoded) => {
//       if (err) {
//         console.error('JWT Verification Error:', err.message);
//         return res.status(401).json({ message: 'Invalid token' });
//       }

//       const email = decoded.preferred_username || decoded.upn || decoded.email;
//       if (!email) return res.status(400).json({ message: 'Email not found in token' });
      
//       const user = await User.findOne({ where: { email } });
//       if (!user) return res.status(404).json({ message: 'User not found in database' });

//       req.user = user;
//       next();
//     }
//   );
// };
