import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../JS/actions/authActions";
// import HandleError from "./HandleError";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const Error = useSelector((state) => state.authReducer.error);

  const dispatch = useDispatch();
  const loginUser = (e) => {
    e.preventDefault();
    dispatch(
      login(
        {
          email,
          password,
        },
        history
      )
    );
  };
  // useEffect(() => {

  //   return () => {
  //     dispatch()
  //   }
  // }, [])
  return (
    <div>
      <div className="pagebody">
        <h1>LOGIN</h1>
        {/* <div>
          {Error
            ? Error.map((el) => <HandleError error={el} key={`${el}`} />)
            : null}
        </div> */}
        <form className="form-group">
          <div className="row">
            <div className="col">
              <label>Email : </label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col">
              <label>Password : </label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button className="btn btn-primary" onClick={loginUser}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
