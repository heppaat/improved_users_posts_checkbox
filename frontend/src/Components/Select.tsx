import { useEffect, useState } from "react";
import { Post } from "../types.ts";
import { fetchData } from "../services/Api.tsx";
import NewPost from "../Components/NewPost.tsx";

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
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchData();
      setPosts(data);
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

  const handleSelectPost = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const postId = parseInt(event.target.value, 10);
    setSelectedPost(postId);
  };

  const postToRender =
    selectedPost && posts
      ? posts.find((post) => post.id === selectedPost)
      : null;

  const addNewPost = (newPost: Post) => {
    setPosts((prevPosts) => (prevPosts ? [...prevPosts, newPost] : [newPost]));
    setSelectedUser(newPost.userId);
    setSelectedPost(newPost.id);
  };

  useEffect(() => {
    console.log("Selected Post:", selectedPost); // Debug: Check if this logs the correct ID
  }, [selectedPost]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <section>
        <select
          name="users"
          id="users"
          onChange={handleSelectUser}
          value={selectedUser || ""}
        >
          <option value="">Users</option>
          {uniqueUserIds.map((userId) => (
            <option key={userId} value={userId}>
              User: {userId}
            </option>
          ))}
        </select>
        <select
          name="posts"
          id="posts"
          onChange={handleSelectPost}
          value={selectedPost || ""}
        >
          <option>Posts</option>
          {filteredPosts &&
            filteredPosts.map((post) => (
              <option key={post.id} value={post.id}>
                {post.title}
              </option>
            ))}
          {!filteredPosts && <option value="">No posts available</option>}
        </select>
      </section>
      <section>
        {postToRender && (
          <div>
            <h1>{postToRender.title}</h1>
            <p>{postToRender.body}</p>
          </div>
        )}
      </section>
      <section>
        <NewPost uniqueUsers={uniqueUserIds} addNewPost={addNewPost} />
      </section>
    </>
  );
};

export default Select;
