/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import IconSearch from "../components/icons/IconSearch";
import MainLayout from "../components/layouts/MainLayout";
import Loader from "../components/Loader";
import styles from "../styles/Home.module.scss";
import logoRickandMorty from "../public/logo.png";

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
  const [filtedCharacters, setFiltedCharacters] = useState(data);
  const [nextUrl, setNextUrl] = useState(nextPage);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreElement = useRef(null);

  const getMoreCharacters = async () => {
    setIsLoading(true);
    const res = await fetch(nextUrl);
    const newData = await res.json();

    setCharacters([...characters, ...newData.results]);
    setNextUrl(newData.info.next);
    setIsLoading(false);
  };

  useEffect(() => {
    const options = { rootMargin: "300px" };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) getMoreCharacters();
    }, options);

    observer.observe(loadMoreElement.current);

    return () => observer.disconnect();
  });

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
      </section>

      <div ref={loadMoreElement}></div>

      {isLoading && (
        <div className={styles.loader_wrapper}>
          <Loader />
        </div>
      )}
    </MainLayout>
  );
}
