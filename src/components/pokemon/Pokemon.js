import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';


function Pokemon(props) {
    const TYPE_COLORS = {
        bug: '#1C4B27',
        dark: "#040707",
        dragoon: "#A7A9AC",
        electric: "#E2E32B",
        fairy: "#FD005F",
        fighting: "#994025",
        fire: "#45677E",
        flying: "#748696",
        ghost: "#584A7C",
        grass: "#147B3D",
        ground: "#A7773E",
        ice: "#A7A9AC",
        normal: "#A7A9AC",
        poison: "#5E2D89",
        psychic: "#A52A6C",
        rock: "#48190B",
        steel: "#43BD94",
        water: "#85A8FB"
    }
    const { id } = props.match.params
    const [name, setName] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [types, setTypes] = useState({
        type1: '',
        type2: '' || "Empty",
    })
    const [description, setDescription] = useState("")
    const [gender, setGender] = useState("")
    const [stats, setStats] = useState({
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        specialAttack: "",
        specialDefense: "",
    })
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [captureRate, setCaptureRate] = useState("")
    const [abilities, setAbilities] = useState({ ability1: "", ability2: "" })
    const [baseHappiness, setBaseHappiness] = useState("")

    // Const ev = pokemonRes.data.stats.filter(stat => 
    // { if (stat.effort > 0
    //     return true :
    //     )}
    //     return false)
    // ici , le true va filter tout ce qui est au dessus de 0 , et ca le "return" ; sinon non 
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    useEffect(() => {

        const fetchData = async () => {
            // url = for pokemon information
            const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`
            const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

            // get pokemon info
            const PokemonRes = await axios.get(pokemonUrl)
            const PokeRes = await axios.get(pokemonSpeciesUrl)
            // REMEMBER THE LINE BELOW
            const descriptionEn = PokeRes.data.flavor_text_entries.find(word => word.language.name === "en")
            console.log(PokeRes.data)
            setImgUrl(PokemonRes.data.sprites.front_default)
            setName(PokemonRes.data.name)
            setStats({
                hp: PokemonRes.data.stats[5].base_stat,
                attack: PokemonRes.data.stats[4].base_stat,
                defense: PokemonRes.data.stats[3].base_stat,
                speed: PokemonRes.data.stats[0].base_stat,
                specialAttack: PokemonRes.data.stats[2].base_stat,
                specialDefense: PokemonRes.data.stats[1].base_stat,
            })
            setHeight(PokemonRes.data.height)
            setWeight(PokemonRes.data.weight)
            setTypes({ type1: PokemonRes.data.types[0].type.name })
            setAbilities({ ability1: PokemonRes.data.abilities[0].ability.name })
            setDescription(descriptionEn.flavor_text)
            setCaptureRate(PokeRes.data.capture_rate)
            setBaseHappiness(PokeRes.data.base_happiness)
            setGender(PokeRes.data.has_gender_differences)
        }
        fetchData()
    }, [])
    return (
        <div className="col">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-5">
                            <h5>{id}</h5>
                        </div>
                        <div className="col-7">
                            <div className="float-right">
                                <span
                                    className="badge badge-primary badge-pill mr-1"
                                    style={{ backgroundColor: `${TYPE_COLORS[types.type1]}` }}>
                                    {types.type1}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <img
                                src={imgUrl}
                                alt="hello"
                                className="card-img-top rounded mx-auto mt-2" />
                        </div>
                        <div className="col-md-9">
                            <h4 className="mx-auto">{capitalizeFirstLetter(name)}</h4>
                            <div className="row align-items center">
                                <div className="col-12 col-md-3"> HP </div>
                                <div className="col-12 col-md-9">
                                    <div className="progress">
                                        <div className="progress-bar"
                                            role="progressBar"
                                            style={{ width: `${stats.hp}%` }}>
                                            <small>{stats.hp}</small> </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items center">
                                <div className="col-12 col-md-3"> Attack </div>
                                <div className="col-12 col-md-9">
                                    <div className="progress">
                                        <div className="progress-bar"
                                            role="progressBar"
                                            style={{ width: `${stats.attack}%` }}>
                                            <small>{stats.attack}</small> </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items center">
                                <div className="col-12 col-md-3"> Defense </div>
                                <div className="col-12 col-md-9">
                                    <div className="progress">
                                        <div className="progress-bar"
                                            role="progressBar"
                                            style={{ width: `${stats.defense}%` }}>
                                            <small>{stats.defense}</small> </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items center">
                                <div className="col-12 col-md-3"> Special Attack </div>
                                <div className="col-12 col-md-9">
                                    <div className="progress">
                                        <div className="progress-bar"
                                            role="progressBar"
                                            style={{ width: `${stats.specialAttack}%` }}>
                                            <small>{stats.specialAttack}</small> </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items center">
                                <div className="col-12 col-md-3"> Special Defense</div>
                                <div className="col-12 col-md-9">
                                    <div className="progress">
                                        <div className="progress-bar"
                                            role="progressBar"
                                            style={{ width: `${stats.specialDefense}%` }}>
                                            <small>{stats.specialDefense}</small> </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items center">
                                <div className="col-12 col-md-3"> Speed </div>
                                <div className="col-12 col-md-9">
                                    <div className="progress">
                                        <div className="progress-bar"
                                            role="progressBar"
                                            style={{ width: `${stats.speed}%` }}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100">
                                            <small>{stats.speed}</small> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col">
                                <p className="p2"> {description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="card-body">
                    <div className="card-title text-center"><h5>Profile</h5></div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6"> <h6 className="float-right">Height:</h6></div>
                                <div className="col-md-6"> <h6 className="float-left">{height} meters </h6></div>
                            </div>
                            <div className="row">
                                <div className="col-md-6"> <h6 className="float-right">Weight:</h6></div>
                                <div className="col-md-6"> <h6 className="float-left">{weight / 10} kg </h6></div>
                            </div>
                            <div className="row">
                                <div className="col-md-6"> <h6 className="float-right">Abilities:</h6></div>
                                <div className="col-md-6"> <h6 className="float-left">{capitalizeFirstLetter(abilities.ability1)} </h6></div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6"> <h6 className="float-right">Capture Rate:</h6></div>
                                <div className="col-md-6"> <h6 className="float-left">{captureRate} / 255 </h6></div>
                            </div>
                            <div className="row">
                                <div className="col-md-6"> <h6 className="float-right">Base Happiness:</h6></div>
                                <div className="col-md-6"> <h6 className="float-left">{baseHappiness} / 255 </h6></div>
                            </div>
                            <div className="row">
                                <div className="col-md-6"> <h6 className="float-right">Gender :</h6></div>
                                <div className="col-md-6"> <h6 className="float-left">{gender ? ("Gender Differences") : ("No Differences between genders")}  </h6></div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        Data from <a href="https://pokeapi.co/" target="_blank" className="card-link">PokeApi.co</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pokemon;
