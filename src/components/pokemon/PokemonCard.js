import React from 'react';
import { useState, useEffect } from 'react';
import styled from "styled-components"
import { Link } from "react-router-dom";

const Sprite = styled.img`
width:5em;
height:5em;
display:none;
`

const Card = styled.div`
box-shadow:0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,0.24)
transition: all 0.3s cubic-bezier(0.25,0.8,0.25,1);
transition: transform .2s;
&:hover{
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    transform: scale(1.2)
}
`

const StyledLink = styled(Link)`
text-decoration:none;
color:black;
&:focus,
&:hover,
&:visited,
&:link,
&:active{
    text-decoration:none;
}
`
function PokemonCard(props) {
    const [id] = useState(props.id)
    const [name] = useState(props.name)
    const [imageUrl, setImageUrl] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setImageUrl(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`)
    }, [])


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    return (
        <div className="col-md-3 col-sm-6 mb-5">
            <StyledLink to={`${id}`}>
                <Card className="card">
                    <h5 className="card-header"> {id}</h5>
                    {loading ? (<div className="spinner-border card-img-top rounded mx-auto mt-2 " role="status"></div>) : null}
                    <Sprite className="card-img-top rounded mx-auto mt-2"
                        src={imageUrl}
                        onLoad={() => setLoading(false)}
                        style={loading ? null : { display: "block" }}>
                    </Sprite>
                    <div className="card-body mx-auto">
                        <h6 className="card-title">
                            {capitalizeFirstLetter(name)}
                        </h6>
                    </div>
                </Card>
            </StyledLink >
        </div>
    )
}

// if on medium screen, 1 card will take 3 blocks = 4 blocks total , if small , then 6 blocks = 2 on small pages 

export default PokemonCard;
