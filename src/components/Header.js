import React, { useState } from 'react'
import axios from 'axios';
import './header.css'

const search_api="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const Header=({setMovies})=>{
    const [searchTerm,setSearchTerm] =useState('');
    const handleOnChange=(e)=>{
        setSearchTerm(e.target.value);
    }
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        axios.get(search_api+searchTerm)
            .then(({data})=>{
            const movieArray=data.results;
            setMovies(movieArray);
        });
        setSearchTerm('')
    }
    
    return(
        <div className="header">
            
            <form onSubmit={handleOnSubmit}>
                <input
                    className="search" 
                    type="text" 
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleOnChange}/>
            </form>
        </div>
    )
}
export default Header;