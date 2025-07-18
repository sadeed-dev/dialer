import { useQueryClient } from '@tanstack/react-query';
import useMutate from '../use-mutate.hook';
import useFetch from '../use-fetch.hook';

export const useGetNextLead = () => {
  return useFetch({
    queryKey: ['next-lead'],
    api: 'leads/next',
    auth: true,
    backend: true,
    enabled: false, 
  });
};


export const useGetLeadById = () => {
      return useFetch({
    queryKey: ['leadById',], 
    api: ({ id }) => `leads/${id}`,
    auth: true,
    backend: true,
    enabled: false, // don't run on mount
  });
};



export const useGetSubmittedLeads = (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
  return useFetch({
    queryKey: ['submittedLeads', filters],
    api: `leads/submitted?${params}`, // adjust endpoint as per your route
    auth: true,
    backend: true,
  });
};



  


export const useUpdateLeadStatus = () => {
  const queryClient = useQueryClient();

  return useMutate({
    mutationKey: ['update-lead-status'],
    api: ({ id }) => `leads/${id}/status`,
    method: 'PUT',
    notify: true,
    getBody: ({ data }) => data,
    pendingMessage: 'Updating status...',
    successMessage: 'Status updated successfully!',
    errorMessage: 'Failed to update status.',
    auth: true,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['next-lead'] });
    },
  });
};




export const useUploadLeads = () => {
  return useMutate({
    mutationKey: ['upload-leads-csv'],
    api: () => '/leads/upload-csv',
    method: 'POST',
    notify: false,
    getBody: (formData) => formData,
    config: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
    pendingMessage: 'Uploading leads...',
    renderApiSuccessMsg: true, // ✅ show backend response message
  });
};
