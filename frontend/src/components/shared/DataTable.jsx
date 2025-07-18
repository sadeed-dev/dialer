// "use client";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Paper,
//   Typography,
// } from "@mui/material";
// import React from "react";

// const DataTable = ({
//   data = [],
//   columns = [],
//   page = 0,
//   rowsPerPage = 10,
//   totalCount = 0,
//   onPageChange,
//   onRowsPerPageChange,
// }) => {
// const handleChangePage = (event, newPage) => {
//   onPageChange(event, newPage); // ✅ pass both arguments
// };


//   const handleChangeRowsPerPage = (event) => {
//     onRowsPerPageChange(Number.parseInt(event.target.value, 10));
//   };

//   const renderCellContent = (column, row, rowIndex) => {
//     const value = row[column.field];
//     // ✅ Check if renderCell function exists in column definition
//     if (column.renderCell) {
//       return column.renderCell({ row, value, rowIndex });
//     }
//     return <Typography variant="body2">{value || "-"}</Typography>;
//   };

//   return (
//     <Paper elevation={2} sx={{ width: "100%", overflow: "hidden" }}>
//    <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
//   <Table stickyHeader sx={{ minWidth: 900 }}>
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.field}
//                   align={column.align || "center"}
//                   sx={{
//                     backgroundColor: '#2563eb',
//                     color: "white",
//                     fontWeight: 600,
//                     minWidth: column.minWidth || 100,
//                   }}
//                 >
//                   {column.headerName}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {data.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={columns.length} align="center">
//                   <Typography variant="body1" color="text.secondary" py={4}>
//                     Please Fetch Lead First
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             ) : (
//               data.map((row, index) => (
//                 <TableRow
//                   key={row.id || index}
//                   hover
//                   sx={{
//                     "&:nth-of-type(odd)": {
//                       backgroundColor: "#f9fafb",
//                     },
//                     "&:hover": {
//                       backgroundColor: "#f0fdf4",
//                     },
//                   }}
//                 >
//                   {columns.map((column) => (
//                     <TableCell key={column.field} align={column.align || "left"}>
//                       {renderCellContent(column, row, index)}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={[10, 25, 50]}
//         component="div"
//         count={totalCount}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         sx={{
//           borderTop: 1,
//           borderColor: "divider",
//           backgroundColor: "#f9fafb",
//           "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
//             color: "#374151",
//             fontWeight: 500,
//           },
//           "& .MuiTablePagination-select": {
//             color: "#16a34a",
//             fontWeight: 600,
//           },
//           "& .MuiIconButton-root": {
//             color: "#4ade80",
//             "&:hover": {
//               backgroundColor: "#f0fdf4",
//             },
//           },
//         }}
//       />
//     </Paper>
//   );
// };

// export default DataTable;

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";

const DataTable = ({
  data = [],
  columns = [],
  page = 0,
  rowsPerPage = 10,
  totalCount = 0,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleChangePage = (event, newPage) => {
    onPageChange(event, newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onRowsPerPageChange(Number.parseInt(event.target.value, 10));
  };

  const renderCellContent = (column, row, rowIndex) => {
    const value = row[column.field];
    if (column.renderCell) {
      return column.renderCell({ row, value, rowIndex });
    }
    return (
      <Typography
        variant="body2"
        sx={{ fontSize: isSmallScreen ? "0.75rem" : "0.875rem" }}
      >
        {value || "-"}
      </Typography>
    );
  };

  return (
    <Paper elevation={2} sx={{ width: "100%", overflowX: "auto" }}>
<TableContainer
sx={{ width: "100%", overflowX: "auto", "&::-webkit-scrollbar": { height: 5 }, "&::-webkit-scrollbar-track": { backgroundColor: "#e5f0ff" }, "&::-webkit-scrollbar-thumb": { backgroundColor: "#3b82f6", borderRadius: 8 }, "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#1d4ed8" } }}

>
        <Table
          stickyHeader
          sx={{
            minWidth: 600,
            "& th, & td": {
              padding: isSmallScreen ? "6px 8px" : "12px",
              fontSize: isSmallScreen ? "0.75rem" : "0.875rem",
            },
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align={column.align || "center"}
                  sx={{
                    backgroundColor: "#2563eb",
                    color: "white",
                    fontWeight: 600,
                    minWidth: column.minWidth || 100,
                  }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography variant="body2" color="text.secondary" py={4}>
                    Please Fetch Lead First
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={row.id || index}
                  hover
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#f9fafb" },
                    "&:hover": { backgroundColor: "#f0fdf4" },
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.field} align={column.align || "left"}>
                      {renderCellContent(column, row, index)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: 1,
          borderColor: "divider",
          backgroundColor: "#f9fafb",
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
            color: "#374151",
            fontWeight: 500,
            fontSize: isSmallScreen ? "0.75rem" : "0.875rem",
          },
          "& .MuiTablePagination-select": {
            color: "#3b82f6",
            fontWeight: 600,
          },
          "& .MuiIconButton-root": {
            color: "#3b82f6",
            "&:hover": {
              backgroundColor: "#f0fdf4",
            },
          },
        }}
      />
    </Paper>
  );
};

export default DataTable;
