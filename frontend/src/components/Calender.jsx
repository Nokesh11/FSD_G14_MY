import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function BasicDateCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='p-0 m-0 flex justify-center items-center bg-light-surface'>
        <DateCalendar sx={{ padding: 0 }} />
      </div>
    </LocalizationProvider>
  );
}
