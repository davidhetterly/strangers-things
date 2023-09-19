/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useContext } from "react";
import { fetchUserProfile } from "../API";
import { UserContext } from "../contexts/UserContext";

function Profile() {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserProfile(user.token);
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchData();
  }, [user]);

  if (!userData) {
    return <div>Loading...</div>;
  }
  const authoredPosts = userData.data.posts;
  const receivedMessages = userData.data.messages;

  return (
    <div>
      <h1 className="title">Welcome {userData.data.username}!</h1>

      <section className="container">
        {authoredPosts?.flatMap((post) => post.messages).length > 0 ? (
          <h3 className="title">Messages sent to you sent:</h3>
        ) : (
          <h3 className="title">You haven't recieved any messages</h3>
        )}{" "}
        {authoredPosts?.flatMap((post) =>
          post.messages.map((message) => (
            <div key={message._id}>
              <p>Post: {post.title}</p>
              <p>From: {message.fromUser.username}</p>
              <p>Message: {message.content}</p>
            </div>
          ))
        )}
      </section>

      <section className="container">
        {receivedMessages.length > 0 ? (
          <h3 className="title">Messages you've sent:</h3>
        ) : (
          <h3 className="title">You haven't sent any messages:</h3>
        )}
        {receivedMessages.map((message) => (
          <div key={message._id} className="container-child">
            <p>Post: {message.post.title} </p>
            <p>To: {message.fromUser.username}</p>
            <p>Message: {message.content}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Profile;