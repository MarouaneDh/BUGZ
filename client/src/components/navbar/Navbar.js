import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../JS/actions/authActions";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const user = useSelector((state) => state.authReducer.user);
  return (
    <nav className="navbar navbar-dark bg-dark">
      {isAuth ? (
        user.role === "admin" ? (
          <ul>
            <Link to={{ pathname: "/" }}>
              <li>Home</li>
            </Link>
            <Link to={{ pathname: "/profile" }}>
              <li>Profile</li>
            </Link>
            <Link to={{ pathname: "/chat" }}>
              <li>Chat</li>
            </Link>
            <Link to={{ pathname: "/bugList/page/1" }}>
              <li>Bug list</li>
            </Link>
            <Link to={{ pathname: "/completedBugPosts" }}>
              <li>Completed bug posts</li>
            </Link>

            <li
              onClick={() => {
                dispatch(logout());
                history.push("/");
              }}
            >
              Logout
            </li>
          </ul>
        ) : user.role === "Bug fixer" ? (
          <ul>
            <Link to={{ pathname: "/" }}>
              <li>Home</li>
            </Link>
            <Link to={{ pathname: "/profile" }}>
              <li>Profile</li>
            </Link>
            <Link to={{ pathname: "/chat" }}>
              <li>Chat</li>
            </Link>
            <Link to={{ pathname: "/bugList/page/1" }}>
              <li>Bug list</li>
            </Link>
            <Link to={{ pathname: "/completedBugPosts" }}>
              <li>Completed bug posts</li>
            </Link>
            <li
              onClick={() => {
                dispatch(logout());
                history.push("/");
              }}
            >
              Logout
            </li>
          </ul>
        ) : (
          <ul>
            <Link to={{ pathname: "/" }}>
              <li>Home</li>
            </Link>
            <Link to={{ pathname: "/profile" }}>
              <li>Profile</li>
            </Link>
            <Link to={{ pathname: "/bugList/page/1" }}>
              <li>Bug list</li>
            </Link>
            <Link to={{ pathname: "/completedBugPosts" }}>
              <li>Completed bug posts</li>
            </Link>
            <li
              onClick={() => {
                dispatch(logout());
                history.push("/");
              }}
            >
              Logout
            </li>
          </ul>
        )
      ) : (
        <ul>
          <Link to={{ pathname: "/" }}>
            <li>Home</li>
          </Link>
          <Link to={{ pathname: "/bugList" }}>
            <li>Bug list</li>
          </Link>
          <Link to={{ pathname: "/login" }}>
            <li>Login</li>
          </Link>
          <Link to={{ pathname: "/register" }}>
            <li>Register</li>
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
