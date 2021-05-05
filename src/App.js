//npm i axios react-bootstrap
//npm i --save font-awesome
import React, { useEffect, useState } from 'react';
import Movie from './components/Movie';
import axios from 'axios';
import Header from './components/Header';
import 'font-awesome/css/font-awesome.min.css';

const featured="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const App =() =>{
    const [movies,setMovies]=useState([]);
    useEffect(()=>{
        axios.get(featured)
            .then(({data})=>{
            const movieArray=data.results;
            setMovies(movieArray);
            console.log(movieArray);
        }).catch((error)=>console.log('Error Occurred : ',error));
    },[])
    return(
        <div className="container">
            <Header setMovies={setMovies}/>
            <div className="movie-container">
                {movies && movies.map((movie)=>
                    <Movie 
                        key={movie.id} 
                        title={movie.title}
                        overview={movie.overview}
                        poster={movie.poster_path}
                        release={movie.release_date}
                        vote={movie.vote_average}

                    />
                )}
            </div>
        </div>
    )
}
export default App;