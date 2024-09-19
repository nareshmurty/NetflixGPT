import React from "react"
import { IMG_CDN_URL } from "../utils/constants"

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-48 pr-4 cursor-pointer transform transition-transform hover:scale-125 hover:shadow-lg">
      <img
        src={IMG_CDN_URL + posterPath}
        alt="Movie Card"
        className="w-full h-auto"
      />
    </div>
  )
}

export default MovieCard
