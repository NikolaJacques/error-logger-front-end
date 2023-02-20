import {useContext} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {StateContext} from '../routes/Main';

export default function PageNav() {

  const stateContext = useContext(StateContext);
  const {page, changeState, total, limit} = stateContext;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    changeState({...stateContext, page:value});
  };

  return (
    <Stack spacing={2}>
      <Pagination count={Math.ceil(total/limit)} page={page} onChange={handleChange} />
    </Stack>
  );
}