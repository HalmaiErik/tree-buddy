import styles from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={styles.content}>
            <div className={styles.center}>
                <h1>Page not found</h1>
                <h3>You got lost in the forest...</h3>
            </div>
        </div>
    )
}

export default NotFound