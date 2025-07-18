import { useMutation } from '@tanstack/react-query';
import AxiosErrors, { AxiosError } from 'axios';
import { toast } from 'sonner';
import axios from 'axios';
import apiInstance from '../utils/axiosInstance';

const useMutate = ({
  mutationKey,
  api,
  method = 'POST',
  auth = true,
  config = {},
  mutationFnProvided = true,
  mutationFn,
  notify = false,
  pendingMessage,
  successMessage,
  errorMessage,
  onSuccess,
  renderApiErrorMsg = true,
  renderApiSuccessMsg = false,
  options = {},
}) => {

  const handleMutate = async (data) => {
    if (mutationFnProvided) {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const user = auth ? JSON.parse(localStorage.getItem('user')) : null;
      const token = user?.token;

      // ✅ Support both string and function api
      const resolvedApi = typeof api === 'function' ? api(data) : api;
      let body = data;
      // // If data is { id, formData }, use formData as body
      // if (data && data.formData && data.id) {
      //   body = data.formData;
      // }

      if (data && typeof data === 'object' && 'data' in data && 'id' in data) {
        body = data.data;
      }

      const response = await apiInstance({
        method,
        url: resolvedApi,
        data: body,
        baseURL,
        ...config,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(config?.headers || {}),
        },
      });

      return response.data;
    }

    if (!mutationFnProvided && typeof mutationFn === 'function') {
      return await mutationFn(data);
    }

    throw new Error('Please provide either mutationFn or API endpoint!');
  };

  const mutation = useMutation({
    mutationKey,
    mutationFn: async (data) => {
      const promise = handleMutate(data).then((res) => {
        onSuccess?.(res);
        return res;
      });

      if (notify) {
        toast.promise(promise, {
          loading: pendingMessage || 'Processing...',
          success: (res) => {
            if (renderApiSuccessMsg && typeof res === 'string') {
              return res;
            }
            return successMessage || 'Success!';
          },
          error: (err) => {
            console.error('Mutation error:', err);
            if (renderApiErrorMsg) {
              if (err instanceof AxiosError) {
                return err?.response?.data?.message || 'Something went wrong';
              } else if (err instanceof Error) {
                return err.message;
              }
            }
            return errorMessage || 'Error! Please try again later.';
          },
        });
      }

      return promise;
    },
    ...options,
  });

  return mutation;
};

export default useMutate;