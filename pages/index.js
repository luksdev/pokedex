import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Color from 'color-thief-react'

export default function Home() {
  const [searchPokemon, setSearchPokemon] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const IMAGE_URI = pokemon.sprites?.other["official-artwork"].front_default

  const getPokemon = (name) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        setPokemon(res.data)
        setLoading(false)
      })
      .catch(() => {
        alert("Pokemon não encontrado.")
      })
  }

  const handleSearchPokemon = () => {
    getPokemon(searchPokemon)
  }

  useEffect(() => {
    getPokemon("mewtwo")
  }, [])

  if (loading) {
    return (
      <div style={{ height: "100vh", margin: "0 auto" }}>
        Carregando...
      </div>
    )
  }

  return (
    <Color src={IMAGE_URI} crossOrigin="anonymous" format="hex">
      {({ data, loading }) => {
        if (loading) return <>Loading...</>

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
                  <Image src={pokemon.sprites?.other["official-artwork"].front_default} width={500} height={500} />
                </div>
              </div>

              <div className={styles.rightSide}>
                <span className={styles.title}>Base Stats</span>

                <div className={styles.infoPokemon}>
                  <div className={styles.cardInfo}>
                    HP: {pokemon.stats[0].base_stat}
                  </div>
                  <div className={styles.cardInfo}>
                    ATTACK: {pokemon.stats[1].base_stat}
                  </div>
                  <div className={styles.cardInfo}>
                    DEFENSE: {pokemon.stats[2].base_stat}
                  </div>
                  <div className={styles.cardInfo}>
                    SP. ATTACK: {pokemon.stats[3].base_stat}
                  </div>
                  <div className={styles.cardInfo}>
                    SP. DEFENSE: {pokemon.stats[4].base_stat}
                  </div>
                  <div className={styles.cardInfo}>
                    SPEED: {pokemon.stats[5].base_stat}
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input required value={searchPokemon} onChange={(e) => setSearchPokemon(e.target.value)} />
              <input type={"submit"} onClick={() => {
                if (searchPokemon) handleSearchPokemon()
              }} value={"Pesquisar"} />
            </form>
          </div>
        )
      }}
    </Color>
  )
}
