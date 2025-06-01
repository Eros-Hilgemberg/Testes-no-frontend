import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { PostType } from "../types/postTypes";

interface propsCard {
  fetcPostDetail: (id: number) => Promise<PostType>;
}

function CardPost({ fetcPostDetail }: propsCard) {
  const [error, setError] = useState("");
  const params = useParams();
  const [post, setPost] = useState<PostType>({
    userId: 0,
    id: 0,
    title: "",
    body: "",
  });
  useEffect(() => {
    (async () => {
      setError("");
      if (!params.id || params.id === "0") {
        setError("O id não é válido");
        return;
      }
      const data = await fetcPostDetail(parseInt(params.id));
      setPost(data);
    })();
  }, []);

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="border border-gray-400  rounded-3xl p-3 gap-5 flex flex-col w-1/3 h-auto">
        <h2 className="font-bold">Operador: {post.userId}</h2>
        <h3 className="font-bold">Assunto: {post.title}</h3>
        <div className="border border-gray-400 flex-auto rounded-3xl p-3">
          <p>{post.body}</p>
        </div>
        <Link
          className="bg-blue-500 p-2 rounded-xl font-bold text-center text-white"
          to={"/dashboard"}
        >
          Voltar
        </Link>
        {error && <strong>{error}</strong>}
      </div>
    </div>
  );
}

export default CardPost;
