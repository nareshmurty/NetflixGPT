import React, { useRef } from "react"
import lang from "../utils/languageConstants"
import { useDispatch, useSelector } from "react-redux"
import { openai } from "../utils/openai"
import { API_OPTIONS } from "../utils/constants"
import { addGptMovieResult } from "../utils/gptSlice"

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang)
  const searchText = useRef(null)
  const dispatch = useDispatch()

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    )
    const json = await data.json()
    return json.results
  }

  const handleGptSearchClick = async (e) => {
    e.preventDefault()

    // const getQuery =
    //   "Act as a movie recommendation system and suggest some movies for the query : " +
    //   searchText.current.value +
    //   ". Only give me names of 5 movies , comma seperated like the example result given ahead. Example Result: Gadar, Kalki, Maharaja, The Goat Life, Manjummel Boys"
    // //make an api call to openai to get movie results
    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: getQuery }],
    //   model: "gpt-3.5-turbo",
    // })

    // if (!gptResults.choices) alert("No Movies")

    // const gptMovies = gptResults.choices?.[0]?.message?.content.split(",")
    // const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie)) //[promise,promise,promise,promise,promise]

    const movies = [
      "Fury",
      "The Power of the Dog",
      "Godfather",
      "The Dark Knoght",
      "Batman",
    ]

    // const tmdbResults = await Promise.all(promiseArray)
    // console.log(tmdbResults)

    dispatch(
      // addGptMovieResult({ movieNames: movies, movieResults: tmdbResults })
      addGptMovieResult({ movieNames: movies })
    )
  }

  return (
    <div className="pt-[10%] flex justify-center">
      <form className="bg-black w-1/2 grid grid-cols-12" onSubmit={() => {}}>
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="p-4 m-4 col-span-9"
        />
        <button
          className="py-2 px-4 bg-red-700 text-white rounded-lg col-span-3 m-4 font-medium"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar
