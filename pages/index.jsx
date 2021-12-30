import { useEffect, useState, useRef } from "react";
import MainLayout from "../components/layouts/MainLayout";
import Loader from "../components/Loader";
import CharacterCard from "../components/home-page/CharacterCard";
import styles from "../styles/home-page/Home.module.scss";
import Header from "../components/home-page/Header";

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

  const getValueSearchInput = (currentText) => setSearch(currentText);

  const getMoreCharacters = async () => {
    if (!nextUrl) return setIsLoading(false);

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
      <Header InputEvent={getValueSearchInput} />

      <section className={styles.characters_wrapper}>
        {filtedCharacters.map((character, i) => (
          <CharacterCard key={i} id={character.id} {...character} />
        ))}
      </section>

      <div ref={loadMoreElement} />

      {isLoading && (
        <div className={styles.loader_wrapper}>
          <Loader />
        </div>
      )}
    </MainLayout>
  );
}
