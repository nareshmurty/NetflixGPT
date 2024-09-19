import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNowPlayingMovies } from "../utils/moviesSlice"
import { API_OPTIONS } from "../utils/constants"

const useNowPlayingMovies = () => {
  //fetch data from TMDB API and Update Store
  const dispatch = useDispatch()

  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies)

  useEffect(() => {
    if (!nowPlayingMovies) getNowPlayingMovies()
  }, [])
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS,
      { referrerPolicy: "unsafe-url" }
    )
    const json = await data.json()
    dispatch(addNowPlayingMovies(json.results))
  }
}

export default useNowPlayingMovies
