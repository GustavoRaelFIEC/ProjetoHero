import Card from "./components/Card.jsx";
import Login from "./components/Login.jsx";
import Cadastro from "./components/Cadastrar.jsx";
import StatusBadge from "./components/StatusBadge.jsx";
import Formulario from "./components/Formulario.jsx";

import Inicio from "./assets/avatar/arqueira.png";
import Meio from "./assets/avatar/guerreiro.png";
import Final from "./assets/avatar/mage.png";

import { useState, useEffect } from "react";

function App() {
  const [Herois, setHerois] = useState(() => {
    try {
      const heroisSalvos = localStorage.getItem('Herois');
      return heroisSalvos ? JSON.parse(heroisSalvos) : [
        {
          id: 1,
          nome: "Guerreiro",
          classe: "Meio",
          imagem: Meio,
          status: "online",
        },
        {
          id: 2,
          nome: "Arqueiro",
          classe: "Início",
          imagem: Inicio,
          status: "ausente",
        },
        {
          id: 3,
          nome: "Mago",
          classe: "Final",
          imagem: Final,
          status: "offline",
        },
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('Herois', JSON.stringify(Herois));
  }, [Herois]);

  const adicionarHeroi = (novoHeroi) => {
    setHerois(prev => [...prev, novoHeroi]);
  };

  const excluirHero = (id) => {
    setHerois(prev => prev.filter(heroi => heroi.id !== id));
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    fontFamily: "sans-serif",
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Seleção de Corredora</h1>
      </div>
      <div style={{ textAlign: "center" }}>
        <h1>Recrute seu time</h1>
        <div style={containerStyle}>
          {Herois.map((heroi) => (
            <Card key={heroi.id} heroi={heroi} excluirHero={excluirHero} />
          ))}
        </div>
      </div>
      <Formulario onAdicionarHeroi={adicionarHeroi} />
    </>
  );
}

export default App;
