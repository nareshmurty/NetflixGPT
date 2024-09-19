import user_avatar from "../img/Netflix_user_icon.png"

export const LOGO =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"

export const USER_AVATAR = user_avatar

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
  },
}

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w780"

export const BG_URL =
  "https://wallpapers.com/images/hd/netflix-background-gs7hjuwvv2g0e9fj.jpg"

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
]

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY
