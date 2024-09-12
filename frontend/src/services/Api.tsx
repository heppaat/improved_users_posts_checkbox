import { Post, CreatedPost } from "../types.ts";

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

export const postData = async (data: CreatedPost): Promise<Post> => {
  try {
    const response = await fetch("http://localhost:4002/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }
    const newPost = await response.json();
    return newPost as Post;
  } catch (error) {
    console.error("Failed to send data", error);
    throw error;
  }
};
