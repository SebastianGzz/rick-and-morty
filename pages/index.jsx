/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import IconSearch from "../components/icons/IconSearch";
import MainLayout from "../components/layouts/MainLayout";
import logoRickandMorty from "../public/logo.png";
import Link from "next/link";

export async function getStaticProps() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();

  return {
    props: {
      nextPage: data.info.next,
      data: data.results,
    },
  };
}

export default function Home({ nextPage, data }) {
  const [characters, setCharacters] = useState(data);
  const [filtedCharacters, setFiltedCharacters] = useState(characters);
  const [nextUrl, setNextUrl] = useState(nextPage);
  const [search, setSearch] = useState("");

  const getMoreCharacters = async () => {
    const res = await fetch(nextUrl);
    const newData = await res.json();

    setCharacters([...characters, ...newData.results]);
    setNextUrl(newData.info.next);
  };

  useEffect(() => {
    setFiltedCharacters(
      characters.filter((character) =>
        character.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, characters]);

  return (
    <MainLayout>
      <header className={styles.header}>
        <Image
          src={logoRickandMorty}
          layout="responsive"
          alt="Rick and Morty"
        />
        <div className={styles.search_wrapper}>
          <IconSearch color="#868686" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Character"
          />
        </div>
      </header>

      <section className={styles.characters_wrapper}>
        {filtedCharacters.map((character, index) => (
          <Link href={`/character/${index + 1}`} key={index}>
            <a>
              <div className={styles.character_container}>
                <div className={styles.info_character}>
                  <h2>{character.name}</h2>
                  <div className={styles.status_container}>
                    <div className={character.status.toLowerCase()} />
                    <span>{character.status}</span>
                  </div>
                </div>

                <div className={styles.image_container}>
                  <div className={styles.degraded} />
                  <img
                    className={styles.image_character}
                    src={character.image}
                    alt={character.name}
                  />
                </div>
              </div>
            </a>
          </Link>
        ))}
        <button
          className={styles.button_loading_more}
          onClick={getMoreCharacters}
        >
          Load more
        </button>
      </section>
    </MainLayout>
  );
}
