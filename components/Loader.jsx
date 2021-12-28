import styles from "../styles/Loader.module.scss";

export default function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.circle}></div>
    </div>
  );
}
