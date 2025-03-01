import Image from "next/image";
import styles from "../styles/About.module.css";

export default function About() {
  return (
    <div className={styles.about_container}>
      <div className={styles.about}>
        <h1>Sobre a <span>PokeNext</span></h1>
        <p>
          PokeNext é um projeto que permite explorar o mundo dos Pokémon de forma
          interativa! Aqui você pode visualizar os detalhes de diversos Pokémon, 
          incluindo seus tipos, habilidades e estatísticas. Criado para fãs de todas
          as idades, nosso objetivo é proporcionar uma experiência envolvente e educativa.
        </p>
        <Image 
          src="/images/charizard.png" 
          width="300" 
          height="300" 
          alt="Charizard"
          className={styles.about_image}
        />
      </div>
    </div>
  );
}
