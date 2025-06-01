import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  function handleSumbmit(event: FormEvent) {
    event.preventDefault();
    navigate("/dashboard");
  }
  return (
    <div className="h-screen w-screen bg-cyan-200 flex justify-center items-center">
      <div className="flex flex-col  bg-white w-1/5 h-auto rounded-2xl p-5">
        <h1 className="font-bold">Cadastre-se</h1>
        <form onSubmit={handleSumbmit} className="flex flex-col gap-5">
          <input
            className="p-2 w-full border-solid border border-gray-400 rounded-xl"
            type="text"
            placeholder="Insira seu nome"
          />
          <input
            className="p-2 w-full border-solid border border-gray-400 rounded-xl"
            type="text"
            placeholder="Insira seu email"
          />
          <input
            className="p-2 w-full border-solid border border-gray-400 rounded-xl"
            type="text"
            placeholder="Insira sua senha"
          />
          <button
            type="submit"
            className="p-2 w-full  border-solid border border-gray-400 bg-blue-900 text-white rounded-xl"
          >
            Sign Up
          </button>
          <Link to="/">Já possui um cadastro? Clique aqui!</Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
