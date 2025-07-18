import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { sendOtpService,verifyMicrosoftTokenAndLogin, verifyOtpService } from '../services/auth.service.js'
import LoginLog from '../models/loginLog.model.js'

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check user exists
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Compare password
    // const isMatch = await bcrypt.compare(password, user.password);
       const isMatch = password === user.password;

    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Create token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({ token, user: { id: user.id, email: user.email } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



const jwtSecret = process.env.JWT_SECRET;

export const microsoftLogin = async (req, res) => {
  try {
    const idToken = req.headers.authorization?.split(' ')[1]; // Bearer <id_token>
    if (!idToken) return res.status(401).json({ message: 'No Microsoft token provided' });

    const result = await verifyMicrosoftTokenAndLogin(idToken);

    
    // ✅ Log successful Microsoft login
    await LoginLog.create({
      userId: result.user.id,
      ipAddress: req.ip,
      status: 'success',
      loginTime: new Date(),
    });
    
    return res.json({
      message: 'Microsoft login successful',
      data: result, // { token, user }
    });
  } catch (error) {
    console.error("Microsoft login error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};






export const sendOtp = async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ message: 'Mobile Number is required' });

  try {
    await sendOtpService(mobile);
    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Failed to send OTP' });
  }
};


export const verifyOtp = async (req, res) => {
  const { mobile, otp } = req.body;
  if (!mobile || !otp) {
    return res.status(400).json({ message: 'Mobile and OTP are required' });
  }
  try {
    const { user, token } = await verifyOtpService(mobile, otp);
  // ✅ Log success
    await LoginLog.create({
      userId: user.id,
      ipAddress: req.ip,
      status: 'success',
      loginTime: new Date(),
    });

    res.json({
      message: 'OTP verified successfully',
      data: {
        user,
        token,  
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


