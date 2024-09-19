import React from "react"
import MovieList from "./MovieList"
import { useSelector } from "react-redux"

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies)
  return (
    <div className="bg-black">
      <div className="-mt-32 relative z-20 pl-12 font-medium">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
      </div>
      {/* 
        MovieList - popular
        MovieList - now playing
        MovieList - trending
        MovieList - horror 
    */}
    </div>
  )
}

export default SecondaryContainer
