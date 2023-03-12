import React from 'react'
import styles from './rightSidebar.module.css'
import genresData from './genres/genresData'
import Genre from './genres/Genre'
import favArtistData from './favArtist/favArtistData'
import FavArtist from './favArtist/FavArtist'
import TheGirl from '../../assets/images/TheSnippedGirl.PNG'
import {AiOutlinePlus} from 'react-icons/ai'

export default function RightSidebar() {
  return (
    <aside className={styles.container}>
       <h2>Shortcuts</h2>
       <div className={styles.genres}>
          {
            genresData.map((genre, idx) => {
               return  <Genre genre={genre} key={idx}/>
            })
          }
       </div>
       <div className={styles.favArtistsWrapper}>
           <h2>Fav Artist</h2>
           <div>
            {
              favArtistData.map((favArtist, idx) => {
                  return <FavArtist favArtist={favArtist} key={idx}/>
              })
            }
           </div>
       </div>
       <div className={styles.girlSection}>
          <img src={TheGirl} alt="chinese girl" />
          <div>
            <div>
              <span>Torisetsu chinese</span>
              <span>Kana Nishina</span>
            </div>
            <div>
              <AiOutlinePlus />
            </div>
          </div>
       </div>
    </aside>
  )
}
