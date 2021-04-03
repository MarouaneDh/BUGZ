import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_ALL_USERS,
  GET_USER,
} from "../constant/actionTypesUser";

const initialState = {
  userList: [],
  loadUsers: false,
  errors: null,
  user: {},
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER:
      return { ...state, user: payload };
    case GET_ALL_USERS:
      return {
        ...state,
        loadUsers: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        userList: payload,
        loadUsers: false,
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        loadUsers: false,
        errors: payload,
      };
    default:
      return state;
  }
};
