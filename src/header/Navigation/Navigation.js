import React from 'react'
import styles from './Navigation.module.css'

const Navigation = () => {
  return (
    <div className={styles.container} contentEditable='false'>
        <ul>
          <li><a href="#">Contracts</a></li>
          <li><a href="#">Cutters</a></li>
          <li><a href="#">Foresters</a></li>
        </ul>
    </div>
  )
}

export default Navigation