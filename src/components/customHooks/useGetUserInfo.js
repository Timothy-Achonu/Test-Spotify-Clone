import React, {useEffect} from 'react'
import { useStateProvider } from '../../utilities/StateProvider';
import { reducerCases } from '../../utilities/Constants';
import axios from 'axios';

export default function useGetUserInfo() {
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
  return initialState;
}
