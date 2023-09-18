import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import MessageForm from "./MessageForm";

function Post({
  _id: id,
  author,
  description,
  location,
  messages,
  price,
  title,
  willDeliver,
  active,
  handleDelete,
}) {
  const { user } = useContext(UserContext);
  const [showMessages, setShowMessages] = useState(false);

  const canSendMessage = user && user.username !== author.username;
  const isAuthor = user && user.username === author.username;

  return (
    <section key={id} className={`container ${active ? "active" : ""}`}>
      <h2>{title}</h2>
      <p>
        <strong>Author:</strong> {author.username}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
      <p>
        <strong>Location:</strong> {location}
      </p>
      <p>
        <strong>Price:</strong> ${price}
      </p>
      <p>
        <strong>Will Deliver:</strong> {willDeliver ? "Yes" : "No"}
      </p>

      {isAuthor && (
        <>
          <p>This is a post you made.</p>
          <button className="danger-button"onClick={() => handleDelete(id)}>Delete Post</button>
          {messages && messages.length > 0 ? (
            <>
              <button onClick={() => setShowMessages(!showMessages)}>
                {showMessages ? "Hide Messages" : "Show Messages"}
              </button>
              {showMessages &&
                messages.map((message) => (
                  <div key={message._id}>
                    <p>From: {message.fromUser.username}</p>
                    <p>Message: {message.content}</p>
                  </div>
                ))}
            </>
          ) : (
            <p>No messages 😔</p>
          )}
        </>
      )}

      {canSendMessage && <MessageForm postId={id} loggedInUser={user} />}

      {!active && <p>This post has been deleted.</p>}
    </section>
  );
}

export default Post;