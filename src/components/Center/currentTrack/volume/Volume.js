import React from "react";
import styles from "./volume.module.css";
import { RxSpeakerQuiet } from "react-icons/rx";
import { RxSpeakerLoud } from "react-icons/rx";
import { useStateProvider } from "../../../../utilities/StateProvider";
import axios from "axios";

export default function Volume({isTrackPlaying}) {
  const [initialState] = useStateProvider();
  const { token } = initialState;
  const setVolume = async (e) => {
    if(isTrackPlaying) {
    await axios.put(
      `https://api.spotify.com/v1/me/player/volume`,
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    }
  };
  return (
    <div className={styles.audioRange}>
      <figure>
        <RxSpeakerQuiet />
      </figure>
      <input type="range" min={0} max={100} onMouseUp={(e) => setVolume(e)} />
      <figure>
        <RxSpeakerLoud />
      </figure>
    </div>
  );
}
