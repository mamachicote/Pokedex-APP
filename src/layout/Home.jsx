import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getPokemons } from '../services/ApiCall';
import Item from '../components/Item/Item';
import Navbar from './components/Navbar';

const Home = (props) => {
  const [fetch, setFetch] = useState({
    result: [],
    loading: true,
    error: false,
  });
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event);
    setFetch({ ...fetch, loading: true });
    setTimeout(() => {
      setList(
        fetch?.pokemons?.filter((r) =>
          r.name.toLowerCase().includes(event.toLowerCase())
        )
      );
      setFetch({ ...fetch, loading: false });
    }, 1000);
  };

  function handlerResult(maximum, pokemons) {
    setPage(page + 1);
    setList(pokemons);
  }


  useEffect(() => {
    getPokemons()
      .then((pokemons) => {
        setFetch({
          pokemons,
          loading: false,
        });
      })
      .catch((error) => {
        setFetch({
          error: error.message,
        });
      });
  }, []);

  useEffect(() => {
    var filterPokemons = fetch?.pokemons?.filter((item) => {
      return item?.name?.includes(search.toLowerCase());
    });

    handlerResult(
      filterPokemons?.length,
      filterPokemons?.slice(0, itemsPerPage)
    );
  }, [fetch, itemsPerPage]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar handleSearch={handleSearch} />
      {fetch.loading ? (
        <CircularProgress sx={{ margin: 'auto', marginTop: '300px' }} />
      ) : (
        <InfiniteScroll
          style={{ overflow: 'none' }}
          dataLength={fetch.pokemons?.length}
          hasMore={fetch.pokemons?.length < 1298}
          loader={
            <Button
              onClick={() => setItemsPerPage(itemsPerPage + 20)}
              sx={{ marginBottom: '50px', marginLeft: '50%' }}
              variant="contained"
              disabled={list?.length === 1298}
            >
              Load more PKMS!
            </Button>
          }
        >
          <Box
            sx={{
              columnGap: '20px',
              display: 'grid',
              gridTemplateColumns: '20% 20% 20% 20% 20%',
              margin: '75px 50px',
              rowGap: '20px',
            }}
          >
            {list?.map((pkm, index) => (
              <Item content={pkm} key={index} />
            ))}
          </Box>
        </InfiniteScroll>
      )}
    </Box>
  );
};

export default Home;
