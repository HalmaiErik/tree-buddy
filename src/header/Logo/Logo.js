import React from 'react'
import logo from '../../logo.svg';
import styles from './Logo.module.css';

const Logo = () => {
    return (
        <div className={styles.logo}>
            <img src={logo} alt="logo"></img>
            <div>
                <h1 className={styles.h1}>Tree Buddy</h1>
                <h4 className={styles.h4}>Blockchain forest manager</h4>
            </div>
        </div>

    )
}

export default Logo