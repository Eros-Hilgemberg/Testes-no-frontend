import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  function handleSumbmit(event: FormEvent) {
    event.preventDefault();
    navigate("/dashboard");
  }
  return (
    <div className="h-screen w-screen bg-cyan-200 flex justify-center items-center">
      <div className="flex flex-col  bg-white w-1/5 h-1/3 rounded-2xl p-5">
        <h2 className="font-bold">Login</h2>
        <form onSubmit={handleSumbmit} className="flex flex-col gap-5">
          <input
            className="p-2 w-full border-solid border border-gray-400 rounded-xl"
            type="text"
            placeholder="insira seu email"
          />
          <input
            className="p-2  w-full  border-solid border border-gray-400 rounded-xl"
            type="text"
            placeholder="insira sua senha"
          />
          <button className="p-2 w-full  border-solid border border-gray-400 bg-blue-900 text-white rounded-xl">
            Acessar
          </button>
          <Link to="/sign-up">Não possui um cadastro? Clique aqui!</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
