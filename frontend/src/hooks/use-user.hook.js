import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useFetch from './use-fetch.hook';
import useMutate from './use-mutate.hook';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const user = JSON.parse(localStorage.getItem('user'));

  
export const useGetAllUsers = (filters = {}) => {
  const params = new URLSearchParams(filters).toString();

  return useFetch({
    queryKey: ['all-users', filters],
    api: `user/get-users?${params}`,
    auth: true,
    backend: true,
  });
};





export const useGetUser = (id) => {
  return useFetch({
    queryKey: ['user'],
    api: `user/get-user/${id}`, 
    auth: true,
    backend: true,
  });
};








  export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutate({
      mutationKey: ['update-user'],
      api: ({ id }) => `/user/update/${id}`, // ✅ dynamic URL
      method: 'PATCH',
      notify: true,
      getBody: ({ data }) => data,
      pendingMessage: 'updating...',
      successMessage: 'User update successfully!',
      errorMessage: 'Failed to update user.',
      auth: true,
      // config: { headers: { 'Content-Type': 'application/json' } },
      onSuccess: () => {
queryClient.invalidateQueries({ queryKey: ['all-users'] }); 
      },
    });
  };



export const useDeleteUser = (id) => {
      const queryClient = useQueryClient();

 return useMutate({
    mutationKey: ['assign-to-lfa'],
          api: ({ id }) => `/user/delete/${id}`, // ✅ dynamic URL
method: 'DELETE',
    notify: true,
    pendingMessage: 'deleting...',
    successMessage: 'User deleting successfully!',
    errorMessage: 'Failed to delete user.',
    auth: true,
     onSuccess: () => {
queryClient.invalidateQueries({ queryKey: ['all-users'] }); // 👈 lowercase "u"
    },
  });
}


  export const useUpdateUserStatus = () => {
    const queryClient = useQueryClient();
    return useMutate({
      mutationKey: ['update-user-status'],
      api: ({ id }) => `/user/update-status/${id}`,
      method: 'PATCH',
      notify: true,
      getBody: ({ data }) => data,
      pendingMessage: 'Approving...',
      successMessage: 'User Approve successfully!',
      errorMessage: 'Failed to Approve user.',
      auth: true,
      // config: { headers: { 'Content-Type': 'application/json' } },
      onSuccess: () => {
queryClient.invalidateQueries({ queryKey: ['all-users'] }); 
      },
    });
  };







  export const useSendOtp = () =>
    useMutate({
      mutationKey: ['send-otp'],
      api: '/auth/send-otp',
      method: 'POST',
      notify: true,
      pendingMessage: 'Sending OTP...',
      successMessage: 'OTP sent to your email.',
      errorMessage: 'Failed to send OTP.',
      auth: true,
    });
  
  
    
  export const useVerifyOtp = () =>
    useMutate({
      mutationKey: ['verify-otp'],
      api: '/auth/verify-otp',
      method: 'POST',
      notify: true,
      pendingMessage: 'Verifying OTP...',
      successMessage: 'Email verified!',
      errorMessage: 'Invalid or expired OTP.',
      auth: true,
    });

    
export const useRegisterUser = () => {
  return useMutate({
    mutationKey: ['register-user'],
    api: () => '/auth/register',
    method: 'POST',
    notify: true,
    getBody: (formData) => formData, 
    config: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
    pendingMessage: 'Registering...',
    successMessage: 'Registered successfully!',
    errorMessage: 'Registration failed!',
  });
};



export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutate({
    mutationKey: ['change-password'],
    api: () => '/auth/change-password',
    method: 'POST',
    notify: true,
    getBody: (data) => data, // send data as-is
    pendingMessage: 'Changing password...',
    successMessage: 'Password changed successfully!',
    errorMessage: 'Failed to change password.',
    auth: true,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });
};