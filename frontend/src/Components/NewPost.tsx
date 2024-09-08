import { useState } from "react";
import { postData } from "../services/Api";
import { Post } from "../types";

const NewPost = (props: {
  uniqueUsers: number[];
  addNewPost: (newPost: Post) => void;
}) => {
  const { uniqueUsers, addNewPost } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedUserForNewPost, setSelectedUserForNewPost] = useState<
    number | null
  >(null);
  const [newPostTitle, setNewPostTitle] = useState<string | null>(null);
  const [newPostBody, setNewPostBody] = useState<string | null>(null);

  const handleChangeUserForNewPost = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const userIdForPost = parseInt(event.target.value, 10);
    setSelectedUserForNewPost(userIdForPost);
  };

  const handleSendNewPost = async () => {
    if (!selectedUserForNewPost || !newPostTitle || !newPostBody) {
      setError("Please fill out all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const newPost = await postData({
        userId: selectedUserForNewPost,
        title: newPostTitle,
        body: newPostBody,
      });

      addNewPost(newPost);
      setError(null);
      setNewPostTitle(null);
      setNewPostBody(null);
    } catch (error) {
      setError((error as Error).message || "Failed to send new post");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <section>
        <select
          name="userForPost"
          id="userForPost"
          value={selectedUserForNewPost || ""}
          onChange={handleChangeUserForNewPost}
        >
          <option value="">Select User For New Post</option>
          {uniqueUsers.map((userId) => (
            <option key={userId} value={userId}>
              User: {userId}
            </option>
          ))}
        </select>
        <div>
          <input
            type="text"
            placeholder="Add title..."
            value={newPostTitle || ""}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Add body..."
            rows={10}
            value={newPostBody || ""}
            onChange={(e) => setNewPostBody(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleSendNewPost}>Send</button>
        </div>
      </section>
    </>
  );
};

export default NewPost;
