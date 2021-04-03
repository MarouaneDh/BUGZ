import { TOGGLE_FALSE, TOGGLE_TRUE } from "../constant/actionTypes";

const initialState = {
  edit: false,
};

export const editAuthReducer = (state = initialState, { type }) => {
  switch (type) {
    case TOGGLE_TRUE:
      return { ...state, edit: true };
    case TOGGLE_FALSE:
      return { ...state, edit: false };
    default:
      return state;
  }
};
