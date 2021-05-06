//npm i axios react-bootstrap
//npm i --save font-awesome
//npm install react-icons --save
//npm install framer-motion
import React, { useEffect, useState } from 'react';
import Movie from './components/Movie';
import axios from 'axios';
import Header from './components/Header';
import {FcLeft,FcRight} from 'react-icons/fc';
// import 'font-awesome/css/font-awesome.min.css';

const App =() =>{
    
    const [page,setPage]=useState(1);
    const [pageRequired,setPageRequired]=useState(true);
    const [movies,setMovies]=useState([]);
    useEffect(()=>{
        const featured=`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`;
        axios.get(featured)
            .then(({data})=>{
            const movieArray=data.results;
            setMovies(movieArray);
            // console.log(movieArray);
        }).catch((error)=>console.log('Error Occurred : ',error));
        setPageRequired(true);
    },[page]);
    
    return(
        <div className="container">
            <Header 
                setMovies={setMovies}
                setPageRequired={setPageRequired}
                />
            
            <div className="movie-container">
                {movies && movies.map((movie)=>
                    <Movie 
                        key={movie.id} 
                        id={movie.id}
                        title={movie.title}
                        overview={movie.overview}
                        poster={movie.poster_path}
                        release={movie.release_date}
                        vote={movie.vote_average}

                    />
                )}
            </div>
             {pageRequired && <div className="pages">
                <FcLeft
                    className="next"
                    onClick={()=>{page >1 && setPage(page-1) }}
                />
                Page {page}
                <FcRight
                     className="next"
                     onClick={()=>setPage(page=>page+1)}
                />
            </div>}  
        </div>
    )
}
export default App;