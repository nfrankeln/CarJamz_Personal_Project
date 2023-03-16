import styles from './CloseButton.module.css'
export default function CloseButton(){
    return(
        <button className={styles.roundButton}>
  <div className={styles.backSlash}></div>
  <div className={styles.forwardSlash}></div>
        </button>
    
    )}
