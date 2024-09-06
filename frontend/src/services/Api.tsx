import { Post } from "../types.ts";

export const fetchData = async (): Promise<Post[]> => {
  try {
    const response = await fetch("http://localhost:4002/posts");

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const data = await response.json();
    return data as Post[];
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw error;
  }
};
