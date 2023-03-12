import React, { useEffect } from "react";
import styles from "./playerControls.module.css";
import axios from "axios";
import { useStateProvider } from "../../../../utilities/StateProvider";
import { reducerCases } from "../../../../utilities/Constants";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";

export default function PlayerControls({
  getCurrentPlayingTrack,
  isTrackPlaying,
}) {
  const [initialState, dispatch] = useStateProvider();
  const { token, playerState } = initialState;

  useEffect(() => {
    const getPlayerState = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/me/player`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.data);
      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        playerState: response.data.is_playing,
      });
    };
    getPlayerState();
  }, [token, playerState]);

  const changeTrack = async (type) => {
    if (isTrackPlaying) {
      await axios.post(
        `https://api.spotify.com/v1/me/player/${type}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      setTimeout(() => {
        getCurrentPlayingTrack();
      }, 1000);
    }
  };
  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    if (isTrackPlaying) {
      const response = await axios.put(
        `https://api.spotify.com/v1/me/player/${state}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        playerState: !playerState,
      });
    }
  };

  return (
    <div className={styles.playerControls}>
      <div>
        <div className={styles.shuffle}>
          <BsShuffle />
        </div>
        <div className={styles.prev}>
          <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
        </div>
        <div className={styles.play}>
          {playerState ? (
            <BsFillPauseCircleFill onClick={changeState} />
          ) : (
            <BsFillPlayCircleFill onClick={changeState} />
          )}
        </div>
        <div className={styles.next}>
          <CgPlayTrackNext onClick={() => changeTrack("next")} />
        </div>
        <div className={styles.repeat}>
          <FiRepeat />
        </div>
      </div>
    </div>
  );
}
