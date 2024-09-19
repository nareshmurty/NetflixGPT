import React from "react"

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video py-[20%] px-20 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="py-6 text-small w-1/4">{overview}</p>
      <div className="">
        <button className="mx-2 bg-white text-black font-medium p-2 px-8  text-lg rounded-lg hover:bg-opacity-80">
          Play
        </button>
        <button className="bg-gray-500 text-white p-2 px-8 font-medium text-lg bg-opacity-50 rounded-lg hover:bg-opacity-80">
          More Info
        </button>
      </div>
    </div>
  )
}

export default VideoTitle
