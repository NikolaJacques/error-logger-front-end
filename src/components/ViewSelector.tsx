import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ViewType } from 'frontend-backend';
import {StateContext} from './Main';

const views: ViewType[] = ['atomic', 'session', 'error'];

export default function ViewSelector() {

  const stateContext = useContext(StateContext);
  const { changeState } = stateContext;

  const [view, setView] = useState('atomic' as ViewType);
  
  const handleChange = (event: SelectChangeEvent<ViewType>) => {
    const newView = event.target.value as ViewType;
    changeState({...stateContext, view:newView});
    setView(newView);
  };
  
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="view-select-label">View</InputLabel>
          <Select
            labelId="view-select-label"
            id="view-select"
            value={view}
            label="view"
            onChange={handleChange}
          >
            {views.map((view, index) => <MenuItem key={index} value={`${view}`}>{view}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
    );
  }
