import React, { useContext, useState } from 'react'
import './movie.css'
// import { RiBookmarkFill } from 'react-icons/ri';
import {BsFillPlusCircleFill} from 'react-icons/bs';
// import {FcSurvey} from 'react-icons/fc';
import { motion, AnimatePresence } from "framer-motion"
import { GlobalContext } from '../hooks/GlobalState';

const image_api="https://image.tmdb.org/t/p/w1280";
const Movie=(props)=>{
    const {
        addMovieToWatchlist,
        watchlist
    }=useContext(GlobalContext)
    
    const [clicked,setclicked]=useState(false);
    const {id,title,overview,poster,release,vote}=props;
    const small_title=title.length >18 ? title.substring(0,18) + "..." : title;
    
    const [playlist,setPlaylist]=useState({id: id,title:title,poster:image_api+poster,notes: ''});
    let storedMovie=watchlist.find(obj=>obj.id === id);
    const watchlistDisabled = storedMovie ? true : false;

    const handlePlaylistClick=()=>{
        setPlaylist(playlist);
        addMovieToWatchlist(playlist); 
    }
    return(
        <div className="movie">
            <button
                className="bookmark" 
                onClick={handlePlaylistClick}
                disabled={watchlistDisabled}
            ><BsFillPlusCircleFill 
                    className="add"
                    style={{color: watchlistDisabled?'#4FD962': 'white'}}
                />
            </button>
            <img src={
                poster ? (image_api+poster)
                : 'https://images.unsplash.com/photo-1592912789156-19ac72bec0d9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
                } alt="Movie Poster"/>
            <div className="movie-info" onClick={()=>setclicked(!clicked)}>
                <h4>{small_title}</h4>
                <span className={vote >=8 ? 'green' : vote >6 ? 'yellow' : 'orange' }>
                    {vote}
                </span>
            </div>
            <AnimatePresence initial={false}>
                {clicked && <motion.div 
                    className="movie-over" 
                    onClick={()=>setclicked(!clicked)}
                    initial={{ opacity: 0, y: 150 }}
                    animate={{ opacity: 1,y :0 }}
                    exit={{ opacity: 0 }}
                    transition={{duration: 0.3}}
                >
                <h2>{title}</h2>
                <h5>Release Date : {release}</h5>
                <p>{overview}</p>
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}
export default Movie;