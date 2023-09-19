/* eslint-disable react/prop-types */

import { useState } from "react";
import { postMessage } from "../API";

function MessageForm({ postId, loggedInUser }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await postMessage(postId, message, loggedInUser); 
      setMessage(""); 
      alert("Message successfully sent!");

    } catch (error) {
      console.error("Error sending the message:", error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Send a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageForm;