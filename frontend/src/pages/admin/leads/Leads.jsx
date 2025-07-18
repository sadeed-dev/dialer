// import React, { useState } from "react";
// import DataTable from "../../../components/shared/DataTable";
// import getLeadColumns from './components/column/LeadColumn';
// import { Button, Box } from "@mui/material";
// import RefreshIcon from '@mui/icons-material/Refresh';
// import { toast } from "sonner";

// const Leads = () => {
//   const [allLeads, setAllLeads] = useState([
//     {
//       id: 1,
//       mobile_number: "9876543210",
//       company_name: "ABC Pvt Ltd",
//       owner_name: "Rahul Sharma",
//       turnover: "5 Cr",
//       servicing: "Yes",
//       type: "Private",
//       status: "", // ✅ added status field
//     },
//     {
//       id: 2,
//       mobile_number: "9123456780",
//       company_name: "XYZ Corp",
//       owner_name: "Priya Verma",
//       turnover: "2 Cr",
//       servicing: "No",
//       type: "Public",
//       status: "",
//     },
//     {
//       id: 3,
//       mobile_number: "9988776655",
//       company_name: "LMN Enterprises",
//       owner_name: "Amit Gupta",
//       turnover: "10 Cr",
//       servicing: "Yes",
//       type: "LLP",
//       status: "",
//     },
//   ]);

//   const [currentLeadIndex, setCurrentLeadIndex] = useState(-1);
//   const [statusChanged, setStatusChanged] = useState(true);

//   const handleSubmitStatus = (row, selectedStatus) => {
//     console.log("Submitting status:", selectedStatus, "for lead ID:", row.id);
//     // 🔥 Implement your backend API call here if needed

//     // ✅ Update status in allLeads
//     const updatedLeads = allLeads.map((lead) =>
//       lead.id === row.id ? { ...lead, status: selectedStatus } : lead
//     );
//     setAllLeads(updatedLeads);

//     setStatusChanged(true); // Enable fetch button after status is submitted
//   };

  
//   const handleFetchLead = () => {
//     if (!statusChanged) return;

//     if (currentLeadIndex < allLeads.length - 1) {
//       setCurrentLeadIndex(currentLeadIndex + 1);
//       setStatusChanged(false); 
//     } else {
//       toast.success("No more leads available.");
//     }
//   };

//   const columns = getLeadColumns({
//     handleSubmitStatus: (row, status) => handleSubmitStatus(row, status),
//   });

//   const currentLead = currentLeadIndex >= 0 ? [allLeads[currentLeadIndex]] : [];
//   return (
//     <div>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <h2 style={{ color: '#2563eb' }}>Leads Management</h2>
//         <Button
//           variant="outlined"
//           onClick={handleFetchLead}
//             startIcon={<RefreshIcon />}
//           disabled={!statusChanged}
//           sx={{
//             textTransform: "none",
//             marginRight:'3rem'
//           }}
//         >
//           Fetch Lead
//         </Button>
//       </Box>

//       <DataTable
//         data={currentLead}
//         columns={columns}
//         page={0}
//         rowsPerPage={1}
//         totalCount={currentLead.length}
//         onPageChange={() => {}}
//         onRowsPerPageChange={() => {}}
//       />
//     </div>
//   );
// };

// export default Leads;


// import React from "react";
// import DataTable from "../../../components/shared/DataTable";
// import getLeadColumns from './components/column/LeadColumn';
// import { Button, Box, Tooltip } from "@mui/material";
// import RefreshIcon from '@mui/icons-material/Refresh';
// import { toast } from "sonner";
// import { useGetNextLead, useUpdateLeadStatus } from "../../../hooks/leads/use-leads.hook";

// const Leads = () => {
//   const { data: currentLead, refetch, isFetching } = useGetNextLead();
//   const { mutate: updateStatus } = useUpdateLeadStatus();
//   const [statusChanged, setStatusChanged] = React.useState(true);
//   const [firstFetchDone, setFirstFetchDone] = React.useState(false); // ✅ track first fetch

//   const handleSubmitStatus = (row, selectedStatus) => {
//     if (!selectedStatus) {
//       toast.error("Please select a status");
//       return;
//     }

//     updateStatus(
//       {
//         id: row.id,
//         data: { status: selectedStatus },
//       },
//       {
//         onSuccess: () => {
//           toast.success("Status updated successfully");
//           setStatusChanged(true);
//         },
//         onError: () => {
//           toast.error("Failed to update status");
//         },
//       }
//     );
//   };

//   const handleFetchLead = () => {
//     if (!firstFetchDone) {
//       // ✅ First fetch always allowed
//       refetch().then(({ data }) => {
//         if (!data) {
//           toast.success("No leads available.");
//         } else {
//           setFirstFetchDone(true);
//           setStatusChanged(false);
//         }
//       });
//       return;
//     }

//     if (!statusChanged) {
//       toast.error("Submit current lead status first");
//       return;
//     }

//     refetch().then(({ data }) => {
//       if (!data) {
//         toast.success("No more leads available.");
//       } else {
//         setStatusChanged(false);
//       }
//     });
//   };

//   const columns = getLeadColumns({ handleSubmitStatus });

//     return (
//       <div>
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//           <h2 style={{ color: '#2563eb' }}>Leads Management</h2>
        
//   <Tooltip title={!statusChanged ? "Submit current lead status first" : ""}>
//     <span>
//       <Button 
//         variant="outlined"
//         onClick={handleFetchLead}
//         startIcon={<RefreshIcon />}
//         disabled={isFetching || !statusChanged}
//         sx={{ textTransform: "none", marginRight: '3rem' }}
//       >
//         Fetch Lead
//       </Button>
//     </span>
//   </Tooltip>
//         </Box>

