import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const LeadCard = ({
  lead,
  handleSubmitStatus, // ✅ renamed to match the parent prop
  isFetching,
  statusChanged,
  setStatusChanged,
}) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      status: "",
      remark: "",
    },
  });

  const selectedStatus = watch("status");

  const submitHandler = (data) => {
    handleSubmitStatus(lead,data);
    setStatusChanged(false); // optionally disable fetch after submit
  };

  return (
    <Card
      sx={{
        maxWidth: 700,
        margin: "auto",
        mt: 4,
        p: 3,
        borderRadius: 4,
        boxShadow: 4,
      }}
    >
      <CardContent>
        <Typography variant="h6" mb={3} color="primary">
          Lead Details
        </Typography>

        <Grid
          container
          spacing={5}
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent="center" gap={1}>
              <PhoneIcon color="action" />
              <Typography variant="body2" color="textSecondary">
                Mobile Number:
              </Typography>
            </Box>
            <Typography variant="body1" mt={0.5}>
              {lead?.mobile_number?.trim() || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent="center" gap={1}>
              <BusinessIcon color="action" />
              <Typography variant="body2" color="textSecondary">
                Company Name:
              </Typography>
            </Box>
            <Typography variant="body1" mt={0.5}>
              {lead?.company_name?.trim() || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent="center" gap={1}>
              <PersonIcon color="action" />
              <Typography variant="body2" color="textSecondary">
                Owner Name:
              </Typography>
            </Box>
            <Typography variant="body1" mt={0.5}>
              {lead?.owner_name?.trim() || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent="center" gap={1}>
              <AttachMoneyIcon color="action" />
              <Typography variant="body2" color="textSecondary">
                Turnover:
              </Typography>
            </Box>
            <Typography variant="body1" mt={0.5}>
              {lead?.turnover?.trim() || "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Controller
                name="status"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select {...field} label="Status" sx={{ width: "10rem" }}>
                    <MenuItem value="Interested">Interested</MenuItem>
                    <MenuItem value="Wrong Number">Wrong Number</MenuItem>
                    <MenuItem value="Callback">Callback</MenuItem>
                    <MenuItem value="Busy">Busy</MenuItem>
                    <MenuItem value="Not picking up">Not picking up</MenuItem>
                         <MenuItem value="Language Issue">Language Issue</MenuItem>
                    <MenuItem value="Not Interested">Not Interested</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="remark"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Remark"
                  placeholder="Enter remark"
                />
              )}
            />
          </Grid>

          <Grid item xs={12} textAlign="right">
            <Button
              variant="contained"
              onClick={handleSubmit(submitHandler)}
              disabled={!selectedStatus || isFetching}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 4,
              }}
            >
              Submit Status
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LeadCard;
