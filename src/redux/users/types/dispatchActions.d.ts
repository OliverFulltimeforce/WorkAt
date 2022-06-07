import { ActionTypes } from '../types/index';
import { IUser, IError, ISuccess } from './data';

export type GetUsersActions = {
  type: ActionTypes.GET_USERS;
  payload: IUser[];
};

export type SetUserInfoAction = {
  type: ActionTypes.SET_USER_INFO;
  payload: IUser;
};

export type SetUserLoadingAction = {
  type: ActionTypes.SET_IS_USER_LOADING | ActionTypes.SET_IS_USER_NOT_LOADING;
};

export type SetUserErrorAction = {
  type: ActionTypes.SET_USER_ERROR;
  payload: IError;
};

export type SetUserSuccessAction = {
  type: ActionTypes.SET_USER_SUCCESS;
  payload: ISuccess;
};

export type ClearUserErrorAction = {
  type: ActionTypes.CLEAR_USER_ERROR;
};

export type ClearUserSuccessAction = {
  type: ActionTypes.CLEAR_USER_SUCCESS;
};

export type DeleteUserAction = {
  type: ActionTypes.DELETE_USER;
  payload: string;
};

export type Action =
  | GetUsersActions
  | SetUserInfoAction
  | SetUserLoadingAction
  | SetUserErrorAction
  | ClearUserErrorAction
  | DeleteUserAction
  | ClearUserSuccessAction
  | SetUserSuccessAction
  | SetUserUpdatingAction;
