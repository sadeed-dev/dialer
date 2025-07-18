const otpStore = new Map();

export const saveOtp = (mobile, otp) => {
  otpStore.set(mobile, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 mins
  });
};

export const getOtp = (mobile) => otpStore.get(mobile);
export const deleteOtp = (mobile) => otpStore.delete(mobile);
