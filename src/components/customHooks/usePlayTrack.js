import React, { useEffect } from "react";
import { useStateProvider } from "../../utilities/StateProvider";
import { reducerCases } from "../../utilities/Constants";
import axios from "axios";

export default function usePlayTrack() {
  const [initialState, dispatch] = useStateProvider();
  const { token, currentlyPlaying } = initialState;

  const playTrack = async (
    id,
    name,
    imageSrc,
    artists,
    context_uri,
    track_number
  ) => {
    if (currentlyPlaying) {
      const response = await axios.put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          context_uri,
          offset: {
            position: track_number - 1,
          },
          position_ms: 0,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 204) {
        const currentlyPlaying = {
          id,
          name,
          artists,
          imageSrc,
        };
        console.log(currentlyPlaying);
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
      } else
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }
  };
  return playTrack;
}
