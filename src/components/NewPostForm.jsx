import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { createPost } from "../API";
import { useNavigate } from "react-router-dom";

function NewPostForm() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    willDeliver: false,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let postData = { ...formData };
    if (postData.location === "") {
      delete postData.location;
    }

    if (!user) {
      alert("You must be logged in to create a post.");
      navigate("/login");
      return;
    }

    try {
      await createPost(postData, user.token);
      alert("Post created successfully!");
      navigate("/posts")
    } catch (error) {
      console.error("Error creating post:", error);

      if (error && error.message) {
        alert(`Error creating post: ${error.message}`);
      } else {
        alert("Error creating post.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Title"
        required
      />
      <textarea
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Description"
        required
      />
      <input
        type="text"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        placeholder="Price"
        required
      />
      <input
        type="text"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        placeholder="Location (Optional)"
      />
      <label>
        Will Deliver:
        <input
          type="checkbox"
          checked={formData.willDeliver}
          onChange={(e) =>
            setFormData({ ...formData, willDeliver: e.target.checked })
          }
        />
      </label>
      <button type="submit">Create Post</button>
    </form>
  );
}

export default NewPostForm;