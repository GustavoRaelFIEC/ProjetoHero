import { useState } from "react";
import StatusBadge from "./StatusBadge";

function Card({ heroi, excluirHero }) {
  const [xp, setXp] = useState(0);
  const [nivel, setNivel] = useState(0);
  const [mostrarMsg, setMostrarMsg] = useState(false);
  const [cor, setCor] = useState("border-gray-300");
  const [selecionado, setSelecionado] = useState(false);

  function mostrarLevelUp() {
    setMostrarMsg(true);

    setTimeout(() => {
      setMostrarMsg(false);
    }, 1000);
  }

  function toogleBorder() {
    if (!selecionado) {
      setSelecionado(true);
      setCor("border-blue-400");
    } else {
      setSelecionado(false);
      setCor("border-gray-300");
    }
  }

  function ganharXp(valor) {
    setXp((prevXp) => {
      let novoXp = prevXp + valor;

      if (novoXp >= 100) {
        setNivel((prevNivel) => prevNivel + 1);
        mostrarLevelUp();
        setCor("border-amber-400");

        setTimeout(() => {
          setCor("border-gray-300");
        }, 150);

        return novoXp - 100;
      }

      return novoXp;
    });
  }

  return (
    <div
      onClick={() => {
        toogleBorder();
      }}
      className={`border-4 ${cor} rounded-xl p-4 m-2.5 shadow-md text-center w-50`}
    >
      <div className="flex justify-center mb-4">
        <StatusBadge tipo={heroi.status} />
      </div>
      {mostrarMsg && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#222",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "context-menu",
          }}
        >
          {heroi.nome} teve um Level Up!
        </div>
      )}
      <div className="cursor-context-menu">Nível: {nivel}</div>
      <img
        src={heroi.imagem}
        alt={heroi.nome}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h2 className="cursor-context-menu">{heroi.nome}</h2>
      <p className="cursor-context-menu">Classe: {heroi.classe}</p>

      <div className="w-full h-2.5 rounded bg-gray-600">
        <div
          className="h-2.5 rounded bg-green-600 transition-all duration-300"
          style={{ width: `${xp}%` }}
        ></div>
      </div>

      <button
        className="cursor-pointer m-2.5 bg-blue-600 text-white py-2 px-4 rounded"
        onClick={(e) => ganharXp(10) & e.stopPropagation()}
      >
        +10 XP
      </button>

      <div className="cursor-context-menu">XP: {xp}/100</div>

      <button
        className="cursor-pointer m-2.5 bg-blue-600 text-white py-2 px-4 rounded"
        onClick={(e) =>
          alert(`Você recrutou ${heroi.nome} para o seu time!`) &
          e.stopPropagation()
        }
      >
        Recrutar!
      </button>

      <button
        className="cursor-pointer m-2.5 bg-blue-600 text-white py-2 px-4 rounded"
        onClick={(e) => excluirHero(heroi.id) & e.stopPropagation()}
      >
        Excluir!
      </button>
    </div>
  );
}

export default Card;
