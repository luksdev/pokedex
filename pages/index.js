import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [searchPokemon, setSearchPokemon] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPokemon = (name) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/aurorus`)
      .then((res) => {
        setPokemon(res.data)
        setLoading(false)
      })
      .catch(() => {
        alert("Pokemon não encontrado.")
        setLoading(true)
      })
  }

  const handleSearchPokemon = () => {
    getPokemon(searchPokemon)
  }

  useEffect(() => {
    getPokemon()
   }, [])

  if(loading){
    return(
      <div style={{height: "100vh", margin: "0 auto"}}>
        Carregando...
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title} style={{padding: "5rem"}}>{pokemon.name}</span>
      </div>
      <div className={styles.main}>
        <div className={styles.leftSide}>
          <div className={styles.infoLeftSide}>
            <span className={styles.fontInfo}>Height: {pokemon.height}m</span>
            <span className={styles.fontInfo}>Weight: {pokemon.weight}kg</span>
          </div>
          <div>
            <Image src={pokemon.sprites?.other["official-artwork"].front_default} width={500} height={500}/>
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

      {/* <input value={searchPokemon} onChange={(e) => setSearchPokemon(e.target.value)} />
      <button onClick={() => handleSearchPokemon()}>Pesquisar</button> */}

      {/* {
        loading
          ?
          <>
            <p>Aguardando pesquisa...</p>
          </>
          :
          <>
            <p>#{pokemon.id}</p>
            <p>{pokemon.name}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}kg</p>

            <Image src={pokemon.sprites.other["official-artwork"].front_default} width={1000} height={1000}/>
          </>
      } */}
      <p></p>
    </div>
  )
}
