import React, { useEffect } from "react"
import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addUser, removeUser } from "../utils/userSlice"
import { LOGO } from "../utils/constants"
import { toggleGptSearchView } from "../utils/gptSlice"
import { SUPPORTED_LANGUAGES } from "../utils/constants"
import { changeLanguage } from "../utils/configSlice"
import { Link } from "react-router-dom"
import user_avatar from "../img/Netflix_user_icon.png"

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((store) => store.user)
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  const handleGptSearchClick = () => {
    //Toggle GPT Search Button
    dispatch(toggleGptSearchView())
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        )
        // ...
        navigate("/browse")
      } else {
        // User is signed out
        dispatch(removeUser())
        navigate("/")
        // ...
      }
    })

    //unsubscribe when component unmount
    return () => unsubscribe()
  }, [])

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        navigate("/error")
        // An error happened.
      })
  }
  const handleLangChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }
  return (
    <div className="absolute w-screen px-8 py-2  bg-gradient-to-b from-black z-10 flex justify-between -mt-0">
      <img className="w-44" src={LOGO} alt="Logo" />
      {user && !showGptSearch && (
        <div className="flex flex-grow mx-8 space-x-8 mt-6 text-white font-bold">
          <Link>Home</Link>
          <Link>Movies</Link>
          <Link>New & Popular</Link>
          <Link>TV Shows</Link>
          <Link>My Lists</Link>
          <Link>Browse by Languages</Link>
        </div>
      )}
      {user && (
        <div className="flex p-4">
          {showGptSearch && (
            <select
              className="bg-gray-900 text-white font-medium p-2 mr-4"
              onChange={handleLangChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 bg-purple-800 rounded-lg text-white mr-4 font-medium"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img className="w-10 h-10 mr-2" src={user_avatar} alt="usericon" />
          <button onClick={handleSignOut} className="font-bold text-white">
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default Header
