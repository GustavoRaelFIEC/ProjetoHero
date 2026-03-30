import Card from "./components/Card.jsx";
import Login from "./components/Login.jsx";
import Cadastro from "./components/Cadastrar.jsx";
import StatusBadge from "./components/StatusBadge.jsx";
import Formulario from "./components/Formulario.jsx";

import Inicio from "./assets/avatar/arqueira.png";
import Meio from "./assets/avatar/guerreiro.png";
import Final from "./assets/avatar/mage.png";

function App() {
  const listaHerois = [
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
          {listaHerois.map((heroi) => (
            <Card key={heroi.id} heroi={heroi} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
