import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

export default function Calendar({ selectedDate, onDateChange }) {
  const handleDateChange = (newDate) => {
    if (newDate) {
      onDateChange(newDate); // Notify the parent component about the date change
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='p-0 m-0 flex justify-center items-center'>
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          sx={{ padding: 0 }}
        />
      </div>
    </LocalizationProvider>
  );
}
