import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

const currentYear = dayjs(); 

export default function YearOnlyPicker({ name, setFieldValue }) {
  const [selectedYear, setSelectedYear] = useState(null);

  const handleYearChange = (newValue) => {
    setSelectedYear(newValue);
    setFieldValue(name, newValue ? newValue.year().toString() : ""); // Ensure it's a string
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select Year"
        views={["year"]}
        openTo="year"
        value={selectedYear}
        onChange={handleYearChange}
        maxDate={currentYear}
        sx={{ minWidth: 250 }}
      />
    </LocalizationProvider>
  );
}
