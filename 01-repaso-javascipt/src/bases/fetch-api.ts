interface PokemonResponse {
  count: number;
  next: null | string;
  previous: null | "string";
  results: Pokemon[];
}

interface Pokemon {
  name: string;
}

const url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
const request = fetch(url);

const pokemonsResponse = request.then((response) => response.json());

pokemonsResponse.then((data: PokemonResponse) =>
  console.log(data.results.at(1)?.name),
);
