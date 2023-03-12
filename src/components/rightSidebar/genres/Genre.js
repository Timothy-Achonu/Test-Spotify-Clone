import React from 'react'
import styles from './genre.module.css';

export default function Genre({genre}) {
  return (
    <div className={styles.genre}>
       <img src={genre.imgSrc} alt={genre.text} />
       <span> {genre.text} </span>
    </div>
  )
}
