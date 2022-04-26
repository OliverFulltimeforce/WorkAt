import { Dispatch } from 'redux';

import { ActionTypes } from '../types/index';
import {
  GetCandidatesFilteredResponse,
  GetCandidatesResponse,
} from '../types/axiosResponses';
import {
  GetCandidatesAction,
  GetCandidatesFilteredAction,
} from '../types/dispatchActions';

import {
  ADD_CANDIDATE,
  ADD_CANDIDATE_SUCCESS,
  ADD_CANDIDATE_ERROR,
  GET_ID,
  GET_DATA,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  GET_DATA_EDIT,
  DATA_EDIT,
  DATA_EDIT_SUCCESS,
  DATA_EDIT_ERROR,
} from './../types';
import {
  GET_ALL_CANDIDATES,
  GET_ALL_CANDIDATES_FILTERED,
  CREATE_CANDIDATE,
  UPDATE_CANDIDATE_INFO,
} from '../../../config/routes/endpoints';
import ClientAxios from '../../../config/api/axios';
import { ICandidate } from '../types/data';

export function GetAllCandidates() {
  return async function (dispatch: Dispatch) {
    dispatch({ type: ActionTypes.SET_IS_LOADING });

    try {
      const { data } = await ClientAxios.get<GetCandidatesResponse>(
        GET_ALL_CANDIDATES,
      );

      dispatch({ type: ActionTypes.SET_IS_NOT_LOADING });

      return dispatch<GetCandidatesAction>({
        type: ActionTypes.GET_CANDIDATES,
        payload: data.allCandidates,
      });
    } catch (error) {
      if (error.response) {
        dispatch({ type: ActionTypes.SET_IS_NOT_LOADING });
        dispatch({
          type: ActionTypes.SET_ERROR,
          payload: error.response.data,
        });
      }
    }
  };
}

export function GetCandidatesFiltered(
  position?: string[],
  secondary_status?: string[],
  query?: string,
  apply_next?: boolean,
  previousQuery?: ICandidate[],
) {
  return async function (dispatch: Dispatch) {
    const requestBody = JSON.stringify({
      position,
      secondary_status,
      query,
      apply_next,
      previousQuery,
    });

    dispatch({ type: ActionTypes.SET_IS_LOADING });

    try {
      const { data } = await ClientAxios.post<GetCandidatesFilteredResponse>(
        GET_ALL_CANDIDATES_FILTERED,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      dispatch({ type: ActionTypes.SET_IS_NOT_LOADING });

      return dispatch<GetCandidatesFilteredAction>({
        type: ActionTypes.GET_CANDIDATES_FILTERED,
        payload: data.candidatesFiltered,
      });
    } catch (error) {
      if (error.response) {
        dispatch({ type: ActionTypes.SET_IS_NOT_LOADING });
        dispatch({
          type: ActionTypes.SET_ERROR,
          payload: error.response.data,
        });
      }
    }
  };
}

export function AddCandidate(user: any) {
  return async (dispatch: any) => {
    dispatch(AddCandidateLoad(true));

    try {
      const {
        data: { id },
      } = await ClientAxios.post(CREATE_CANDIDATE, user); // cambiar esto para que no de error
      dispatch(AddCandidateSuccess(user));
      dispatch(GetID(id));
    } catch (error) {
      dispatch(AddCandidateError(true));
    }
  };
}

export function CleanErrors() {
  return function (dispatch: Dispatch) {
    return dispatch({
      type: ActionTypes.CLEAN_ERROR,
    });
  };
}

export function CleanFilters() {
  return function (dispatch: Dispatch) {
    return dispatch({
      type: ActionTypes.CLEAN_FILTERS,
    });
  };
}

export function CleanSearch() {
  return function (dispatch: Dispatch) {
    return dispatch({
      type: ActionTypes.CLEAN_SEARCH,
    });
  };
}

export function SetAppliedFilters() {
  return function (dispatch: Dispatch) {
    return dispatch({
      type: ActionTypes.SET_APPLIED_FILTERS,
    });
  };
}

const AddCandidateLoad = (status: boolean) => ({
  type: ADD_CANDIDATE,
  payload: status,
});

const AddCandidateSuccess = (user: any) => ({
  type: ADD_CANDIDATE_SUCCESS,
  payload: user,
});

const AddCandidateError = (status: boolean) => ({
  type: ADD_CANDIDATE_ERROR,
  payload: status,
});

/* HELPER TO GET ID */
const GetID = (id: number) => ({
  type: GET_ID,
  payload: id,
});

/* FUNCTION TO GET DATA FROM DATABASE */
export function GetData(id: number) {
  return async (dispatch: any) => {
    dispatch(GetDataLoad(true));
    try {
      const response = await ClientAxios.get(`${CREATE_CANDIDATE}/${id}`); ///candidates/${id}
      dispatch(GetDataSuccess(response.data));
    } catch (error) {
      dispatch(GetDataError(true));
    }
  };
}

const GetDataLoad = (status: boolean) => ({
  type: GET_DATA,
  payload: status,
});

const GetDataSuccess = (user: any) => ({
  type: GET_DATA_SUCCESS,
  payload: user,
});

const GetDataError = (status: boolean) => ({
  type: GET_DATA_ERROR,
  payload: status,
});

/* FUNCTION TO GET DATA IN THE FORM TO EDIT */
export function DataEdit(user: any) {
  return (dispatch: any) => {
    dispatch(GetDataEdit(user));
  };
}

const GetDataEdit = (user: any) => ({
  type: GET_DATA_EDIT,
  payload: user,
});

/* FUNCTION TO SAVE EDIT */
export function DataSaveEdit(user: any) {
  return async (dispatch: any) => {
    dispatch(DataEditLoad(true));

    try {
      ClientAxios.put(`${UPDATE_CANDIDATE_INFO}/${user.id}`, user); ///candidates/${user.id}
      dispatch(DataEditSuccess(user));
    } catch (error) {
      dispatch(DataEditError(true));
    }
  };
}

const DataEditLoad = (status: boolean) => ({
  type: DATA_EDIT,
  payload: status,
});

const DataEditSuccess = (user: any) => ({
  type: DATA_EDIT,
  payload: user,
});

const DataEditError = (status: boolean) => ({
  type: DATA_EDIT,
  payload: status,
});
