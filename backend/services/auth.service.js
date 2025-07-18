import User from "../models/user.model.js";
import axios from "axios";
import Otp from '../models/otp.model.js';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import dotenv from 'dotenv';
dotenv.config();

const tenantId = process.env.MICROSOFT_TENANT_ID;
const clientId = process.env.MICROSOFT_CLIENT_ID;
const jwtSecret = process.env.JWT_SECRET;

const client = jwksClient({
  jwksUri: `https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys`,
});

const getKey = (header, callback) => {
  if (!header.kid) return callback(new Error('Missing KID in token header'));

  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
};

export const verifyMicrosoftTokenAndLogin = (idToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      idToken,
      getKey,
      {
        audience: clientId,
        issuer: `https://login.microsoftonline.com/${tenantId}/v2.0`,
        algorithms: ['RS256'],
      },
      async (err, decoded) => {
        if (err) return reject(new Error('Invalid Microsoft token'));

        const email = decoded.preferred_username || decoded.upn || decoded.email;
        const name = decoded.name;
        const microsoftId = decoded.oid;

        if (!email || !microsoftId) {
          return reject(new Error('Missing data in Microsoft token'));
        }

        let user = await User.findOne({ where: { microsoftId } });

        if (!user) {
          user = await User.create({ microsoftId, email, name });
        } else {
          user.email = email;
          user.name = name;
          await user.save();
        }

        const token = jwt.sign(
          { id: user.id, email: user.email },
          jwtSecret,
          { expiresIn: '12h' }
        );

        resolve({ token, user });
      }
    );
  });
};





const API_KEY = 'sNZXvUWaSQJa';

const JWT_SECRET = process.env.JWT_SECRET || 'dsdhkkjkhsdtrbcmnsdffnssdfsddf';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '12h';

export const sendOtpService = async (mobile) => {
  const user = await User.findOne({ where: { mobile } });
  if (!user) throw new Error('Mobile number is not registered');

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
const message = `Your login OTP is ${otp}. It is valid for 5 minutes. Please do not share it with anyone.`;

  await axios.get('http://api.textmebot.com/send.php', {
    params: {
      recipient: `+91${mobile}`,
      apikey: API_KEY,
      text: message,
    },
  });

  // Save OTP in DB
  await Otp.upsert({
    mobile,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });
};


export const verifyOtpService = async (mobile, otp) => {
  const record = await Otp.findOne({
    where: { mobile },
    order: [['createdAt', 'DESC']],
  });

  if (!record) throw new Error('No OTP found. Please request again.');

  if (new Date() > record.expiresAt) {
    await Otp.destroy({ where: { mobile } });
    throw new Error('OTP expired');
  }

  if (record.otp !== otp) {
    throw new Error('Invalid OTP');
  }

  await Otp.destroy({ where: { mobile } });

  // ✅ Fetch full user details, excluding password
  const user = await User.findOne({
    where: { mobile },
    attributes: { exclude: ['password'] },
  });

  if (!user) throw new Error('User not found or not registered');

  // ✅ Generate token
  const token = jwt.sign(
    { id: user.id, mobile: user.mobile },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { user, token };
};

