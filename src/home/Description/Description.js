import React from 'react'
import styles from './Description.module.css'
import Typical from 'react-typical'

const Description = () => {
  return (
    <div className={styles.description}>
        <h1 style={{margin: 0}}>
            <Typical
                loop={1}
                wrapper="b"
                steps={[
                    'Monitor tree cutting', 1000,
                    'Warnings of irregular transport', 1000,
                    'Prevent illegal wood cutting!', 1000
                ]}
            />
        </h1>
        <p className={styles.paragraph}>Built on Ethereum blockchain</p>
    </div>
  )
}

export default Description