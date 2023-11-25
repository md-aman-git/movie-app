import React from "react";
import { useState, useEffect } from "react";
import "./App.css"
import SearchIcon from "./search.svg"
import MovieCard from "./MovieCard";

//425c87a5

const MOVIE_API_URL = 'http://www.omdbapi.com?apikey=425c87a5';


const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchMoviesTerm, setSearchMoviesTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${MOVIE_API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Superman');
    }, []);
    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input placeholder="Search a movie" 
                value={searchMoviesTerm}
                onChange={(event) => setSearchMoviesTerm(event.target.value)} />
                <img src={SearchIcon} 
                alt="Search"
                onClick={() => searchMovies(searchMoviesTerm)} />
            </div>

            {
                movies?.length > 0 ? (
                    <div className="container">
                        { movies.map(movie => {
                            return <MovieCard movie={movie} />
                        })}
                    </div>
                ) : (
                    <div className="empty">
                        <h3>No movies found</h3>
                    </div>
                )
            }
        </div>
    );
}

export default App;