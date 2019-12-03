import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <Link to="/">
                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                    <h1 className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center">
                        Pokedex
                 </h1>
                </nav>
            </Link>
        </>
    )
}

export default Navbar;
