import Image from "next/image";
import IconSearch from "../icons/IconSearch";
import logoRickandMorty from "../../public/logo.png";
import styles from "../../styles/home-page/Header.module.scss";

export default function Header({ InputEvent }) {
  return (
    <header className={styles.header}>
      <Image src={logoRickandMorty} layout="responsive" alt="Rick and Morty" />
      <div className={styles.search_wrapper}>
        <IconSearch color="#868686" />
        <input
          type="text"
          onChange={(e) => InputEvent(e.target.value)}
          placeholder="Search Character"
        />
      </div>
    </header>
  );
}
