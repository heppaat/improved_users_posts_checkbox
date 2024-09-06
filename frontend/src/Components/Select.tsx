import { useEffect, useState } from "react";
import { Post } from "../types.ts";
import { fetchData } from "../services/Api.tsx";

const getUniqueUserIds = (arr: Post[]) =>
  arr.reduce<number[]>((acc, curr) => {
    if (!acc.includes(curr.userId)) {
      acc.push(curr.userId);
    }
    return acc;
  }, []);

const Select = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>();

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchData();
      setPosts(data);
      console.log(data);
    } catch (error) {
      setError((error as Error).message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const uniqueUserIds = posts ? getUniqueUserIds(posts) : [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <select name="" id="">
        <option value="">Users</option>
        {uniqueUserIds.map((userId) => (
          <option key={userId} value={userId}>
            User: {userId}
          </option>
        ))}
      </select>
      <select name="" id="">
        <option value="">Posts</option>
      </select>
    </div>
  );
};

export default Select;
