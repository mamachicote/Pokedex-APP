import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { getPokemons, getPokemonDetail } from '../../services/ApiCall';
import { TYPE_COLOR_INDEX, BG_COLOR_INDEX } from './constants';

const Detail = (props) => {
  let { id } = useParams();

  const [data, setData] = useState({
    loading: true,
  });
  const [list, setList] = useState([]);
  const [compareData, setCompareData] = useState([]);
  const [compareSelect, setCompareSelect] = useState('');

  const handleCompare = (newValue) => {
    const filterSelectId = list.pokemons.filter(
      (pkm) => pkm.name === newValue
    )[0];
    setCompareSelect(filterSelectId);
  };

  useEffect(() => {
    getPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((pokemon) => {
        setData({
          pokemon,
          loading: false,
        });
      })
      .catch((error) => {
        setData({
          error: error.message,
        });
      });
  }, []);

  useEffect(() => {
    getPokemons(1279)
      .then((pokemons) => {
        setList({
          pokemons,
          loading: false,
        });
      })
      .catch((error) => {
        setList({
          error: error.message,
        });
      });
  }, []);

  useEffect(() => {
    getPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${compareSelect?.id}`)
      .then((pokemon) => {
        setCompareData({
          pokemon,
          loading: false,
        });
      })
      .catch((error) => {
        setCompareData({
          error: error.message,
        });
      });
  }, [compareSelect]);

  return (
    <Box sx={{ margin: '100px auto' }}>
      {data?.loading ? (
        <CircularProgress sx={{ marginTop: '200px' }} />
      ) : (
        <>
          <Card
            sx={{
              background: BG_COLOR_INDEX[data?.pokemon?.types[0].type.name],
              width: '600px',
            }}
          >
            <CardContent
              sx={{ display: 'flex', justifyContent: 'space-around' }}
            >
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Typography
                  color="white"
                  sx={{ textTransform: 'capitalize' }}
                  variant="h3"
                >
                  {data?.pokemon?.name} #{data?.pokemon?.id}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    width: '100%',
                  }}
                >
                  {data?.pokemon?.types?.map((type) => (
                    <Chip
                      color="primary"
                      label={type.type.name}
                      size="small"
                      sx={{
                        backgroundColor: TYPE_COLOR_INDEX[type.type.name],
                        margin: 0.5,
                        mb: 0,
                        textTransform: 'capitalize',
                      }}
                    />
                  ))}
                </Box>
                <Box>
                  <Typography color="text.disabled" variant="body2">
                    <b>Height:</b> {data?.pokemon?.height}
                  </Typography>
                  <Typography color="text.disabled" variant="body2">
                    <b>Weight:</b> {data?.pokemon?.weight}
                  </Typography>
                  <Typography color="text.disabled" variant="body2">
                    <b>Base Experience:</b> {data?.pokemon?.base_experience}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  ':hover': {
                    cursor: 'pointer',
                    transform: 'scale(1.1)',
                    transition: 'all 100ms',
                  },
                }}
              >
                <img
                  alt={data?.pokemon?.name}
                  src={data?.pokemon?.sprites.front_default}
                  width={200}
                />
              </Box>
            </CardContent>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
              }}
            >
              <Box>
                {data?.pokemon?.stats.map((stat) => (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '5px',
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="white"
                      sx={{ textTransform: 'capitalize', width: '20%' }}
                    >
                      {stat.stat.name}:
                    </Typography>
                    <Box sx={{ width: '100px' }}>
                      <Divider
                        sx={{
                          border: `4px solid ${
                            stat.base_stat > 50 ? 'green' : 'red'
                          }`,
                          borderRadius: '20px',
                          width: `${stat.base_stat}%`,
                        }}
                      />
                    </Box>
                    <Typography
                      align="right"
                      variant="subtitle2"
                      color="white"
                      sx={{ width: '5%' }}
                    >
                      {stat.base_stat}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ mt: '10px' }}>
            <Typography sx={{ m: '10px' }} variant="h6">
              Compare:
            </Typography>
            <CardContent>
              <Autocomplete
                options={list?.pokemons?.map((option) => option.name)}
                onChange={(event, newValue) => handleCompare(newValue)}
                freeSolo
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="large"
                    sx={{ m: 0 }}
                    placeholder="Search for the pokemon you want to compare"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                      endAdornment: null,
                    }}
                  />
                )}
              />
            </CardContent>
            {compareSelect !== '' && (
              <CardContent
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Box sx={{ width: '45%' }}>
                  <Typography
                    align="center"
                    sx={{ textTransform: 'capitalize' }}
                    variant="subtitle1"
                  >
                    {data?.pokemon?.name}
                  </Typography>
                  {data?.pokemon?.stats.map((stat) => (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '5px',
                      }}
                    >
                      <Typography
                        sx={{ textTransform: 'capitalize', width: '20%' }}
                        variant="caption"
                      >
                        {stat.stat.name}:
                      </Typography>
                      <Box sx={{ width: '50px' }}>
                        <Divider
                          sx={{
                            border: `4px solid ${
                              stat.base_stat > 50 ? 'green' : 'red'
                            }`,
                            borderRadius: '20px',
                            width: `${stat.base_stat}%`,
                          }}
                        />
                      </Box>
                      <Typography
                        align="right"
                        sx={{ width: '5%' }}
                        variant="caption"
                      >
                        {stat.base_stat}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ width: '45%' }}>
                  <Typography
                    align="center"
                    sx={{ textTransform: 'capitalize' }}
                    variant="subtitle1"
                  >
                    {compareData?.pokemon?.name}
                  </Typography>
                  {compareData?.pokemon?.stats.map((stat) => (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '5px',
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ textTransform: 'capitalize', width: '20%' }}
                      >
                        {stat.stat.name}:
                      </Typography>
                      <Box sx={{ width: '50px' }}>
                        <Divider
                          sx={{
                            border: `4px solid ${
                              stat.base_stat > 50 ? 'green' : 'red'
                            }`,
                            borderRadius: '20px',
                            width: `${stat.base_stat}%`,
                          }}
                        />
                      </Box>
                      <Typography
                        align="right"
                        sx={{ width: '5%' }}
                        variant="caption"
                      >
                        {stat.base_stat}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            )}
          </Card>
        </>
      )}
    </Box>
  );
};

export default Detail;
