export default function Post({
    _id: id,
    author,
    description,
    isAuthor,
    location,
    message,
    price,
    title,
    willDeliver,
    active,
  }) {
    return (
      <section key={id} className={`post ${active ? "active" : ""}`}>
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
  
        {isAuthor && <p>This is your post!</p>}
  
        {/* If there's a message for the post, show it */}
        {message && (
          <>
            <h3>Message:</h3>
            <p>{message}</p>
          </>
        )}
        {!active && <p>This post has been deleted.</p>}
      </section>
    );
  }