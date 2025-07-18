import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
} from '@mui/material';
import { PhoneAndroid } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useMutate from '../../hooks/use-mutate.hook';
import LoginMicrosoft from './LoginMicrosoft';

export default function LoginPage() {
  const [step, setStep] = useState(1); // Step 1 = enter mobile, Step 2 = enter OTP
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
      reset, // <-- add this

  } = useForm();

  const { mutate: sendOtp, isPending: sendingOtp } = useMutate({
    mutationKey: ['sendOtp'],
    api: `auth/send-otp`,
    method: 'POST',
    notify: true,
    pendingMessage: 'Sending OTP...',
    successMessage: 'OTP sent to your mobile',
    errorMessage: 'Failed to send OTP',
    onSuccess: () => setStep(2),
  });

  const { mutate: verifyOtp, isPending: verifyingOtp } = useMutate({
    mutationKey: ['verifyOtp'],
    api: `auth/verify-otp`,
    method: 'POST',
    notify: true,
    pendingMessage: 'Verifying...',
    successMessage: 'Login successful!',
    errorMessage: 'Invalid OTP',
    onSuccess: (data) => {
      localStorage.setItem('user', JSON.stringify(data?.data));
      navigate('/admin/leads');
    },
  });

  const handleSendOtp = ({ mobile }) => {
    setMobile(mobile);
    sendOtp({ mobile });
      reset({ mobile: "" }); // <-- clear mobile field

  };

  const handleVerifyOtp = ({ otp }) => {
    verifyOtp({ mobile, otp });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 600, color: 'primary.main', mb: 0.5 }}>
              Sales Leads Management
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Login using your mobile number or Microsoft account
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(step === 1 ? handleSendOtp : handleVerifyOtp)}
            sx={{ width: '100%' }}
          >
            {step === 1 ? (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Mobile Number"
                  {...register('mobile', {
                    required: 'Mobile number is required',
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: 'Enter a valid 10-digit mobile number',
                    },
                  })}
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneAndroid color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={sendingOtp}
                  sx={{ mt: 2, py: 1.2, fontWeight: 600, borderRadius: 2 }}
                >
                  {sendingOtp ? 'Sending OTP...' : 'Send OTP'}
                </Button>
              </>
            ) : (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Enter OTP"
                  {...register('otp', {
                    required: 'OTP is required',
                    pattern: {
                      value: /^\d{6}$/,
                      message: 'OTP should be 6 digits',
                    },
                  })}
                  error={!!errors.otp}
                  helperText={errors.otp?.message}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={verifyingOtp}
                  sx={{ mt: 2, py: 1.2, fontWeight: 600, borderRadius: 2 }}
                >
                  {verifyingOtp ? 'Verifying...' : 'Verify & Login'}
                </Button>
              </>
            )}
          </Box>

          {/* ✅ Microsoft login stays here */}
          <LoginMicrosoft />
        </Paper>
      </Box>
    </Container>
  );
}
