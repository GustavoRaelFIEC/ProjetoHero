import { useState } from "react";
import StatusBadge from "./StatusBadge";

function Card({ heroi, excluirHero }) {
  const [xp, setXp] = useState(0);
  const [nivel, setNivel] = useState(0);
  const [mostrarMsg, setMostrarMsg] = useState(false);
  const [cor, setCor] = useState("border-gray-300");

  function mostrarLevelUp() {
    setMostrarMsg(true);

    setTimeout(() => {
      setMostrarMsg(false);
    }, 1000);
  }

  function ganharXp(valor) {
    setXp((prevXp) => {
      let novoXp = prevXp + valor;
      let niveisSubidos = 0;
      let xpRestante = novoXp;

      // Calcula quantos levels vai subir e XP restante
      while (xpRestante >= 100) {
        xpRestante -= 100;
        niveisSubidos++;
      }

      if (niveisSubidos > 0) {
        // 1º: Anima até 100 (efeito visual)
        setCor("border-amber-400");

        setTimeout(() => {
          // 2º: Atualiza nível e reseta XP
          setNivel(nivel + niveisSubidos);
          mostrarLevelUp(niveisSubidos);

          setCor("border-gray-300");
          setXp(xpRestante); // XP restante (0-99)
        }, 150);

        // Durante a animação, mostra 100 na barra
        return 100;
      }

      return novoXp;
    });
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
          className="h-2.5 rounded bg-green-600 transition-all duration-100"
          style={{ width: `${xp}%` }}
        ></div>
      </div>

      <button
        className="cursor-pointer m-2.5 bg-blue-600 text-white py-2 px-4 rounded"
        onClick={() => ganharXp(10)}
      >
        +10 XP
      </button>

      <div>XP: {xp}/100</div>

      <button
        className="cursor-pointer m-2.5 bg-blue-600 text-white py-2 px-4 rounded"
        onClick={() => alert(`Você recrutou ${heroi.nome} para o seu time!`)}
      >
        Recrutar!
      </button>

      <button
        className="cursor-pointer m-2.5 bg-blue-600 text-white py-2 px-4 rounded"
        onClick={() => excluirHero(heroi.id)}
      >
        Excluir!
      </button>
    </div>
  );
}

export default Card;