//         <DataTable
//           data={currentLead ? [currentLead] : []}
//           columns={columns}
//           page={0}
//           rowsPerPage={1}
//           totalCount={currentLead ? 1 : 0}
//           onPageChange={() => {}}
//           onRowsPerPageChange={() => {}}
//         />
//       </div>
//     );
// };

// export default Leads;




// ✅ Leads.jsx
import React from "react";
import {
  Box,
  Button,
  Tooltip,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import DataTable from "../../../components/shared/DataTable";
import getLeadColumns from './components/column/LeadColumn';
import { toast } from "sonner";
import { useGetNextLead, useGetSubmittedLeads, useUpdateLeadStatus } from "../../../hooks/leads/use-leads.hook";
import SubmittedLeads from "./components/SubmittedLeads";
import LeadCard from "./components/card/LeadCard";
import { User } from "lucide-react";
import usePendingLead from "../../../hooks/leads/usePendingLead";
import LeadUploader from "./components/lead-uploader/LeadUploader";
import { useAuth} from '../../../context/auth.context'

const Leads = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const [submittedLeadFilters, setSubmittedLeadFilters] = React.useState({});
      const {user } = useAuth()
    const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { data: currentLead, refetch, isFetching } = useGetNextLead();
  const { mutate: updateStatus } = useUpdateLeadStatus();
  const memoizedFilters = React.useMemo(() => ({
    page: page + 1,
    limit: rowsPerPage,
    ...submittedLeadFilters,
  }), [submittedLeadFilters, page, rowsPerPage]);

const { data: submittedLeads, refetch: refetchSubmittedLeads } = useGetSubmittedLeads(memoizedFilters);
const { pendingLead, savePendingLead, clearPendingLead } = usePendingLead();

  const [statusChanged, setStatusChanged] = React.useState(true);
  const [firstFetchDone, setFirstFetchDone] = React.useState(false);

const handleSubmitStatus = (row, data, callback) => {
  if (!data.status) {
    toast.warning("Please select a status First");
    return;
  }
updateStatus(
  {
    id: row.id,
    data: { status: data.status, remark: data.remark },
  },
  {
    onSuccess: () => {
      callback(data);
      setStatusChanged(true); // ✅ This enables the fetch button again
              clearPendingLead(); // ✅ Remove local lead
      refetchSubmittedLeads();

      if (currentLead && currentLead.id === row.id) {
        currentLead.status = data.status;
        currentLead.remark = data.remark || "";
      }

      // toast.success("Status updated");
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  }
);

};



  const handleSubmittedLeadFilter = (filterData) => {
    setSubmittedLeadFilters(filterData);
    // refetchSubmittedLeads();
        setPage(0); // reset to first page

  };

  const handleFetchLead = () => {
    if (!firstFetchDone) {
      refetch().then(({ data }) => {
        if (!data) toast.success("No leads available.");
        else {
         savePendingLead(data);  // ✅ Save in localStorage
          setFirstFetchDone(true);
          setStatusChanged(false);
        }
      });
      return;
    }
    if (!statusChanged) {
      toast.error("Submit current lead status first");
      return;
    }
    refetch().then(({ data }) => {
      if (!data) toast.success("No more leads available.");
  else {
      savePendingLead(data); // ✅ Save in localStorage
      setStatusChanged(false);
    }    });
  };

  const columns = getLeadColumns({ handleSubmitStatus });

  return (
<Box px={2}>
  {/* Title Row */}
  <Box
    display="flex"
    flexDirection={{ xs: 'column', sm: 'row' }}
    justifyContent="space-between"
    alignItems={{ xs: 'flex-start', sm: 'center' }}
    gap={2}
    mb={2}
  >
    <Typography variant="h5" sx={{ color: '#2563eb', mt: 2 }}>
      Leads Management
    </Typography>

  </Box>

  {/* Tabs + Button */}
  <Box
    display="flex"
    flexDirection={{ xs: 'column', sm: 'row' }}
    justifyContent="space-between"
    alignItems={{ xs: 'flex-start', sm: 'center' }}
    gap={2}
    mb={2}
  >
    <Tabs
      value={tabIndex}
      onChange={(e, newValue) => setTabIndex(newValue)}
      textColor="primary"
      indicatorColor="primary"
      variant="scrollable"
      scrollButtons="auto"
    >
      <Tab label="Coming Leads" />
      <Tab label="Submitted Leads" />
    </Tabs>

    {tabIndex === 0 && (
      <Tooltip title={!statusChanged ? "Submit current lead status first" : ""}>
        <span>
          
          <Button
            variant="outlined"
            onClick={handleFetchLead}
            startIcon={<RefreshIcon />}
            disabled={isFetching || !statusChanged}
            sx={{ textTransform: "none", mr: { xs: 0, sm: 3 } }}
          >
            Fetch Lead
          </Button>
        </span>
      </Tooltip>
    )}
    
  </Box>

  {/* Main Content */}
  <Box>
    {tabIndex === 0 && (
      <DataTable
        data={pendingLead ? [pendingLead] : (currentLead ? [currentLead] : [])}
        columns={columns}
        page={0}
        rowsPerPage={1}
        totalCount={currentLead ? 1 : 0}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    )}

    {tabIndex === 1 && (
      <SubmittedLeads
        handleSubmitStatus={handleSubmitStatus}
        submittedLeads={submittedLeads}
        refetchSubmittedLeads={refetchSubmittedLeads}
        onFilter={handleSubmittedLeadFilter}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    )}
  </Box>
  {user && user?.user?.role == "ADMIN" && (
  <LeadUploader />

  )}
</Box>

  );
};

export default Leads;
