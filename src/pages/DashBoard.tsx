import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemPost from "../components/itemPost";
import type { PostType } from "../types/postTypes";

interface Iprops {
  fetcPostList: () => Promise<PostType[]>;
}
function DashBoard({ fetcPostList }: Iprops) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const navigate = useNavigate();

  function handleNavigate(id: number) {
    navigate(`/postdetail/${id}`);
  }
  useEffect(() => {
    (async () => {
      const data = await fetcPostList();
      setPosts(data);
    })();
  }, []);
  return (
    <div className="h-screen w-screen justify-center bg-white flex">
      <div className="flex flex-col  bg-white w-full h-full rounded-2xl p-5">
        <h2 className="font-bold text-3xl">DashBoard</h2>
        <ul className="w-full flex gap-5 flex-wrap">
          {posts.map((post) => (
            <li
              data-testid={post.id}
              onClick={() => handleNavigate(post.id)}
              className="flex flex-col w-auto"
            >
              <ItemPost
                key={post.id}
                userId={post.userId}
                title={post.title}
                className="bg-gray-500 hover:bg-gray-700 text-white flex  rounded-3xl p-3"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashBoard;
