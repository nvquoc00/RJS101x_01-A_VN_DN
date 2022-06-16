import { STAFFS, DEPARTMENTS } from "../data/staffs";

export const initialState = {
  staffs: STAFFS,
  departments: DEPARTMENTS,
};

export const Reducer = (state = initialState, action) => {
  return state;
};
