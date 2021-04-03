import {
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  GET_ALL_USERS,
  GET_USER,
} from "../constant/actionTypesUser";
import axios from "axios";

export const getUsers = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_USERS,
  });
  try {
    let result = await axios.get("/api/user");
    dispatch({ type: GET_USERS_SUCCESS, payload: result.data.response });
  } catch (error) {
    dispatch({ type: GET_USERS_FAIL, payload: error.response.data.errors });
  }
};

export const getUser = (id) => (dispatch) => {
  axios
    .get(`/api/user/${id}`)
    .then((res) => dispatch({ type: GET_USER, payload: res.data.response }))
    .catch((err) => console.log(err));
};
