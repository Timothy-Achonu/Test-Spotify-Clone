import { createContext, useEffect, useState } from "react";
import "./App.css";
import Login from "./components/login/Login";
import MainApp from "./components/mainApp/MainApp";
import { Routes, Route } from "react-router-dom";
import LeftSidebar from "./components/leftSidebar/LeftSidebar";
import { useStateProvider } from "./utilities/StateProvider";
import { reducerCases } from "./utilities/Constants";
import Playlist from "./components/Center/playlist/Playlist";
import CurrentTrack from "./components/Center/currentTrack/CurrentTrack";
import GetNewTokens from "./components/getNewTokens/GetNewTokens";
function App() {
  /*
  The leftSidebar can be actual links. That would mean that the
  mainApp would not contain the sidebar anymore and then sidebar 
  would be link a nav that would be showing on every route
  *****
  The other Links like Trends can just lead to a static page with
  Trends written on it.
  ****
  The fav artists can actually lead to the artist's page. Maybe the
  spotify API can give us access to each users favorite artists, if
  not then we can use some Nigerian artists.
  ***
  Note: the search API can be different from other API's spotify
  API provides.
  ***
  Chill mix and his colleagues can be normal Links instead of NavLinks to avoid 
  getting the styling for active NavLinks
  ***
  Note: Search Leads to a new Route. Like the whole main app is replaced by a different page.
  Note: save token in localStorage. There should be a logout feature.
  But there is catch, tokens expire right?if it's saved in 
  localStorage, when the page is refreshed, a new one would not be
  generated because you won't be sent back to the login page. 
  So if you would save token in localStorage, you would
  have to logout to be able to create a new token
  */
  /*
useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    console.log("hash -----",hash);

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
    // console.log(token)
  }, []);
 */
  const [initialState, dispatch] = useStateProvider();
  const { token, tokenExpired } = initialState;
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash.substring(1).split("&")[0].split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    dispatch({ type: reducerCases.SET_TOKEN, token });

  }, [token, dispatch]);
  function showApp() {
    if((token && !tokenExpired)) {
        return true
    }
  }
  
  return (
    <div className="App">
        { showApp() ? (
        <>
          <LeftSidebar />
          <CurrentTrack />
          <Routes>
            <Route path="/" element={ <MainApp />} />
            <Route path="/playlist/:id" element={<Playlist />} />
          </Routes>
        </>
      ) : (
           !tokenExpired ? <Login /> :<GetNewTokens />
      )}
    </div>
  );
}

export default App;
