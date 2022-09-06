import styles from '../../styles/Loader.module.css'

export default function Loader(){
   return(
      <div className={styles.body}>
         <div className={styles.loader}></div>
      </div>
   )
}