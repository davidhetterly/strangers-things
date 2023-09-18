import { makeHeaders } from "../utils/util";

const COHORT_NAME = "2302-ACC-PT-WEB-PT-C";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const handleResponse = async (response) => {
  if (!response.ok) {
    const responseBody = await response.json();
    console.error("Server responded with:", responseBody);
    const { error } = responseBody;
    if (error && error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Server error");
    }
  }
  return response.json();
};

export const fetchPosts = async (user) => {
  try {
    const headers = makeHeaders(user);
    const response = await fetch(`${BASE_URL}/posts`, { headers });
    const data = await handleResponse(response);
    return data.data.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: makeHeaders(),
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: makeHeaders(),
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const createPost = async (postData, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post: postData }),
    });
    const data = await handleResponse(response);
    return data.data.post;
  } catch (error) {
    console.error("Error creating post:", error.message);
    throw error;
  }
};

export const deletePost = async (postId, token) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(
      result.error ? result.error.message : "Failed to delete post"
    );
  }

  return response.json();
};

export const postMessage = async (postId, content, user) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
      method: "POST",
      headers: makeHeaders(user),
      body: JSON.stringify({
        message: {
          content: content,
        },
      }),
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error sending the message:", error);
    throw error;
  }
};

export const fetchUserProfile = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
  const data = await response.json();
  return data;
};