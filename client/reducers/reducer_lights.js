import { SET_LIGHTS } from '../actions/index.js';

export default function (state = [], action) {
  switch (action.type) {
    case SET_LIGHTS:
      return action.payload;
  }

  return state;
};