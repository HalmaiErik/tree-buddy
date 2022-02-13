import React from 'react'
import styles from './Navigation.module.css'

const Navigation = () => {
  return (
    <div className={styles.container}>
        <ul>
          <li>Contracts</li>
          <li>Cutters</li>
          <li>Foresters</li>
        </ul>
    </div>
  )
}

export default Navigation