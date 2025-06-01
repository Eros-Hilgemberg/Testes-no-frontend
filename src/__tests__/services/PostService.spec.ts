import { fetchPostDetail, fetchPostList } from "../../services/PostService";
import type { PostType } from "../../types/postTypes";

globalThis.fetch = vi.fn();
function createFetchResponse(data: any) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}
describe("PostService", () => {
  test("should do a get list for the url right", async () => {
    const postListReponse: PostType[] = [
      {
        userId: 1,
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      },
      {
        userId: 1,
        id: 2,
        title: "qui est esse",
        body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
      },
      {
        userId: 1,
        id: 3,
        title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
      },
    ];

    fetch.mockResolvedValue(createFetchResponse(postListReponse));

    const postList = await fetchPostList();

    expect(fetch).toBeCalledWith("http://localhost:3000/Posts");
    expect(postList).toStrictEqual(postListReponse);
  });
  test("should do a get detail for the url right", async () => {
    const postDetailReponse: PostType = {
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    };

    fetch.mockResolvedValue(createFetchResponse(postDetailReponse));

    const postDetail = await fetchPostDetail(1);

    expect(fetch).toBeCalledWith("http://localhost:3000/Posts/1");
    expect(postDetail).toStrictEqual(postDetailReponse);
  });
});
