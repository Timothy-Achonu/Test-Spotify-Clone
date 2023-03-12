import React, { useEffect } from "react";
import styles from "./playlist.module.css";
import { useStateProvider } from "../../../utilities/StateProvider";
import Song from "../song/Song";

export default function Playlist() {
  const [initialState] = useStateProvider();
  const { selectedPlaylist, playlists } = initialState;
  // console.log(selectedPlaylist)
  // console.log( "Playlist =>>", playlists)
  return (
    <div>
      {selectedPlaylist?.id && (
        <div className={styles.playlist}>
          <div className={styles.imageSongNameWrapper}>
            <figure>
              <img src={selectedPlaylist.imageSrc} />
            </figure>
            <div>
              <h2> {selectedPlaylist.name} </h2>
              <div>
                <span> {playlists.owner} </span>
                <span> {`${selectedPlaylist.tracks.length} songs`} </span>
              </div>
            </div>
          </div>

          <div className={styles.table}>
            <div className={styles.rowHead}>
              <div>#</div>
              <div>TITLE</div>
              <div>ARTIST</div>
              <div>TIME</div>
              <div>ALBUM</div>
            </div>
            {selectedPlaylist?.tracks.map((track, idx) => {
              return <Song track={track} key={track.id} idx={idx} whoIsCalling={"Playlist"}/>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
