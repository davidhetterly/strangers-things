export const logIn = (userData, setUser) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  }
  
  export const logOut = (setUser) => {
    setUser(null);
    sessionStorage.removeItem("user");
  };
  
  export const isLoggedIn = (user) => {
    return user !== null;
  };
  
  export const makeHeaders = (user) => {
    let headers = {
      "Content-Type": "application/json",
    };
    if (user && user.token) {
      headers["Authorization"] = `Bearer ${user.token}`;
    }
    return headers;
  };