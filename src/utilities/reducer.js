import { reducerCases } from "./Constants";

/*
GO BACK TO CSS LATER, MAKE YOUR APP 100VH HEIGHT MAKE EVERY 
SECTION(LIKE PLAYLISTS IN THE SIDEBAR) THAT'S TAKING TOO MUCH 
OVERFLOW HIDDEN AND SCROLL.

That search and the back and forward icons should probably be
in every route, so it should be in it's own component. NO
IT SHOULD BE JUST THERE, IF YOU WANT TO SEARCH GO BACK HOME!!.
*/

export const initialState = {
  token: null,
  playlists: [],
  userInfo: null,
  selectedPlaylistId: window.localStorage.getItem("selectedPlaylistId")
    ? window.localStorage.getItem("selectedPlaylistId")
    : "3IoJzrmXtR72F6Rsc6HOm8",
  selectedPlaylist: null,
  currentlyPlaying: null,
  playerState: false,
  tokenExpired: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN: {
      return { ...state, token: action.token };
    }
    case reducerCases.SET_PLAYLISTS: {
      return { ...state, playlists: action.playlists };
    }
    case reducerCases.SET_USER: {
      return { ...state, userInfo: action.userInfo };
    }
    case reducerCases.SET_PLAYLIST: {
      return { ...state, selectedPlaylist: action.selectedPlaylist };
    }
    case reducerCases.SET_PLAYING: {
      return { ...state, currentlyPlaying: action.currentlyPlaying };
    }
    case reducerCases.SET_PLAYER_STATE: {
      return { ...state, playerState: action.playerState };
    }
    case reducerCases.SET_PLAYLIST_ID: {
      return { ...state, selectedPlaylistId: action.selectedPlaylistId };
    }
    case reducerCases.SET_TOKEN_EXPIRED: {
      return { ...state, tokenExpired: action.tokenExpired };
    }
    default:
      return state;
  }
};

export default reducer;
