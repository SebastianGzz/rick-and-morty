/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import IconArrow from "../../components/icons/IconArrow";
import MainLayout from "../../components/layouts/MainLayout";
import Loader from "../../components/Loader";
import styles from "../../styles/Character.module.scss";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const data = await res.json();

  const characterData = {
    name: data.name,
    image: data.image,
    properties: [
      {
        name: "Status",
        value: data.status,
      },
      {
        name: "Gender",
        value: data.gender,
      },
      {
        name: "Species",
        value: data.species,
      },
      {
        name: "Origin",
        value: data.origin.name,
      },
      {
        name: "Location",
        value: data.location.name,
      },
    ],
    url: data.location.url,
  };

  return {
    props: {
      characterData,
    },
  };
}

export default function Character({ characterData }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCharactersOrigin = async () => {
      const res = await fetch(characterData.url);
      const { residents } = await res.json();

      const characters = await Promise.all(
        residents.map(async (resident) => {
          const res = await fetch(resident);
          const { id, name, image } = await res.json();
          return { id, name, image };
        })
      );

      const filteredCharacters = characters.filter(
        (character) => character.name !== characterData.name
      );

      setCharacters(filteredCharacters);
      setLoading(false);
    };

    return getCharactersOrigin();
  }, [characterData.url, characterData.name]);

  return (
    <MainLayout>
      <div className={styles.image_container}>
        <Link href="/">
          <a className={styles.back_button}>
            <IconArrow color="#fafafa" />
          </a>
        </Link>

        <img
          className={styles.image_character}
          src={characterData.image}
          alt={characterData.name}
        />
      </div>

      <div className={styles.wrapper}>
        <h1 className={styles.name_character}>{characterData.name}</h1>

        {characterData.properties.map((property, index) => (
          <p className={styles.property} key={index}>
            <span className={styles.name_property}>{property.name}: </span>
            {property.value}
          </p>
        ))}

        <div className={styles.characters_wrapper}>
          {loading && <Loader />}
          {!loading &&
            characters.map((character, index) => (
              <Link href={`/character/${character.id}`} key={index}>
                <a>
                  <div className={styles.character_wrapper}>
                    <img
                      className={styles.image}
                      src={character.image}
                      alt={character.name}
                    />
                  </div>
                </a>
              </Link>
            ))}
        </div>
      </div>
    </MainLayout>
  );
}
