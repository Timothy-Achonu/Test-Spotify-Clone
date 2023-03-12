import React, { useEffect } from "react";
import RightSidebar from "../rightSidebar/RightSidebar";
import Center from "../Center/Center";
import styles from "./mainApp.module.css";
import axios from "axios";
import { useStateProvider } from "../../utilities/StateProvider";
import { reducerCases } from "../../utilities/Constants";

export default function MainApp( ) {
  const [initialState, dispatch] = useStateProvider();
  const { token } = initialState;
  function throwError() {
    throw new Error("Token has expired");
  }
  useEffect(() => {
    const getUserInfo = async () => {
      let response;
      try {
      response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })} catch(err) {
           if(err.response.status === 401) {
            console.log("IN IF Error caught ==>",  err.response.status)
            dispatch({type: reducerCases.SET_TOKEN_EXPIRED, tokenExpired: true})
            throwError()
           }
           console.log("Error caught ==>",  err.response.status)
      }
      const userInfo = {
        userId: response.data.id,
        userName: response.data.display_name,
        imageSrc: response.data.images[0].url,
      }
      dispatch({type: reducerCases.SET_USER, userInfo})
    };
    getUserInfo()
  }, [dispatch, token]);

  // const [reRenderMyPlaylist, setReRenderMyPlaylist] = useState('notReRendered')
  //  const changeCurrentPlaylist = (selectedPlaylistId) => {
  //   setReRenderMyPlaylist('reRendered')
  //   dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  //   console.log(selectedPlaylistId)
  // };
  // console.log( "renderMyplaylist==> " ,reRenderMyPlaylist);
  // console.log('In app')
  // console.log(selectedPlaylist?.name)
  return (
    <div className={styles.container}>
      <Center  />
      <RightSidebar />
    </div>
  );
}
