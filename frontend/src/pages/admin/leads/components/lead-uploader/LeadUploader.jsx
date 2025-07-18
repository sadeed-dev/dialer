import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Stack,
  Paper,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useUploadLeads } from '../../../../../hooks/leads/use-leads.hook';
import { toast } from 'sonner';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const LeadUploader = () => {
  const { register, handleSubmit, reset } = useForm();
  const uploadMutation = useUploadLeads();
  const [filename, setFilename] = useState('');

  const onSubmit = (data) => {
    const file = data.csvFile[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    uploadMutation.mutate(formData, {
      onSuccess: (res) => {
        toast.success(res?.message || 'Upload successful');
        setFilename('');
        reset();
      },
      onError: (err) => {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          'Upload failed';
        toast.error(msg);
      },
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 4,
        p: 2,
        borderRadius: 3,
        maxWidth: 350,
        mx: 'auto',
        backgroundColor: 'white',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        gutterBottom
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}
      >
        📤 Upload Leads via CSV
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} alignItems="center">
          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
            disabled={uploadMutation.isPending}
          >
            {filename || 'Choose CSV'}
            <input
              type="file"
              accept=".csv"
              hidden
              {...register('csvFile', {
                required: true,
                onChange: (e) => {
                  const file = e.target.files?.[0];
                  setFilename(file?.name || '');
                },
              })}
            />
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={uploadMutation.isPending || !filename}
            startIcon={
              uploadMutation.isPending ? <CircularProgress size={20} /> : null
            }
            sx={{ minWidth: 150 }}
          >
            {uploadMutation.isPending ? 'Uploading...' : 'Upload List'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default LeadUploader;
