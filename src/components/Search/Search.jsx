import { TextField } from '@mui/material';
import { useState } from 'react';

const Search = (props) => {
  const { handleSearch } = props;

  const [input, setInput] = useState('');

  const handleChange = (event) => {
    handleSearch(event.target.value);
    setInput(event.target.value);
  };

  return (
    <TextField
      onChange={handleChange}
      placeholder="Buscar por nombre..."
      value={input}
      variant="standard"
      sx={{ mb: '5px' }}
    />
  );
};

export default Search;
