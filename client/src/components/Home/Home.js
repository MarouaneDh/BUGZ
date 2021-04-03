import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.authReducer.user);
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  return (
    <div>
      <div>
        <div>
          <h1>Home</h1>
          {isAuth ? <p>hello dear {user.role}</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
