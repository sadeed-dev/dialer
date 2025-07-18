import React from "react";
import { useForm } from "react-hook-form";
import { Search, CheckCircle, Filter, X } from "lucide-react";
import { Button } from "@mui/material";

const statuses = [
  "Interested",
  "Not picking up",
  "Busy",
  "Wrong number",
  "Callback",
  "Language issue",
  "Not Interested",
];

const SubmittedLeadsFilters = ({ onFilter }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    onFilter(data);
  };

  const handleReset = () => {
    reset();
    onFilter({});
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.12)] border border-gray-200 px-4 sm:px-6 py-3 mb-4">
  <form
  onSubmit={handleSubmit(onSubmit)}
  className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between flex-wrap"
>
  {/* Filters + Buttons Grouped in one row */}
  <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full lg:flex-nowrap lg:items-end">
    
    {/* Mobile Number */}
    <div className="w-full sm:w-64">
      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
        <input
          type="text"
          placeholder="Search by number, name..."
          {...register("search")}
          className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-100 transition-all duration-200 bg-white"
        />
      </div>
    </div>

    {/* Status */}
    <div className="w-full sm:w-48">
      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
      <div className="relative">
        <select
          {...register("status")}
          className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-100 transition-all duration-200 bg-white appearance-none cursor-pointer"
        >
          <option value="">All Status</option>
          {statuses.map((status) => (
            <option key={status} value={status.toLowerCase()}>
              {status}
            </option>
          ))}
        </select>
        <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
    </div>

    {/* Buttons aligned inline on lg */}
    <div className="flex gap-2 flex-wrap lg:flex-nowrap">
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        startIcon={<Filter className="w-4 h-4" />}
        sx={{
          textTransform: "none",
          fontWeight: 300,
          boxShadow: 1,
          borderColor: "primary.main",
          "&:focus": {
            outline: "none",
            borderColor: "primary.dark",
            boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
          },
        }}
      >
        Apply Filters
      </Button>

      <Button
        type="button"
        onClick={handleReset}
        variant="outlined"
        startIcon={<X className="w-4 h-4" />}
        sx={{
          textTransform: "none",
          fontWeight: 300,
          borderColor: "tomato",
          color: "tomato",
          "&:hover": {
            backgroundColor: "rgba(255, 99, 71, 0.1)",
            borderColor: "tomato",
          },
          "&:focus": {
            outline: "none",
            boxShadow: "0 0 0 2px rgba(255, 99, 71, 0.3)",
          },
        }}
      >
        Clear All
      </Button>
    </div>
  </div>
</form>

    </div>
  );
};

export default SubmittedLeadsFilters;
