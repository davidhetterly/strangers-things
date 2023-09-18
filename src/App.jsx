import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from "./components/Posts";
import Profile from "./components/Profile";
import AuthForm from "./components/AuthForm";
import Home from "./components/Home";
import { UserProvider } from "./contexts/UserContext";
import NewPostForm from "./components/NewPostForm";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import "./App.css"

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<AuthForm isRegistering={false} />} />
          <Route path="/register" element={<AuthForm isRegistering={true} />} />
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="new-post" element={<NewPostForm />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;