import {
  ADD_BUG_POST,
  GET_BUG_POSTS_SUCCESS,
  GET_BUG_POSTS_FAIL,
  GET_ALL_BUG_POSTS,
  GET_BUG_POST,
  LOAD_POST,
} from "../constant/actionTypesBugPosts";

const initialState = {
  bugPostList: [],
  loadbugPosts: false,
  errors: null,
  bugPost: {},
  total: null,
  loadPost: false,
};

export const bugPostReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_BUG_POST:
      return { ...state, bugPost: payload, loadPost: false };
    case LOAD_POST:
      return { ...state, loadPost: true };
    case GET_ALL_BUG_POSTS:
      return {
        ...state,
        loadBugPosts: true,
      };
    case GET_BUG_POSTS_SUCCESS:
      return {
        ...state,
        bugPostList: payload.response,
        total: payload.total,
        loadBugPosts: false,
      };
    case GET_BUG_POSTS_FAIL:
      return {
        ...state,
        loadBugPosts: false,
        errors: payload,
      };
    case ADD_BUG_POST:
      return {
        ...state,
        BugPostList: [...state.BugPostList, payload],
      };
    default:
      return state;
  }
};
