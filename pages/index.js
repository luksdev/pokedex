import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Color from 'color-thief-react'
import Loader from '../src/components/loader';
import pokemonName from "pokemon"
import Head from 'next/head';

export default function Home() {
  const [defaultPokemon] = useState("snorlax")
  const [searchPokemon, setSearchPokemon] = useState("");
  const [chinesePokemon, setChinesePokemon] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const IMAGE_URI = pokemon.sprites?.other["official-artwork"].front_default;

  const getPokemon = (name) => {
    setLoading(true)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(({ data }) => {
        setPokemon(data)
        setLoading(false)
        setChinesePokemon(pokemonName.getName(data.id || 143, "ja"))
      })
      .catch(() => {
        alert(`Pokemon ${searchPokemon.toLocaleUpperCase()} não encontrado.\n\nRedirecionando para: ${defaultPokemon}`)
        getPokemon(defaultPokemon)
      })
      .finally(() => {
        setSearchPokemon("")
      })
  }

  const handleSearchPokemon = () => {
    getPokemon(searchPokemon.toLowerCase())
  }

  useEffect(() => {
    getPokemon(defaultPokemon)
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <Color src={IMAGE_URI} crossOrigin="anonymous" format="hex">
      {({ data, loading }) => {
        if (loading) return <Loader />

        return (
          <div className={styles.container} style={{ backgroundColor: data }}>
            <Head>
              <title>Pokedex</title>
              <meta name="description" content="Pokedex" />
              <link rel="icon" href="favicon.ico" />
            </Head>
            <div className={styles.header}>
              <span className={styles.identify} style={{ paddingLeft: "5rem" }}>#{pokemon.id}</span>
              <span className={styles.title} style={{ paddingLeft: "5rem" }}>{pokemon.name}</span>
            </div>
            <div className={styles.main}>
              <div className={styles.leftSide}>
                <div className={styles.infoLeftSide}>
                  <span className={styles.chineseText}>
                    {chinesePokemon}
                  </span>
                  <span className={styles.fontInfo}>Height: {pokemon.height}m</span>
                  <span className={styles.fontInfo}>Weight: {pokemon.weight}kg</span>
                </div>
                <div>
                  <Image src={IMAGE_URI} width={500} height={500} />
                </div>
              </div>

              <div className={styles.rightSide}>
                <span className={styles.title}>Base Stats</span>

                <div className={styles.infoPokemon}>
                  {pokemon.stats.map((status, index) => (
                    <div className={styles.cardInfo} key={index}>
                      {status.stat.name.toUpperCase()}: {status.base_stat}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input className={styles.inputStyle} required value={searchPokemon} onChange={(e) => setSearchPokemon(e.target.value)} placeholder="Gengar" />
              <input className={styles.inputStyle} style={{ cursor: 'pointer' }} type={"submit"} onClick={() => { if (searchPokemon) handleSearchPokemon() }} value={"GO!"} />
            </form>
          </div>
        )
      }}
    </Color>
  )
}
