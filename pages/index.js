import { useState } from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Card from '../components/Card';

export async function getStaticProps() {
  const maxPokemons = 251;
  const api = 'https://pokeapi.co/api/v2/pokemon/';
  
  const res = await fetch(`${api}/?limit=${maxPokemons}`);  
  const data = await res.json();

  // Adicionando índice aos Pokémon
  data.results.forEach((item, index) => {
    item.id = index + 1;
  });

  return {
    props: {
      pokemons: data.results
    }
  };
}

export default function Home({ pokemons }) {
  const pokemonsPerPage = 9; // Quantidade de Pokémon por página
  const [currentPage, setCurrentPage] = useState(1);

  // Calculando Pokémon da página atual
  const startIndex = (currentPage - 1) * pokemonsPerPage;
  const selectedPokemons = pokemons.slice(startIndex, startIndex + pokemonsPerPage);

  // Controle de páginas
  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Poke<span>Next</span></h1>
        <Image 
          src="/images/pokeball.png" 
          width="50" 
          height="50" 
          alt="PokeNext"
        />
      </div>

      <div className={styles.pokemon_container}>
        {selectedPokemons.map(pokemon => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {/* Controles de Paginação */}
      <div className={styles.pagination}>
        <button 
          onClick={handlePrevPage} 
          disabled={currentPage === 1} 
          className={styles.page_button}
        >
          ◀ Anterior
        </button>
        <span className={styles.page_info}>
          Página {currentPage} de {totalPages}
        </span>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages} 
          className={styles.page_button}
        >
          Próximo ▶
        </button>
      </div>
    </>
  );
}
