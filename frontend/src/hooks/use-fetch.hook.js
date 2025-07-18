import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import apiInstance from '../utils/axiosInstance';

const useFetch = ({
  queryKey,
  options = {},
  auth = true,
  api,
  backend = true,
  config = {},
  queryFn: customQueryFn,
  enabled = true, // ✅ default remains true for other usages
}) => { 
  const queryFn = async () => {
    if (backend && api) {
      const baseUri = import.meta.env.VITE_API_BASE_URL;
      const path = `${baseUri}/${api}`;
      const userStr = localStorage.getItem('user');
      const user = auth && userStr ? JSON.parse(userStr) : null;

      const response = await apiInstance.get(path, {
        
        ...config,
        headers: {
          ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
          ...config.headers,
        },
      });

      return response.data;
    }

    if (!backend && typeof customQueryFn === 'function') {
      return await customQueryFn();
    }

    throw new Error('Invalid useFetch configuration: missing API or queryFn.');
  };

  return useQuery({
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    retry: false,
    enabled, // ✅ pass enabled prop here
    ...options,
  });
};

export default useFetch;
