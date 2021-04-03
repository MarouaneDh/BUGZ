import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../JS/actions/authActions";
import "./Register.css";

const Register = ({ history }) => {
  //   const Error = useSelector((state) => state.authReducer.error);
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [userImage, setUserImage] = useState("");

  const onChangeFile = (e) => {
    setUserImage(`/uploads/${e.target.files[0].name}`);
  };
  console.log(userImage);
  const dispatch = useDispatch();
  const addUser = (e) => {
    e.preventDefault();
    dispatch(
      register(
        {
          firstName,
          lastName,
          role,
          email,
          password,
          gender,
          birthday,
          country,
          state,
          city,
          street,
          zipCode,
          userImage,
        },
        history
      )
    );
  };

  return (
    <div>
      <div className="pagebody">
        <h1 className="nav">REGISTER</h1>
        {/* {Error
          ? Error.map((el) => <HandleError error={el} key={`${el}`} />)
          : null} */}

        <form className="form-group">
          <label>what will you be? : </label>
          <select
            name="role"
            className="form-control"
            onChange={(e) => setRole(e.target.value)}
          >
            <option>none</option>
            <option>Bug fixer</option>
            <option>Bug poster</option>
          </select>
          <div className="row">
            <div className="col">
              <label>Fisrt name : </label>
              <input
                name="firstName"
                className="form-control"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="first name"
              />
            </div>
            <div className="col">
              <label>Last name : </label>
              <input
                name="lastName"
                className="form-control"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="last name"
              />
            </div>
          </div>
          <label>Birthday : </label>
          <input
            name="birthday"
            type="date"
            className="form-control"
            onChange={(e) => setBirthday(e.target.value)}
            placeholder="birthday date"
          />
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputEmail1">Email : </label>
              <input
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
              />
            </div>
            <div className="col">
              <label htmlFor="exampleInputPassword1"> Password : </label>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
            </div>
          </div>

          <label>Gender : </label>
          <select
            name="gender"
            className="form-control"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">none</option>
            <option value="male">Male</option>
            <option value="female">female</option>
          </select>
          <div className="row">
            <div className="col">
              <label>Country : </label>
              <input
                name="country"
                className="form-control"
                onChange={(e) => setCountry(e.target.value)}
                placeholder="country"
              />
            </div>
            <div className="col">
              <label>State : </label>
              <input
                name="state"
                className="form-control"
                onChange={(e) => setState(e.target.value)}
                placeholder="state"
              />
            </div>
            <div className="col">
              <label>City : </label>
              <input
                name="city"
                className="form-control"
                onChange={(e) => setCity(e.target.value)}
                placeholder="city"
              />
            </div>
            <div className="col">
              <label>Street : </label>
              <input
                name="street"
                className="form-control"
                onChange={(e) => setStreet(e.target.value)}
                placeholder="street"
              />
            </div>
            <div className="col">
              <label>Zip code : </label>
              <input
                name="zipCode"
                className="form-control"
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="zip code"
              />
            </div>
          </div>
        </form>
        <form action="/register" encType="multipart/form-data" method="POST">
          <input
            type="file"
            name="userImage"
            accept="image/*"
            onChange={(e) => onChangeFile(e)}
          />
          <button onClick={addUser}>
            Do you want to confirm these credentials
          </button>
          <br />
          <input type="submit" value="REGISTER" />
        </form>
      </div>
    </div>
  );
};

export default Register;
