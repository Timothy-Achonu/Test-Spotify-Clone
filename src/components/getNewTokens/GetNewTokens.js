import React from 'react'
import { useStateProvider } from '../../utilities/StateProvider';

export default function GetNewTokens() {
  const [initialState,] = useStateProvider()
  const {redirectUrl} = initialState
    function handleClick() {
      window.localStorage.removeItem('token')
      window.location.href = redirectUrl;
    }
  return (
    <div>
       Token has expired
       <button onClick={handleClick}>Get new Token</button>
    </div>
  )
}
