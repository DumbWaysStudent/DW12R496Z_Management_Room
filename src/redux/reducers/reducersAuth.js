import * as types from '../types'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  authData: []
};

export default function reducersAuth(state = initialState, action) {
  switch (action.type) {
    case `${types.AUTH_LOGIN}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${types.AUTH_LOGIN}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        authData: action.payload.data
      };

    case `${types.AUTH_LOGIN}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
}