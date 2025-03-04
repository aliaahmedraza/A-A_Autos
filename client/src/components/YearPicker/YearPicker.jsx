import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const currentYear = dayjs();

export default function YearOnlyPicker({ name, setFieldValue, resetTrigger }) {
  const [selectedYear, setSelectedYear] = useState(null);

  const handleYearChange = (newValue) => {
    setSelectedYear(newValue);
    setFieldValue(name, newValue ? newValue.year().toString() : ""); 
  };

  useEffect(() => {
    setSelectedYear(null);
  }, [resetTrigger]);

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
