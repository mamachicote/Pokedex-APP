import { Box } from '@mui/material';

import Detail from '../components/Detail/Detail';
import Navbar from './components/Navbar';

const Pokemon = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Detail />
    </Box>
  );
};

export default Pokemon;
