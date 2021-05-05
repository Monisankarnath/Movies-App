import React from 'react'
import './movie.css'

const image_api="https://image.tmdb.org/t/p/w1280";
const Movie=(props)=>{
    const {title,overview,poster,release,vote}=props;
    const small_title=title.length >18 ? title.substring(0,18) + "..." : title;
    return(
        <div className="movie">
            <i className="fa fa-bookmark"></i>
            <img src={image_api+poster} alt="Movie Poster"/>
            <div className="movie-info">
                <h4>{small_title}</h4>
                <span className={vote >=8 ? 'green' : vote >6 ? 'yellow' : 'orange' }>
                    {vote}
                </span>
            </div>
            <div className="movie-over">
                <h2>{title}</h2>
                <h5>Release Date : {release}</h5>
                <p>{overview}</p>
            </div>
            
        </div>
    )
}
export default Movie;