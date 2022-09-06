import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Color from 'color-thief-react'
import Loader from '../src/components/loader';

export default function Home() {
  const [searchPokemon, setSearchPokemon] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const IMAGE_URI = pokemon.sprites?.other["official-artwork"].front_default

  const getPokemon = (name) => {
    setLoading(true)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(({data}) => {
        setPokemon(data)
        setLoading(false)
      })
      .catch(() => {
        alert("Pokemon não encontrado.")
      })
  }

  const handleSearchPokemon = () => {
    getPokemon(searchPokemon.toLowerCase())
  }

  useEffect(() => {
    getPokemon("mewtwo")
  }, [])

  if (loading) {
    return <Loader/>
  }

  return (
    <Color src={IMAGE_URI} crossOrigin="anonymous" format="hex">
      {({ data, loading }) => {
        if (loading) return <Loader/>

        return (
          <div className={styles.container} style={{ backgroundColor: data }}>
            <div className={styles.header}>
              <span className={styles.title} style={{ padding: "5rem" }}>{pokemon.name}</span>
            </div>
            <div className={styles.main}>
              <div className={styles.leftSide}>
                <div className={styles.infoLeftSide}>
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
              <input required value={searchPokemon} onChange={(e) => setSearchPokemon(e.target.value)} placeholder="Gengar"/>
              <input type={"submit"} onClick={() => {if (searchPokemon) handleSearchPokemon()}} value={"Pesquisar"} />
            </form>
          </div>
        )
      }}
    </Color>
  )
}
