import { Dispatch } from 'redux';
import { ActionTypes } from '../types/index';
import {
  GetUsersResponse,
  LoginUserResponse,
  UpdateUserInfoResponse,
} from '../types/axiosResponses';
import {
  ClearUserErrorAction,
  ClearUserSuccessAction,
  DeleteUserAction,
  GetUsersActions,
  SetUserErrorAction,
  SetUserInfoAction,
  SetUserLoadingAction,
  SetUserSuccessAction,
} from '../types/dispatchActions';
import ClientAxios, { PrivateAxios } from '../../../config/api/axios';
import {
  DELETE_USER,
  GET_ALL_USERS,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER,
} from '../../../config/routes/endpoints';
import { VIEW_LOGIN } from '../../../config/routes/paths';
import { setStorage, cleanStorage } from '../../../utils/localStorage';

export function GetAllUsers() {
  return async (dispatch: Dispatch) => {
    dispatch<SetUserLoadingAction>({
      type: ActionTypes.SET_IS_USER_LOADING,
    });

    try {
      const { data } = await PrivateAxios.get<GetUsersResponse>(GET_ALL_USERS);

      dispatch<SetUserLoadingAction>({
        type: ActionTypes.SET_IS_USER_NOT_LOADING,
      });

      return dispatch<GetUsersActions>({
        type: ActionTypes.GET_USERS,
        payload: data.allUsers,
      });
    } catch (error: any) {
      if (error.response) {
        dispatch({ type: ActionTypes.SET_IS_USER_NOT_LOADING });
        return dispatch<SetUserErrorAction>({
          type: ActionTypes.SET_USER_ERROR,
          payload: error.response.data,
        });
      } else {
        dispatch<SetUserLoadingAction>({
          type: ActionTypes.SET_IS_USER_NOT_LOADING,
        });
        return dispatch<SetUserErrorAction>({
          type: ActionTypes.SET_USER_ERROR,
          payload: error,
        });
      }
    }
  };
}

export function UpdateInfo(_id: string, newInfo: any) {
  return async function (dispatch: Dispatch) {
    dispatch({ type: ActionTypes.SET_IS_USER_UPDATING });

    try {
      const { data } = await PrivateAxios.put<UpdateUserInfoResponse>(
        `${UPDATE_USER}/${_id}`,
        newInfo,
      );
      console.log(data);

      dispatch({ type: ActionTypes.SET_IS_USER_NOT_UPDATING });

      setStorage({ user: JSON.stringify(data.user) });

      return dispatch<SetUserSuccessAction>({
        type: ActionTypes.SET_USER_SUCCESS,
        payload: {
          status: 200,
          message: data.message,
        },
      });
    } catch (error) {
      if (error.response) {
        dispatch({ type: ActionTypes.SET_IS_USER_NOT_LOADING });
        return dispatch<SetUserErrorAction>({
          type: ActionTypes.SET_USER_ERROR,
          payload: error.response.data,
        });
      } else {
        dispatch({ type: ActionTypes.SET_IS_USER_NOT_LOADING });
        return dispatch<SetUserErrorAction>({
          type: ActionTypes.SET_USER_ERROR,
          payload: error,
        });
      }
    }
  };
}

export function Login(
  userInfo: { email?: string; password?: string; tokenId?: string },
  googleLogin?: boolean,
) {
  return async function (dispatch: Dispatch) {
    dispatch<SetUserLoadingAction>({ type: ActionTypes.SET_IS_USER_LOADING });

    try {
      const { data } = await ClientAxios.post<LoginUserResponse>(LOGIN_USER, {
        email: userInfo.email,
        password: userInfo.password,
        tokenId: userInfo.tokenId,
        googleLogin,
      });

      dispatch<SetUserLoadingAction>({
        type: ActionTypes.SET_IS_USER_NOT_LOADING,
      });

      cleanStorage();

      setStorage({
        access: data.access_token,
        user: JSON.stringify(data.user),
      });

      dispatch<SetUserSuccessAction>({
        type: ActionTypes.SET_USER_SUCCESS,
        payload: {
          status: 200,
          message: 'Login Successful',
        },
      });

      return dispatch<SetUserInfoAction>({
        type: ActionTypes.SET_USER_INFO,
        payload: data.user,
      });
    } catch (error: any) {
      if (error.response) {
        dispatch({ type: ActionTypes.SET_IS_USER_NOT_LOADING });
        return dispatch<SetUserErrorAction>({
          type: ActionTypes.SET_USER_ERROR,
          payload: error.response.data,
        });
      } else {
        dispatch({ type: ActionTypes.SET_IS_USER_NOT_LOADING });
        return dispatch<SetUserErrorAction>({
          type: ActionTypes.SET_USER_ERROR,
          payload: error,
        });
      }
    }
  };
}

export function DeleteUser(_id: string) {
  return async function (dispatch: Dispatch) {
    dispatch({ type: ActionTypes.SET_IS_USER_UPDATING });
    try {
      const { data } = await PrivateAxios.delete(`${DELETE_USER}/${_id}`);

      dispatch({ type: ActionTypes.SET_IS_USER_NOT_UPDATING });

      dispatch<SetUserSuccessAction>({
        type: ActionTypes.SET_USER_SUCCESS,
        payload: {
          status: 200,
          message: data.message,
        },
      });

      return dispatch<DeleteUserAction>({
        type: ActionTypes.DELETE_USER,
        payload: _id,
      });
    } catch (error: any) {
      if (error.response) {
        dispatch({ type: ActionTypes.SET_IS_USER_NOT_LOADING });
        return dispatch<SetUserErrorAction>({
          type: ActionTypes.SET_USER_ERROR,
          payload: error.response.data,
        });
      } else {
        dispatch({ type: ActionTypes.SET_IS_USER_NOT_UPDATING });
        return dispatch<SetUserErrorAction>({
          type: ActionTypes.SET_USER_ERROR,
          payload: error,
        });
      }
    }
  };
}

export function LogOut() {
  return async function (_dispatch: Dispatch) {
    cleanStorage();

    await PrivateAxios.post(LOGOUT_USER);

    window.location.assign(VIEW_LOGIN);
  };
}

export function ClearUserError(dispatch: Dispatch) {
  return dispatch<ClearUserErrorAction>({ type: ActionTypes.CLEAR_USER_ERROR });
}

export function ClearUserSuccess(dispatch: Dispatch) {
  return dispatch<ClearUserSuccessAction>({
    type: ActionTypes.CLEAR_USER_SUCCESS,
  });
}
