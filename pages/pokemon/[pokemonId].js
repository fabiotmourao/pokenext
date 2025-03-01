import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../../styles/Pokemon.module.css';

export async function getStaticPaths() {
  return {
    paths: [{ params: { pokemonId: '1' } }],
    fallback: true, // Permite fallback para carregamento dinâmico
  };
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`);
    const data = await res.json();

    return {
      props: {
        pokemon: data,
      },
    };
  } catch (error) {
    return {
      notFound: true, // Exibe erro 404 caso falhe
    };
  }
}

export default function PokemonPage({ pokemon }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className={styles.loading_container}>
        <div className={styles.spinner}></div>
        <p className={styles.loading_text}>Carregando Pokémon...</p>
      </div>
    );
  }

  if (!pokemon) {
    return <p className={styles.error_message}>Erro ao carregar o Pokémon.</p>;
  }

  const primaryType = pokemon.types?.[0]?.type.name || "normal";

  return (
    <div className={styles.page_container}>
      <div className={`${styles.card} ${styles['type_' + primaryType]}`}>
        <h1 className={styles.title}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h1>

        <div className={styles.image_container}>
          <Image 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} 
            width={250} 
            height={250} 
            alt={pokemon.name}
            className={styles.pokemon_image}
            unoptimized
          />
        </div>

        <div className={styles.info_container}>
          <div>
            <h3>Número:</h3>
            <p>{pokemon.id}</p>
          </div>

          <div>
            <h3>Tipos:</h3>
            <div className={styles.types_container}>
              {pokemon.types.map((item) => (
                <span 
                  key={item.type.name} 
                  className={`${styles.type} ${styles['type_' + item.type.name]}`}
                >
                  {item.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.data_container}>
            <div className={styles.data_height}>
              <h4>Altura:</h4>
              <p>{pokemon.height * 10} cm</p>
            </div>

            <div className={styles.data_weight}>
              <h4>Peso:</h4>
              <p>{pokemon.weight / 10} kg</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.stats_container}>
        <h3>Estatísticas:</h3>    
        <div className={styles.stats_grid}>
          {pokemon.stats.map((item) => (
            <div key={item.stat.name} className={styles.progress_bar}>
              <span className={styles.stat_name}>{item.stat.name}</span>
              <span className={styles.stat_value}> {item.base_stat}</span>
              <div className={styles.progress}>
                <div
                  className={styles.progress_fill}
                  style={{
                    width: `${item.base_stat}%`,
                    backgroundColor: item.base_stat > 80 
                      ? '#4caf50' 
                      : item.base_stat > 50 
                        ? '#ff9800' 
                        : '#f44336'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
