 
 
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState , useEffect} from "react";
import { useForm, Controller } from "react-hook-form";


const StatusAction = ({ row , handleSubmitStatus}) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const enableStatusOptions = ['Not picking up', 'Busy', 'Callback','Language Issue'];
const statusOptions = [
  "Interested",
  "Not picking up",
  "Busy",
  "Wrong number", 
  "Callback",
  "Language Issue",
  "Not Interested"
];


    const defaultStatus = row.status || "";

const [submitted, setSubmitted] = useState(false);

useEffect(() => {
  const isAlreadySubmitted =
    row.status !== null &&
    row.status !== "" &&
    !enableStatusOptions.map(s => s.toLowerCase()).includes(row.status.toLowerCase());

  setSubmitted(isAlreadySubmitted);
}, [row.status]);

    const {
      control,
      handleSubmit,
      watch,
      reset,
    } = useForm({
      defaultValues: {
        status: defaultStatus,
        remark: "",
      },
    });

    const selectedStatus = watch("status");

    const onSubmit = (data) => {
      console.log("Submitting status:", data);
      if (!data.status) {
        alert("Please select a status");
        return;
      }

      handleSubmitStatus(row, data, (newStatus) => {
        console.log("Status updated to:", newStatus);
        setSubmitted(true);
        setDialogOpen(false);
        // reset({ status: newStatus, remark: "" });
      });
    };

const handleDialogOpen = () => {
  if (!submitted) {
    reset({
      status: row.status || "",
      remark: row.remark || "",
    });
    setDialogOpen(true);
  }
};


    const handleDialogClose = () => {
      setDialogOpen(false);
    };

    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <Button
          variant="outlined"
          size="small"
          onClick={handleDialogOpen}
          disabled={submitted}
          sx={{
            textTransform: "none",
            borderColor: "#2563eb",
            color: "#2563eb",
            opacity: submitted ? 1 : undefined,
            "&.Mui-disabled": {
             borderColor: "#94a3b8", // dull blue-gray
             color: "#94a3b8",       // dull text
              opacity: 1,
            },
          }}
        >
          {selectedStatus || "Select Status"}
        </Button>

        <Dialog  open={dialogOpen} onClose={handleDialogClose} fullWidth   // options: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  PaperProps={{
    sx: {
      width: 600, // set exact width
      maxWidth: '90vw', // responsive on smaller screens
      borderRadius: 2,
    },


  }}>
          <DialogTitle>Select Status & Add Remark</DialogTitle>
          <DialogContent sx={{ minWidth: 300 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel>Status</InputLabel>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Status"
                      defaultValue=""
                    >
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>

              <Controller
                name="remark"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Remark"
                    margin="dense"
                    multiline
                    rows={2}
                    sx={{ mt: 2 }}
                  />
                )}
              />

              <DialogActions sx={{ px: 0 }}>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button variant="contained" type="submit">Submit</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

        {/* <Button
          variant="contained"
          size="small"
          onClick={handleSubmit(onSubmit)}
          disabled={submitted}
          sx={{
            textTransform: "none",
            backgroundColor: submitted ? "#9ca3af" : "#2563eb",
            "&:hover": { backgroundColor: submitted ? "#9ca3af" : "#1d4ed8" },
          }}
        >
          {submitted ? "Submitted" : "Submit Status"}
        </Button> */}
      </Box>
    );
  };

  export default StatusAction