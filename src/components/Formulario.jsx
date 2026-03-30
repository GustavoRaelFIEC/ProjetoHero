import { useState } from "react";

function Formulario() {
  const [nome, setNome] = useState("");
  const [classe, setClasse] = useState("");

  function handleSubmit(e) {
    e.prevenDefault();
    console.log(`Nome: ${nome} | Classe: ${classe}`);

    setClasse("");
    setNome("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-5"
      >
        <legend className="text-2xl font-bold text-gray-800 text-center mb-4">
          Formulário
        </legend>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Nome</label>
          <input
            onChange={(e) => setNome(e.target.value)}
            value={nome}
            type="text"
            placeholder="Nome do seu personagem"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Classe</label>
          <input
            onChange={(e) => setClasse(e.target.value)}
            value={classe}
            type="text"
            placeholder="Classe do seu personagem"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <button
          type="submit"
          className=" cursor-pointer w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Enviar
        </button>

        <h2 className="text-lg font-semibold text-gray-800 text-center pt-4">
          - Digitado em Tempo Real -
        </h2>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-gray-700">
            <span className="font-semibold">Nome:</span> {nome}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Classe:</span> {classe}
          </p>
        </div>
      </form>
    </div>
  );
}

export default Formulario;
