import React, { useEffect } from "react";
import styles from "./currentTrack.module.css";
import axios from "axios";
import { useStateProvider } from "../../../utilities/StateProvider";
import { reducerCases } from "../../../utilities/Constants";
import PlayerControls from "./playerControls/PlayerControls";
// import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import Volume from "./volume/Volume";

export default function CurrentTrack() {
  const [initialState, dispatch] = useStateProvider();
  const { token, currentlyPlaying } = initialState;

  const getCurrentPlayingTrack = async () => {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data !== "") {
      const { item } = response.data;
      const currentlyPlaying = {
        id: item.id,
        name: item.name,
        artists: item.artists.map((artist) => artist.name),
        imageSrc: item.album.images[2].url,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
    } else {
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
    }
  };

  useEffect(() => {
    getCurrentPlayingTrack();
  }, [dispatch, token]);

  return (
    <div>
      {currentlyPlaying ? (
        <div className={styles.currentlyPlaying}>
          <div>
            <div className={styles.songArtistsWrapper}>
              <div>
                <span> {currentlyPlaying.name} </span>
                <span> {currentlyPlaying.artists.join(" ")} </span>
              </div>
              <figure>
                <MdFavoriteBorder />
              </figure>
            </div>
            <PlayerControls getCurrentPlayingTrack={getCurrentPlayingTrack} isTrackPlaying={true}/>
            <Volume isTrackPlaying={true}/>
          </div>
          <div>duration</div>
        </div>
      ) : (
        <div className={styles.currentlyPlaying}>
          <div>
            <div className={styles.songArtistsWrapper}>
              <div>
                <span> No track </span>
                <span> is playing </span>
              </div>
              <figure>
                <MdFavoriteBorder />
              </figure>
            </div>
            <PlayerControls getCurrentPlayingTrack={getCurrentPlayingTrack} isTrackPlaying={false}/>
            <Volume isTrackPlaying={false}/>
          </div>
          <div> No duration</div>
        </div>
      )}
    </div>
  );
}
