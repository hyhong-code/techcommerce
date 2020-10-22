import { SUB_CREATED, SUB_UPDATED, SUB_DELETED, SUB_LISTED } from "../actions";

const INITIAL_STATE = {
  subs: null,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SUB_LISTED:
      return { ...state, subs: payload };

    case SUB_CREATED:
      return { ...state, subs: [payload, ...state.subs] };

    case SUB_UPDATED:
      const { id, newSub } = payload;
      return {
        ...state,
        subs: state.subs.map((sub) => (sub._id === id ? newSub : sub)),
      };

    case SUB_DELETED:
      return {
        ...state,
        subs: state.subs.filter((sub) => sub.slug !== payload),
      };

    default:
      return state;
  }
};
