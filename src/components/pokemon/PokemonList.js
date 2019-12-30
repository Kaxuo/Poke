import React from 'react';
import PokemonCard from "./PokemonCard"
import axios from "axios";
import { useState, useEffect } from 'react';



function PokemonList() {

    const [pokemon, setPokemon] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=807")
            setPokemon(result.data["results"])
        }
        fetchData()
    }, [])

    const numbers = pokemon
    numbers.forEach((item, i) => {
        item.id = i + 1
    });

    return (
        <React.Fragment>
            {pokemon ? (<div className="row">
                {pokemon.map(pokemon =>
                    <PokemonCard
                        key={pokemon.name}
                        name={pokemon.name}
                        url={pokemon.url}
                        id={pokemon.id}
                    />
                )}
            </div>) : (<h1> Loading </h1>)}
        </React.Fragment>
    )
}

// you need row in classname to make it into a row ( like flexblow )
export default PokemonList;
