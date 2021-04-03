import { TOGGLE_FALSE, TOGGLE_TRUE } from "../constant/actionTypesBugPosts";

import {
  GET_BUG_POSTS_FAIL,
  GET_BUG_POSTS_SUCCESS,
  GET_ALL_BUG_POSTS,
  ADD_BUG_POST,
  GET_BUG_POST,
  LOAD_POST,
} from "../constant/actionTypesBugPosts";
import axios from "axios";

export const addBugPost = (payload) => {
  return { type: ADD_BUG_POST, payload };
};
export const deleteBugPost = (id) => (dispatch) => {
  axios
    .delete(`/api/bugPost/${id}`)
    .then((res) => dispatch(getBugPost()))
    .catch((err) => console.log(err));
};
export const getBugPost = (id) => async (dispatch) => {
  dispatch({ type: LOAD_POST });

  try {
    let result = await axios.get(`/api/bugPost/${id}`);
    dispatch({ type: GET_BUG_POST, payload: result.data.response });
  } catch (error) {
    console.log(error);
  }
};

export const getBugPosts = (page, limit, total) => async (dispatch) => {
  dispatch({
    type: GET_ALL_BUG_POSTS,
  });
  try {
    let result = await axios.get(`/api/bugPost?page=${page}&limit=${limit}`);
    dispatch({
      type: GET_BUG_POSTS_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    dispatch({ type: GET_BUG_POSTS_FAIL, payload: error });
  }
};

export const postBugPost = (bugPost, history) => (dispatch) => {
  axios
    .post("/api/bugPost", bugPost)
    .then((res) => dispatch(getBugPosts()))
    .catch((err) => console.log(err));
  history.push("/bugList/page/1");
};

export const editBugPost = (id, bugPost, history) => (dispatch) => {
  axios
    .put(`/api/bugPost/${id}`, bugPost)
    .then((res) => dispatch(getBugPosts()))
    .catch((err) => console.log(err));
  history.push("/bugList/page/1");
};

export const toggleTrue = () => {
  return {
    type: TOGGLE_TRUE,
  };
};
export const toggleFalse = () => {
  return {
    type: TOGGLE_FALSE,
  };
};
