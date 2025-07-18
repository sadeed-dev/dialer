import React from "react";
import DataTable from "../../../../components/shared/DataTable";
import getLeadColumns from "./column/LeadColumn";
import SubmittedLeadFilter from "./filters/SubmittedLeadsFilters";
import { useGetSubmittedLeads } from "../../../../hooks/leads/use-leads.hook";
import { useState } from "react";
import { useMediaQuery,IconButton, Tooltip } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const SubmittedLeads = ({
  handleSubmitStatus,
  submittedLeads,
  onFilter,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
}) => {  

const [showFilters, setShowFilters] = useState(false);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilter = (filterData) => {
    onFilter(filterData);
    setPage(0); // reset to page 1 when filtering
  };

const columns = getLeadColumns({ handleSubmitStatus, extraCell: true }); 
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div>
         {isMobile && (
     <Tooltip title="Toggle Filters" arrow>
  <IconButton
    onClick={() => setShowFilters((prev) => !prev)}
    sx={{ color: "#3b82f6" }}
  >
    <FilterListIcon />
  </IconButton>
</Tooltip>
    )}
      {(!isMobile || showFilters) && (
      <SubmittedLeadFilter onFilter={handleFilter} />

      )}
      <DataTable
        data={submittedLeads?.data || []}
        columns={columns}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={submittedLeads?.total || 0}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};

export default SubmittedLeads;
