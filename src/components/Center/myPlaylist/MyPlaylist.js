import React from "react";
import styles from "./myPlaylist.module.css";
import Song from "../song/Song";
import { useStateProvider } from "../../../utilities/StateProvider";

export default function MyPlaylist() {
  const [initialState] = useStateProvider();
  const {  selectedPlaylist } = initialState;
 
  return (
    <div>
      <div className={styles.myPlaylistsWrapper}>
        <div>
          <h2>My Playlist</h2>
          <span >Show more</span>
        </div>
        <div className={styles.tableWrapper}>
          <div className={styles.table}>
            <div className={styles.rowHead}>
              <div>#</div>
              <div>TITLE</div>
              <div>ARTIST</div>
              <div>TIME</div>
              <div>ALBUM</div>
            </div>
            {selectedPlaylist?.tracks.map((track, idx) => {
              return <Song track={track} key={track.id} idx={idx} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
