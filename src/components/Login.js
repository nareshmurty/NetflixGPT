import React, { useRef, useState } from "react"
import Header from "./Header"
import { checkValidData } from "../utils/validate"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { BG_URL, USER_AVATAR } from "../utils/constants"
import { toast } from "react-toastify"

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true)
  const [errorMessage, setErrorMessage] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const name = useRef(null)
  const email = useRef(null)
  const password = useRef(null)

  const toggleSignInForm = () => {
    setSignInForm(!isSignInForm)
    setErrorMessage("")
  }

  const handleButtonClick = () => {
    //validate the form data
    const message = checkValidData(email.current.value, password.current.value)
    setErrorMessage(message)

    if (message) return

    // Sign Up Logic
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user
          //update profile
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              )
            })
            .catch((error) => {
              setErrorMessage(error.message)
            })
          //update profile

          toast.success("Sign up successful")
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          setErrorMessage(errorCode + "-" + errorMessage)
          // ..
        })
    } else {
      //Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          setErrorMessage(errorCode + "-" + errorMessage)
        })
    }
  }
  return (
    <div>
      <Header />
      <div className="absolute ">
        <img className="" src={BG_URL} alt="Logo" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-32 mx-auto right-0 left-0 text-white bg-opacity-70 rounded-lg"
      >
        <h1 className="font-bold text-3xl p-2 my-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-3 m-2 w-full bg-gray-700 rounded-lg"
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="p-3 m-2 w-full bg-gray-700 rounded-lg"
        />
        <input
          type="text"
          ref={password}
          placeholder="Password"
          className="p-3 m-2 w-full bg-gray-700 rounded-lg "
        />
        <p className="text-red-500 font-bold text-lg p-3">{errorMessage}</p>
        <button
          className="p-3 mt-4 m-2 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p onClick={toggleSignInForm} className="cursor-pointer py-8">
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  )
}

export default Login
