import axios from "axios";
import {
  LOGIN_USER,
  LOGOUT,
  GET_AUTH_USER,
  AUTH_ERROR,
  REGISTER_USER,
  SET_LOADING,
} from "../constant/actionTypes";

//register user

export const register = (formData, history) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.post("/api/auth/register", formData);
    dispatch({
      type: REGISTER_USER,
      payload: res.data, //msg+token+user
    });
    // history.push("/");
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data.errors,
    });
  }
};

//login user

export const login = (formData, history) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.post("/api/auth/login", formData);
    dispatch({
      type: LOGIN_USER,
      payload: res.data, //msg+token+user
    });
    history.push("/");
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data.errors,
    });
  }
};

//get auth user

export const getAuthUser = () => async (dispatch) => {
  dispatch(setLoading());

  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let res = await axios.get("/api/auth/me", options);
    dispatch({
      type: GET_AUTH_USER,
      payload: res.data.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data.errors,
    });
  }
};
export const deleteUser = (id) => (dispatch) => {
  axios
    .delete(`/api/user/${id}`)
    .then((res) => dispatch(getAuthUser()))
    .catch((err) => console.log(err));
};
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const editUser = (id, user) => (dispatch) => {
  axios
    .put(`/api/user/${id}`, user)
    .then((res) => dispatch(getAuthUser()))
    .catch((err) => console.log(err));
};

const setLoading = () => (dispatch) => {
  dispatch({
    type: SET_LOADING,
  });
};
