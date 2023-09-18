import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { fetchPosts, deletePost } from "../API";
import Post from "./Post";

function Posts() {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPosts(user);
      setPosts(data);
    };

    fetchData();
  }, [user]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }
    try {
      await deletePost(postId, user.token);
      setPosts((posts) => posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post!");
    }
  };

  function postMatches(post, text) {
    const lowercasedText = text.toLowerCase();

    return (
      post.title.toLowerCase().includes(lowercasedText) ||
      post.description.toLowerCase().includes(lowercasedText) ||
      post.author.username.toLowerCase().includes(lowercasedText)
    );
  }

  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;
  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="title">Posts</h1>

      <div className="container">
        <input
          type="text"
          placeholder="Search posts"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchBar"
        />
        {postsToDisplay.map((post) => (
          <div key={(post._id)}>
            {postsToDisplay.length === 0 && <p>No posts match your search.</p>}

            <Post key={post._id} {...post} handleDelete={handleDelete} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Posts;