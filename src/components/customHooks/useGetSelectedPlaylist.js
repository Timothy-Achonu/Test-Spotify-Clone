import React, {useEffect} from 'react'
import axios from 'axios';
import { useStateProvider } from '../../utilities/StateProvider';
import { reducerCases } from '../../utilities/Constants';


export default function useGetSelectedPlaylist() {
    const [initialState, dispatch] = useStateProvider();
    const { token, selectedPlaylistId, selectedPlaylist } = initialState;
    useEffect(() => {
      const getInitialPlaylist = async () => {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        const selectedPlaylist = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description.startsWith("<a")
            ? ""
            : response.data.description,
          imageSrc: response.data.images[0].url,
          tracks: response.data.tracks.items.map(({ track }) => {
            return {
              id: track.id,
              name: track.name,
              artists: track.artists.map((artist) => artist.name),
              image: track.album.images[2].url,
              duration: msTominutes(track.duration_ms),
              album: track.album.name,
              context_uri: track.album.uri,
              track_number: track.track_number,
            };
          }),
        };
        dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
      };
      getInitialPlaylist();
    }, [dispatch, token, selectedPlaylistId]);
    function msTominutes(ms) {
      const minutes = Math.floor(ms / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

  return selectedPlaylist
}
