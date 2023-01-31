export const getPokemons = (limit = 1279) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      const pokemonsList = result.results.map((response) => {
        const { url } = response;
        const id = url.substring(34, url.length - 1);

        return {
          ...response,
          id,
        };
      });
      return pokemonsList;
    });
};

export const getPokemonDetail = (url) => {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
};
