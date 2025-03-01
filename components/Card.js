import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Card.module.css";

export default function Card({ pokemon }) {
  return (
    <div className={styles.card}>
      <div className={styles.image_container}>
        <Image 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} 
          width={120} 
          height={120} 
          alt={pokemon.name}
          className={styles.pokemon_image}
          unoptimized
        />
      </div>
      <p className={styles.id}># {pokemon.id}</p>
      <h3 className={styles.name}>{pokemon.name}</h3>
      <Link href={`/pokemon/${pokemon.id}`} className={styles.btn}>
        Detalhes
      </Link>
    </div>
  );
}
