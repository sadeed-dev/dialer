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
  Tooltip,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import StatusAction from "../actions/StatusAction";
import {formatDateTime} from '../../../../../utils/formatDateTime'
import { toast } from "sonner";
import LeadStatusColor from "../../../../../components/style/leadStatusColor";

export default function getLeadColumns({ handleSubmitStatus ,extraCell}) {
  const StatusAction = ({ row }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const enableStatusOptions = ['Not picking up', 'Busy', 'Callback'];
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

    const [submitted, setSubmitted] = useState(
      row.status !== null &&
      row.status !== "" &&
      !enableStatusOptions.map(s => s.toLowerCase()).includes(row.status.toLowerCase())
    );

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
      if (!data.status) {
        toast.warning("Please select a status First");
        return;
      }

      handleSubmitStatus(row, data, (newStatus) => {
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
       
<Tooltip
  title={submitted ? "Status already submitted" : "Click to select status"}
  arrow
>
  <Box component="span"> {/* Needed to make Tooltip work with disabled Button */}
<Button
  variant="outlined"
  size="small"
  onClick={handleDialogOpen}
  disabled={submitted}
  sx={{
    textTransform: "none",
    color: submitted ? "#94a3b8" : "#2563eb",
    borderColor: "transparent", 
    boxShadow: "none",
    outline: "none",
    padding: "0", 
    minWidth: "auto",


    "&:focus": {
      borderColor: "transparent",
      outline: "none",
    },
    "&:active": {
      borderColor: "transparent",
      boxShadow: "none",
    },
  }}
>
  {selectedStatus ? (
    <Chip
      label={selectedStatus}
      size="small"
      sx={{
        backgroundColor: LeadStatusColor(selectedStatus).bg,
        color: LeadStatusColor(selectedStatus).color,
        fontWeight: 600,
        border: LeadStatusColor(selectedStatus).border,
        borderRadius: "999px",
        height: "24px",
        padding:'.8rem .2rem'
      }}
    />
  ) : (
    "Select Status"
  )}
</Button>


  </Box>
</Tooltip>
        <Dialog  open={dialogOpen} onClose={handleDialogClose}>
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

  return [
    { field: "serial", headerName: "S.No.", type: "serial", minWidth: 40, align: "center" },
    { field: "mobile_number", headerName: "Mobile Number", minWidth: 150, align: "center" },
    { field: "company_name", headerName: "Company Name", minWidth: 180, align: "center" },
    { field: "owner_name", headerName: "Owner Name", minWidth: 150, align: "center" },
    { field: "turnover", headerName: "Turnover", minWidth: 100, align: "center" },
    { field: "servicing", headerName: "Servicing", minWidth: 100, align: "center" },
    { field: "type", headerName: "Type", minWidth: 100, align: "center" },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 200,
      align: "center",
      renderCell: ({ row }) => <StatusAction row={row}  />,
    },
          { field: "remark", headerName: "Remark", minWidth: 130, align: "center" },
    ...(extraCell
      ? [{
          field: "updatedAt",
          headerName: "Submitted On",
          minWidth: 170,
          align: "center",
renderCell: (params) => (
  <Chip
    label={formatDateTime(params.value)}
    size="small"
    sx={{
      backgroundColor: "#f3f4f6", 
      color: "#4b5563",           
      fontWeight: 500,
      border: "1px solid #cbd5e1",
      borderRadius: "999px",
    }}
  />
),

        }]
      : [])


  ];
}
