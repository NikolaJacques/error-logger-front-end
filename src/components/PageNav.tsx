import {useContext} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {StateContext} from './Main';

export default function PageNav() {

  const stateContext = useContext(StateContext);
  const {page, changeState} = stateContext;

  const totalPages = 1;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    changeState({...stateContext, page:value});
  };

  return (
    <Stack spacing={2}>
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </Stack>
  );
}