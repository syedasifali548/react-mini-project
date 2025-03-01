import React, { useEffect, useState } from "react";
import './index.css'
import PokemonCards from "./PokemonCards";
const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = "https://pokeapi.co/api/v2/pokemon?limit=24";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailedPokemon = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });

      const detailedResponses = await Promise.all(detailedPokemon);
      console.log(detailedResponses);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }
  return (
    <>
      <section className="container">
        <header>
          <h1> Lets Catch Pokémon</h1>
        </header>
        <div className="pokemon-search">
          <input type="text" placeholder="search Pokemon" />
        </div>
        <div>
          <ul className="cards">
           {
            pokemon.map((curPokemon)=>{
                return(
                    <PokemonCards key={curPokemon.id} pokemonData={curPokemon}/>
                )
            })
           }
          </ul>
        </div>
      </section>
    </>
  );
};

export default Pokemon;
