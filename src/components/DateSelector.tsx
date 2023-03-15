import { useContext, useState } from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StateContext } from '../routes/Main';


export default function DateSelector() {

  const stateContext = useContext(StateContext);
  const { changeState } = stateContext;

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newDate) => {
            console.log(newDate);
            changeState({...stateContext, startDate:newDate!});
            setStartDate(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newDate) => {
            changeState({...stateContext, endDate:newDate!});
            setEndDate(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </LocalizationProvider>
  );
}