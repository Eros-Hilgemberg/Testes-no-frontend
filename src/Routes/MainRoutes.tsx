import { Route, Routes } from "react-router-dom";
import CardPost from "../components/CardPost";
import DashBoard from "../pages/DashBoard";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { fetchPostDetail, fetchPostList } from "../services/PostService";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route
        path="/dashboard"
        element={<DashBoard fetcPostList={fetchPostList} />}
      ></Route>
      <Route
        path="/postdetail/:id"
        element={<CardPost fetcPostDetail={fetchPostDetail} />}
      ></Route>
      <Route path="*" element={<h1>404 page not found</h1>} />
    </Routes>
  );
}

export default MainRoutes;
