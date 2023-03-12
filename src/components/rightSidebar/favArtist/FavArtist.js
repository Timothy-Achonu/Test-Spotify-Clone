import React from 'react'
import styles from './favArtist.module.css'

export default function FavArtist({favArtist}) {
  return (
    <div className={styles.favArtist}>
        <img src={favArtist.imgSrc} alt={favArtist.name} />
        <div>
            <span> {favArtist.name} </span>
            <span> {favArtist.description} </span>
        </div>
        <div>..</div>
    </div>
  )
}
