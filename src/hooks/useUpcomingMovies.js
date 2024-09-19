import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addUpcomingMovies } from "../utils/moviesSlice"
import { API_OPTIONS } from "../utils/constants"
import { useSelector } from "react-redux"

const useUpcomingMovies = () => {
  //fetch data from TMDB API and Update Store
  const dispatch = useDispatch()
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies)

  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS,
      { referrerPolicy: "unsafe-url" }
    )
    const json = await data.json()
    dispatch(addUpcomingMovies(json.results))
  }
  useEffect(() => {
    !upcomingMovies && getUpcomingMovies()
  }, [])
}

export default useUpcomingMovies
