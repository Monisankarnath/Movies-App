import React, { useRef, useState } from 'react'
import axios from 'axios';
import './header.css'
import {Link} from 'react-router-dom';

const search_api="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const Header=({setMovies,setPageRequired})=>{
    const [disableSearch,setDisableSearch] =useState(false);
    const inputRef=useRef();
    const [searchTerm,setSearchTerm] =useState('');
    const [movieSearchList,setMovieSearchList]=useState([]);
    const handleOnChange=async (e)=>{
        setSearchTerm(e.target.value);
        if(e.target.value === '') setMovieSearchList([]);
        let movieList=[];
        await axios.get(search_api+searchTerm)
            .then(({data})=>{
            const movieArray=data.results;
            movieArray.forEach((movie)=>{
                if(searchTerm==='') return;
                if(movie.title.toLowerCase().substr(0,e.target.value.length)===e.target.value.toLowerCase()){
                    movieList.push(movie.title);
                    setMovieSearchList(movieList);
                }
            });
            console.log(movieSearchList)
        }).catch((err)=>console.log("error occurred",err));
    }
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        axios.get(search_api+searchTerm)
            .then(({data})=>{
            const movieArray=data.results;
            setMovies(movieArray);
        });
        setPageRequired(false);
        setSearchTerm('')
    }
    const autoComplete=(title)=>{
        setSearchTerm(title);
        setMovieSearchList([]);
        inputRef.current.focus();
    }
    
    return(
        <div className="header">
            <div className="header-list">
                <li onClick={()=>setDisableSearch(false)}>
                    <Link to="/" className="linkA">Movviee</Link>
                </li>
                <li onClick={()=>setDisableSearch(true)}>
                    <Link to="/watchlist" className="linkB">Watchlist</Link>
                </li>
            </div>
            <form onSubmit={handleOnSubmit}>
                <input
                    ref={inputRef}
                    className="search" 
                    type="text" 
                    placeholder="Search..."
                    value={searchTerm}
                    disabled={disableSearch}
                    onChange={handleOnChange}/>
            </form>
            {searchTerm && <div className="search-list">
                {movieSearchList.map((title,index)=>(
                    <li
                        key={index}
                        onClick={()=>autoComplete(title)}
                    >
                        {title}
                    </li>
                ))}
            </div>}
        </div>
    )
}
export default Header;