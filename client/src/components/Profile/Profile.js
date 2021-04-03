import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const user = useSelector((state) => state.authReducer.user);
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  return (
    <div>
      <h1>Profile page</h1>
      {isAuth ? (
        <div>
          <h2>
            {user.role} : {user.firstName} {user.lastName}
          </h2>
          <img src={`${user.userImage}`} alt="userImage"></img>
          <br />
          <label>Address : </label>
          <p>
            {user.country}, {user.state} {user.city} {user.street}{" "}
            {user.zipCode}
          </p>
          <Link to={{ pathname: `./editProfile/${user._id}` }} user={user}>
            Edit profile
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
