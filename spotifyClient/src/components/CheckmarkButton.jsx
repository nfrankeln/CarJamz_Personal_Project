import styles from './CheckmarkButton.module.css'
export default function CheckmarkButton(){
    return(
        <button className={styles.roundButton}>
  <div className={styles.tickShort}></div>
  <div className={styles.tickLong}></div>
</button>
    )
}