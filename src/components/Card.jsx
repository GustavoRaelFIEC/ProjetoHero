import { useState } from "react";
import StatusBadge from "./StatusBadge";

function Card({ heroi }) {
  const [xp, setXp] = useState(0);
  const [nivel, setNivel] = useState(0);
  const [mostrarMsg, setMostrarMsg] = useState(false);

  function mostrarLevelUp() {
    setMostrarMsg(true);

    setTimeout(() => {
      setMostrarMsg(false);
    }, 1000);
  }

  let cor = "border-gray-300";

  if (xp === 100) {
    cor = "border-amber-400";

    setTimeout(() => {
      setNivel(nivel + 1);
      mostrarLevelUp();
      setXp(0);
    }, 100);
  }

  return (
    <div
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
          }}
        >
          {heroi.nome} teve um Level Up!
        </div>
      )}
      <div>Nível: {nivel}</div>
      <img
        src={heroi.imagem}
        alt={heroi.nome}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h2>{heroi.nome}</h2>
      <p>Classe: {heroi.classe}</p>

      <div className="w-full h-2.5 rounded bg-gray-600">
        <div
          className="h-2.5 rounded bg-green-600 transition-all duration-300"
          style={{ width: `${xp}%` }}
        ></div>
      </div>

      <button
        className="m-2.5 bg-blue-600 text-white py-2 px-4 rounded"
        onClick={() => setXp(xp + 10)}
      >
        +10 XP
      </button>

      <div>XP: {xp}/100</div>

      <button
        className="m-2.5 bg-blue-600 text-white py-2 px-4 rounded"
        onClick={() => alert(`Você recrutou ${heroi.nome} para o seu time!`)}
      >
        Recrutar!
      </button>

      <button
        className="m-2.5 bg-blue-600 text-white py-2 px-4 rounded"
        onClick={() => console.log("ola") 
        }
      >
        Excluir!
      </button>
    </div>
  );
}

export default Card;
