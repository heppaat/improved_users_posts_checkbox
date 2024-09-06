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
  const [error, setError] = useState<string | null>(null);

  const [selectedUser, setSelectedUser] = useState<number | null>(null);

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

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(event.target.value, 10);
    setSelectedUser(userId);
  };

  const filteredPosts =
    selectedUser && posts
      ? posts.filter((post) => post.userId === selectedUser)
      : posts;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <select name="" id="" onChange={handleSelectUser}>
        <option value="">Users</option>
        {uniqueUserIds.map((userId) => (
          <option key={userId} value={userId}>
            User: {userId}
          </option>
        ))}
      </select>
      <select name="" id="">
        <option value="">Posts</option>
        {filteredPosts &&
          filteredPosts.map((post) => (
            <option key={post.id} value={post.id}>
              {post.title}
            </option>
          ))}
        {!filteredPosts && <option value="">No posts available</option>}
      </select>
    </div>
  );
};

export default Select;
