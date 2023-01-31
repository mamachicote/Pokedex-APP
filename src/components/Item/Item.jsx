import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPokemonDetail } from '../../services/ApiCall';
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Typography,
} from '@mui/material';
import { TYPE_COLOR_INDEX, BG_COLOR_INDEX } from './constants';

const Item = (props) => {
  const { content } = props;
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [hover, setHover] = useState(true);

  useEffect(() => {
    getPokemonDetail(content?.url)
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

  const handleOnMouse = () => {
    setHover(false);
  };

  const handleOutMouse = () => {
    setHover(true);
  };

  return (
    <Card
      onClick={() => navigate(`/${content.id}`)}
      sx={{
        background: BG_COLOR_INDEX[data?.pokemon?.types[0].type.name],
        borderRadius: '10%',
        width: '200px',
        zIndex: 2,
        ':hover': {
          cursor: 'pointer',
          transform: 'scale(1.075)',
          transition: 'all 100ms',
        },
      }}
    >
      {data.loading ? (
        <CircularProgress />
      ) : (
        <CardContent
          onMouseEnter={handleOnMouse}
          onMouseLeave={handleOutMouse}
          sx={{
            alignContent: 'space-around',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {hover ? (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Typography
                  color="white"
                  sx={{ textTransform: 'capitalize' }}
                  variant="h5"
                >
                  {data?.pokemon?.name}
                </Typography>
                <Typography
                  color="white"
                  sx={{ textTransform: 'capitalize' }}
                  variant="h6"
                >
                  #{data?.pokemon?.id}
                </Typography>
              </Box>
              <img
                alt={data?.pokemon?.name}
                src={data?.pokemon?.sprites.front_default}
                width={120}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
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
            </Box>
          ) : (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Typography
                  color="white"
                  sx={{ textTransform: 'capitalize' }}
                  variant="h5"
                >
                  {data?.pokemon?.name}
                </Typography>
                <Typography
                  color="white"
                  sx={{ textTransform: 'capitalize' }}
                  variant="h6"
                >
                  #{data?.pokemon?.id}
                </Typography>
              </Box>
              <img
                alt={data?.pokemon?.name}
                src={data?.pokemon?.sprites.front_default}
                width={150}
              />
            </Box>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default Item;
