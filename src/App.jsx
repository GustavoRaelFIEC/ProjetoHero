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
      const heroisSalvos = localStorage.getItem("Herois");
      return heroisSalvos
        ? JSON.parse(heroisSalvos)
        : [
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

  const [lista, setLista] = useState(Herois);

  //Funções de cada personagem
  function filtrarInicio() {
    const inicio = Herois.filter((heroi) => heroi.classe === "Início");
    setLista(inicio);
  }

  function filtrarMeio() {
    const meio = Herois.filter((heroi) => heroi.classe === "Meio");
    setLista(meio);
  }

  function filtrarFinal() {
    const final = Herois.filter((heroi) => heroi.classe === "Final");
    setLista(final);
  }

  function mostrarTodos() {
    setLista(Herois);
  }

  useEffect(() => {
    localStorage.setItem("Herois", JSON.stringify(Herois));
    setLista(Herois);
    document.title = "Heróis Recrutados: " + Herois.length;
  }, [Herois]);

  const adicionarHeroi = (novoHeroi) => {
    setHerois((prev) => [...prev, novoHeroi]);
  };

  const excluirHero = (id) => {
    setHerois((prev) => prev.filter((heroi) => heroi.id !== id));
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontFamily: "sans-serif",
    gap: "12px",
    marginBottom: "20px"
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Seleção de Corredora</h1>
      </div>
      <div style={{ textAlign: "center" }}>
        <h1>Recrute seu time</h1>
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "center", textAlign: "center", gap: "12px" , marginBottom: "20px" }}>
            <button onClick={mostrarTodos}>Todos</button>
            <button onClick={filtrarInicio}>Início</button>
            <button onClick={filtrarMeio}>Meio</button>
            <button onClick={filtrarFinal}>Final</button>
          </div>
          <div className={`flex justify-center`}>
            {lista.map((heroi) => (
              <Card key={heroi.id} heroi={heroi} excluirHero={excluirHero} />
            ))}
          </div>
        </div>
      </div>
      <Formulario onAdicionarHeroi={adicionarHeroi} />
    </>
  );
}

export default App;
