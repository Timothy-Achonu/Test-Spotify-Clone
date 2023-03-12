import React from "react";
import styles from "./song.module.css";
import { RxSpeakerLoud } from "react-icons/rx";
import usePlayTrack from "../../customHooks/usePlayTrack";

export default function Song({ track, idx, whoIsCalling}) {
  // console.log(track)

  const {id,name,artists,context_uri,track_number, imageSrc} = track
  const playTrack = usePlayTrack()
  return (
    <div
    onClick={() => playTrack(id,name,imageSrc,artists,context_uri,track_number)}
      className={`${styles.song} ${track.playing ? styles.playing : ""} ${
        whoIsCalling === "Playlist" ? styles.Playlist : ""
      }`}
    >
      <div className={styles.songHash}>
        {track.playing ? <RxSpeakerLoud /> : "0" + (idx + 1).toString()}
      </div>
      <div className={styles.songTitle}> {track.name} </div>
      <div className={styles.songArtist}> {track.artists.join(' ')} </div>
      <div className={styles.songTime}> {track.duration}</div>
      <div className={styles.songAlbum}> {track.album}</div>
    </div>
  );
}
