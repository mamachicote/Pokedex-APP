import { Box, Typography } from '@mui/material/';
import { useNavigate } from 'react-router-dom';

import Search from '../../components/Search/Search';

const Navbar = (props) => {
  const { handleSearch, hideSearch } = props;
  let navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        left: 0,
        padding: '0 30px',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 999,
      }}
    >
      <Box
        sx={{
          alignItems: 'flex-end',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: '5px',
          paddingBottom: '0px',
        }}
      >
        <Typography
          align="left"
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
          variant="h3"
        >
          Pokedex
        </Typography>
        {!hideSearch && <Search handleSearch={handleSearch} />}
      </Box>
    </Box>
  );
};

export default Navbar;
