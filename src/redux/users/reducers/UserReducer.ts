import { ActionTypes } from '../types/index';
import { InitialState } from '../types/states';
import { Action } from '../types/dispatchActions';

const initialState: InitialState = {
  users: [],
  info: {
    _id: '',
    name: '',
    email: '',
    phone: '',
    position_name: '',
    role: {
      _id: '',
      name: '',
    },
  },
  loading: false,
  updating: false,
  authenticated: false,
  error: {
    status: 400,
    message: '',
  },
  success: {
    status: 200,
    message: '',
  },
};

function UserReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.SET_IS_USER_UPDATING: {
      return {
        ...state,
        updating: true,
      };
    }

    case ActionTypes.SET_IS_USER_NOT_UPDATING: {
      return {
        ...state,
        updating: false,
      };
    }

    case ActionTypes.GET_USERS: {
      return {
        ...state,
        users: action.payload,
      };
    }

    case ActionTypes.SET_USER_INFO: {
      return {
        ...state,
        info: action.payload,
      };
    }

    case ActionTypes.SET_IS_USER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case ActionTypes.SET_IS_USER_NOT_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    case ActionTypes.SET_USER_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case ActionTypes.SET_USER_SUCCESS: {
      return {
        ...state,
        success: action.payload,
        authenticated: true,
      };
    }

    case ActionTypes.CLEAR_USER_ERROR: {
      return {
        ...state,
        error: {
          status: 400,
          message: '',
        },
      };
    }

    case ActionTypes.CLEAR_USER_SUCCESS: {
      return {
        ...state,
        success: {
          status: 200,
          message: '',
        },
      };
    }

    case ActionTypes.DELETE_USER: {
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    }

    default:
      return state;
  }
}

export default UserReducer;
