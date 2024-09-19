import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addPopularMovies } from "../utils/moviesSlice"
import { API_OPTIONS } from "../utils/constants"
import { useSelector } from "react-redux"

const usePopularMovies = () => {
  //fetch data from TMDB API and Update Store
  const dispatch = useDispatch()

  const popularMovies = useSelector((store) => store.movies.popularMovies)

  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS,
      { referrerPolicy: "unsafe-url" }
    )
    const json = await data.json()
    dispatch(addPopularMovies(json.results))
  }
  useEffect(() => {
    !popularMovies && getPopularMovies()
  }, [])
}

export default usePopularMovies
