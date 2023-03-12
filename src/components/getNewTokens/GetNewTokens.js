import React from 'react'

export default function GetNewTokens() {
    function handleClick() {
        window.localStorage.removeItem('token')
        window.location.reload()
    }
  return (
    <div>
       Token has expired
       <button onClick={handleClick}>Get new Token</button>
    </div>
  )
}
