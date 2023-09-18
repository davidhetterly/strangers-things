import { useState, useEffect } from "react";
import { fetchPosts } from "../API";
import Post from "./Post";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const data = await fetchPosts();
      console.log(data);
      setPosts(data.data.posts);
    }
    getPosts();
  }, []);

  return (
    <>
      <h1>Posts</h1>
      <div className="posts-container">
        {posts.map((post) => {
          return <Post key={post._id} {...post}  />;
        })}
      </div>
    </>
  );
}