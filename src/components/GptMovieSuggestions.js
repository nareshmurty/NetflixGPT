import React from "react"
import { useSelector } from "react-redux"
import MovieList from "./MovieList"

const GptMovieSuggestions = () => {
  const movies = useSelector((store) => store.movies)

  const { movieResults, movieNames } = useSelector((store) => store.gpt)
  return (
    <div>
      <div>
        {movieNames?.map((movie, index) => (
          <MovieList key={movie} title={movie} movie={movies.popularMovies} />
        ))}
      </div>
    </div>
  )
}

export default GptMovieSuggestions
