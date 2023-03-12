import React from "react";
import { useEffect } from "react";
import { useStateProvider } from "../../../utilities/StateProvider";
import axios from "axios";
import { reducerCases } from "../../../utilities/Constants";
import NavLinks from "../navLinks/NavLinks";
import { TbPlaylist } from "react-icons/tb";
import styles from "./playlists.module.css";
import useGetSelectedPlaylist from "../../customHooks/useGetSelectedPlaylist";
import useGetUserInfo from "../../customHooks/useGetUserInfo";

export default function Playlists() {
  const [initialState, dispatch] = useStateProvider();
  const { token, playlists } = initialState;
  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };
    getPlaylistData();

  }, [token, dispatch]);

    useGetSelectedPlaylist();
    useGetUserInfo();


    const changeCurrentPlaylist = (selectedPlaylistId) => {
      dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
      window.localStorage.setItem("selectedPlaylistId", selectedPlaylistId)
    };
 
  return (
    <div className={styles.playlistsContainer}>
      {playlists.map((playlist) => {
        return (
          <NavLinks
            icon={<TbPlaylist />}
            text={playlist.name}
            key={playlist.id}
            isPlayLists={true}
            setPlaylist={() => changeCurrentPlaylist(playlist.id)}
          />
        );
      })}
    </div>
  );
}
