import React, { useEffect, useState } from 'react'
import './movie.css'
// import { RiBookmarkFill } from 'react-icons/ri';
import {BsFillPlusCircleFill} from 'react-icons/bs';
import {FcSurvey} from 'react-icons/fc';
import { motion, AnimatePresence } from "framer-motion"

const image_api="https://image.tmdb.org/t/p/w1280";
const Movie=(props)=>{
    // const [saveMovie, setSaveMovie]=useState({bookmarked : false})
    const [bookmarked,setBookmarked]=useState(false);
    const [clicked,setclicked]=useState(false);
    const {id,title,overview,poster,release,vote}=props;
    const small_title=title.length >18 ? title.substring(0,18) + "..." : title;
    useEffect(()=>{
        // if(localStorage.getItem(id)) setBookmarked(localStorage.getItem(id));
        // localStorage.setItem(id,bookmarked);
        // console.log(id,bookmarked);
    },[bookmarked]);
    const handleBookmarkClick=()=>{
        setBookmarked(bookmarked=>!bookmarked);
           
    }
    return(
        <div className="movie">
            <BsFillPlusCircleFill
                className="bookmark" 
                style={{color: bookmarked?'#4FD962': 'white'}}
                onClick={handleBookmarkClick}
            />
            <FcSurvey
                className="pencil" 
            />
            {/* FcOk */}
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
                    transition={{duration: 0.6}}
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