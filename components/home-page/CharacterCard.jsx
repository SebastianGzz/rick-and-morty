/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import PropTypes from "prop-types";
import styles from "../../styles/home-page/CharacterCard.module.scss";

export default function CharacterCard({ id, name, image, status }) {
  return (
    <Link href={`/character/${id}`}>
      <a>
        <div className={styles.character_container}>
          <div className={styles.info_character}>
            <h2>{name}</h2>
            <div className={styles.status_container}>
              <div className={status.toLowerCase()} />
              <span>{status}</span>
            </div>
          </div>

          <div className={styles.image_container}>
            <div className={styles.degraded} />
            <img className={styles.image_character} src={image} alt={name} />
          </div>
        </div>
      </a>
    </Link>
  );
}

CharacterCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["Alive", "Dead", "unknown"]).isRequired,
};
