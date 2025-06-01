import type { PostType } from "../types/postTypes";

const baseUrl = "http://localhost:3000";

export async function fetchPostList(): Promise<PostType[]> {
  const response = await fetch(`${baseUrl}/Posts`);
  return await response.json();
}
export async function fetchPostDetail(id: number): Promise<PostType> {
  const response = await fetch(`${baseUrl}/Posts/${id}`);
  return await response.json();
}
