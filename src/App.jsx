import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./util/AuthLayout";
import ProfilePage from "./pages/ProfilePage";
import PortfolioPage from "./pages/PortfolioPage";
import { useDispatch } from "react-redux";
import { setUserData } from "./store/slices/userSlice";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import SearchPage from "./pages/SearchPage";
import CommunitiesPage from "./pages/CommunitiesPage";
import CreatePostPage from "./pages/post/creation/AddCreationPostPage";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(setUserData(user));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AuthLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/communities" element={<CommunitiesPage />} />
          <Route path="/add-creation" element={<CreatePostPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
