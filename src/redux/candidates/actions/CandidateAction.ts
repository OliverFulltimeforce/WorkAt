import { Dispatch } from 'redux';

import { ActionTypes } from '../types/index';

import {
  CreateCandidateResponse,
  GetCandidateInfoResponse,
  GetCandidatesFilteredResponse,
  GetCandidatesResponse,
  UpdateCandidateConclusionResponse,
  UpdateCandidateStatusResponse,
  ValidateTokenResponse,
} from '../types/axiosResponses';

import {
  CreateCandidateAction,
  GetCandidatesAction,
  GetCandidatesFilteredAction,
  SetCandidateErrorAction,
  ClearCandidateErrorAction,
  GetCandidateInfoAction,
  SetCurrentFiltersAction,
  CleanFiltersAction,
  ClearCandidateDetailAction,
  SetDetailFinishedLoadingAction,
  CleanCandidateSuccessAction,
  SetCandidateSuccessAction,
  SetUpdatingCandidateAction,
  SetCandidateLoadingAction,
  ValidateTokenAction,
  UpdateCandidateConclusionAction,
  UpdateCandidateStatusAction,
  UpdateCandidateInfoAction,
  SetToEditInfoAction,
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
  CREATE_CANDIDATE,
  GENERATE_URL,
  GET_ALL_CANDIDATES,
  GET_ALL_CANDIDATES_FILTERED,
  POST_CANDIDATE,
  UPDATE_CONCLUSION,
  UPDATE_STATUS,
  VALIDATE_TOKEN,
  SEND_VIDEO,
  UPDATE_INFO,
} from '../../../config/routes/endpoints';
import ClientAxios, { PrivateAxios } from '../../../config/api/axios';
import { Filters, IConclusionInv } from '../types/data';

export function GetAllCandidates() {
  return async function (dispatch: Dispatch) {
    dispatch<SetCandidateLoadingAction>({
      type: ActionTypes.SET_IS_CANDIDATE_LOADING,
    });

    try {
      const { data } = await PrivateAxios.get<GetCandidatesResponse>(
        GET_ALL_CANDIDATES,
      );

      dispatch<SetCandidateLoadingAction>({
        type: ActionTypes.SET_IS_NOT_CANDIDATE_LOADING,
      });

      return dispatch<GetCandidatesAction>({
        type: ActionTypes.GET_CANDIDATES,
        payload: data.allCandidates,
      });
    } catch (error: any) {
      if (error.response) {
        dispatch({ type: ActionTypes.SET_IS_NOT_CANDIDATE_LOADING });

        return dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error.response.data,
        });
      } else {
        dispatch<SetCandidateLoadingAction>({
          type: ActionTypes.SET_IS_NOT_CANDIDATE_LOADING,
        });
        return dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error,
        });
      }
    }
  };
}

export function GetCandidateInfo(_id: string) {
  return async function (dispatch: Dispatch) {
    try {
      const { data } = await PrivateAxios.get<GetCandidateInfoResponse>(
        `${GET_ALL_CANDIDATES}/${_id}`,
      );

      dispatch<SetDetailFinishedLoadingAction>({
        type: ActionTypes.SET_DETAIL_FINISHED_LOADING,
      });

      return dispatch<GetCandidateInfoAction>({
        type: ActionTypes.GET_CANDIDATE_DETAIL,
        payload: data.candidate,
      });
    } catch (error: any) {
      if (error.response) {
        dispatch<SetCandidateLoadingAction>({
          type: ActionTypes.SET_IS_NOT_CANDIDATE_LOADING,
        });
        return dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error.response.data,
        });
      } else {
        dispatch<SetCandidateLoadingAction>({
          type: ActionTypes.SET_IS_NOT_CANDIDATE_LOADING,
        });
        return dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error,
        });
      }
    }
  };
}

export function ClearCandidateDetail(dispatch: Dispatch) {
  dispatch<SetDetailFinishedLoadingAction>({
    type: ActionTypes.SET_DETAIL_FINISHED_LOADING,
  });

  return dispatch<ClearCandidateDetailAction>({
    type: ActionTypes.CLEAR_CANDIDATE_DETAIL,
  });
}

export function GetCandidatesFiltered(filters: Filters) {
  return async function (dispatch: Dispatch) {
    dispatch<SetCandidateLoadingAction>({
      type: ActionTypes.SET_IS_CANDIDATE_LOADING,
    });

    try {
      const { data } = await PrivateAxios.post<GetCandidatesFilteredResponse>(
        GET_ALL_CANDIDATES_FILTERED,
        filters,
      );

      dispatch<SetCandidateLoadingAction>({
        type: ActionTypes.SET_IS_NOT_CANDIDATE_LOADING,
      });

      dispatch<SetCurrentFiltersAction>({
        type: ActionTypes.SET_CURRENT_FILTERS,
        payload: {
          position: filters.position,
          status: filters.status,
          query: filters.query,
        },
      });

      return dispatch<GetCandidatesFilteredAction>({
        type: ActionTypes.GET_CANDIDATES_FILTERED,
        payload: data.candidatesFiltered,
      });
    } catch (error: any) {
      if (error.response) {
        dispatch<SetCandidateLoadingAction>({
          type: ActionTypes.SET_IS_NOT_CANDIDATE_LOADING,
        });

        dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error.response.data,
        });

        return dispatch<SetCurrentFiltersAction>({
          type: ActionTypes.SET_CURRENT_FILTERS,
          payload: {
            position: filters.position,
            status: filters.status,
            query: filters.query,
          },
        });
      } else {
        dispatch<SetCandidateLoadingAction>({
          type: ActionTypes.SET_IS_NOT_CANDIDATE_LOADING,
        });
        return dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error,
        });
      }
    }
  };
}

export function CreateCandidate(candidateInfo: any) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<SetCandidateLoadingAction>({
        type: ActionTypes.SET_IS_CANDIDATE_LOADING,
      });

      const { data } = await ClientAxios.post<CreateCandidateResponse>(
        CREATE_CANDIDATE,
        candidateInfo,
      );

      dispatch<SetCandidateLoadingAction>({
        type: ActionTypes.SET_IS_NOT_CANDIDATE_LOADING,
      });

      dispatch<SetCandidateSuccessAction>({
        type: ActionTypes.SET_CANDIDATE_SUCCESS,
        payload: {
          status: 201,
          message: 'Created successfully',
        },
      });

      return dispatch<CreateCandidateAction>({
        type: ActionTypes.CREATE_CANDIDATE,
        payload: data.candidate,
      });
    } catch (error: any) {
      if (error.response) {
        dispatch<SetCandidateLoadingAction>({
          type: ActionTypes.SET_IS_NOT_CANDIDATE_LOADING,
        });

        dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error.response.data,
        });
      } else {
        dispatch<SetCandidateLoadingAction>({
          type: ActionTypes.SET_IS_NOT_CANDIDATE_LOADING,
        });
        return dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error,
        });
      }
    }
  };
}

export function GenerateUrl(_id: string) {
  return async function (dispatch: Dispatch) {
    try {
      await PrivateAxios.post(`${GENERATE_URL}/${_id}`);
    } catch (error: any) {
      if (error.response) {
        dispatch<SetCandidateLoadingAction>({
          type: ActionTypes.SET_IS_NOT_CANDIDATE_LOADING,
        });

        return dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error.response.data,
        });
      } else {
        dispatch<SetCandidateLoadingAction>({
          type: ActionTypes.SET_IS_NOT_CANDIDATE_LOADING,
        });
        return dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error,
        });
      }
    }
  };
}

export function UpdateCandidateInfo(_id: string, newInfo: any) {
  return async function (dispatch: Dispatch) {
    try {
      dispatch<SetCandidateLoadingAction>({
        type: ActionTypes.SET_IS_CANDIDATE_LOADING,
      });

      await ClientAxios.put(`${UPDATE_INFO}/${_id}`, newInfo);

      dispatch<SetCandidateLoadingAction>({
        type: ActionTypes.SET_IS_NOT_CANDIDATE_LOADING,
      });

      dispatch<SetCandidateSuccessAction>({
        type: ActionTypes.SET_CANDIDATE_SUCCESS,
        payload: {
          status: 200,
          message: 'Updated successfully',
        },
      });

      return dispatch<UpdateCandidateInfoAction>({
        type: ActionTypes.UPDATE_CANDIDATE_INFO,
        payload: newInfo,
      });
    } catch (error) {
      if (error.response) {
        dispatch<SetCandidateLoadingAction>({
          type: ActionTypes.SET_IS_NOT_CANDIDATE_LOADING,
        });

        return dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error.response.data,
        });
      } else {
        dispatch<SetCandidateLoadingAction>({
          type: ActionTypes.SET_IS_NOT_CANDIDATE_LOADING,
        });
        return dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error,
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
      } = await ClientAxios.post(POST_CANDIDATE, user);
      dispatch(AddCandidateSuccess(user));
      dispatch(GetID(id));
    } catch (error) {
      dispatch(AddCandidateError(true));
    }
  };
}

export function UpdateCandidateStatus(
  _id: string,
  main_status: string,
  secondary_status: string,
) {
  return async function (dispatch: Dispatch) {
    dispatch<SetUpdatingCandidateAction>({
      type: ActionTypes.SET_IS_CANDIDATE_UPDATING,
    });

    try {
      const { data } = await PrivateAxios.put<UpdateCandidateStatusResponse>(
        `${UPDATE_STATUS}/${_id}`,
        {
          main_status,
          secondary_status,
        },
      );

      dispatch<SetUpdatingCandidateAction>({
        type: ActionTypes.SET_IS_NOT_CANDIDATE_UPDATING,
      });

      dispatch<SetCandidateSuccessAction>({
        type: ActionTypes.SET_CANDIDATE_SUCCESS,
        payload: {
          status: data.status,
          message: data.message,
        },
      });

      return dispatch<UpdateCandidateStatusAction>({
        type: ActionTypes.UPDATE_STATUS,
        payload: {
          _id,
          main_status: data.main_status,
          secondary_status: data.secondary_status,
        },
      });
    } catch (error: any) {
      if (error.response) {
        return dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error.response.data,
        });
      } else {
        dispatch<SetCandidateLoadingAction>({
          type: ActionTypes.SET_IS_NOT_CANDIDATE_LOADING,
        });
        return dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error,
        });
      }
    }
  };
}

export function UpdateCandidateConclusion(
  _id: string,
  candidate: { good?: IConclusionInv; bad?: IConclusionInv },
) {
  return async function (dispatch: Dispatch) {
    try {
      dispatch<SetUpdatingCandidateAction>({
        type: ActionTypes.SET_IS_CANDIDATE_UPDATING,
      });

      await PrivateAxios.put<UpdateCandidateConclusionResponse>(
        `${UPDATE_CONCLUSION}/${_id}`,
        candidate,
      );

      dispatch<SetUpdatingCandidateAction>({
        type: ActionTypes.SET_IS_NOT_CANDIDATE_UPDATING,
      });

      return dispatch<UpdateCandidateConclusionAction>({
        type: ActionTypes.UPDATE_CONCLUSION,
        payload: candidate,
      });
    } catch (error: any) {
      if (error.response) {
        dispatch<SetUpdatingCandidateAction>({
          type: ActionTypes.SET_IS_NOT_CANDIDATE_UPDATING,
        });
        return dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error.response.data,
        });
      } else {
        dispatch<SetUpdatingCandidateAction>({
          type: ActionTypes.SET_IS_NOT_CANDIDATE_UPDATING,
        });
        return dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error,
        });
      }
    }
  };
}

export function ValidateToken(token: string) {
  return async function (dispatch: Dispatch) {
    try {
      const { data } = await ClientAxios.post<ValidateTokenResponse>(
        `${VALIDATE_TOKEN}?token=${token}`,
      );

      return dispatch<ValidateTokenAction>({
        type: ActionTypes.VALIDATE_TOKEN,
        payload: data,
      });
    } catch (error: any) {
      if (error.response) {
        return dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error.response.data,
        });
      }
    }
  };
}

export function SendVideo(_id: string, formData: any) {
  return async function (dispatch: Dispatch) {
    try {
      await ClientAxios.post(`${SEND_VIDEO}/${_id}`, formData);

      console.log('video updated successfully');
    } catch (error) {
      if (error.response) {
        dispatch<SetUpdatingCandidateAction>({
          type: ActionTypes.SET_IS_NOT_CANDIDATE_UPDATING,
        });
        return dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error.response.data,
        });
      } else {
        dispatch<SetUpdatingCandidateAction>({
          type: ActionTypes.SET_IS_NOT_CANDIDATE_UPDATING,
        });
        return dispatch<SetCandidateErrorAction>({
          type: ActionTypes.SET_CANDIDATE_ERROR,
          payload: error,
        });
      }
    }
  };
}

export function CleanCandidateErrors(dispatch: Dispatch) {
  return dispatch<ClearCandidateErrorAction>({
    type: ActionTypes.CLEAN_CANDIDATE_ERROR,
  });
}

export function CleanFilters(dispatch: Dispatch) {
  return dispatch<CleanFiltersAction>({
    type: ActionTypes.CLEAN_FILTERS,
  });
}

export function ClearCandidateSuccess(dispatch: Dispatch) {
  return dispatch<CleanCandidateSuccessAction>({
    type: ActionTypes.CLEAR_CANDIDATE_SUCCESS,
  });
}

export function SetToEditInfo(dispatch: Dispatch) {
  return dispatch<SetToEditInfoAction>({ type: ActionTypes.SET_TO_EDIT_INFO });
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
      const response = await ClientAxios.get(`${POST_CANDIDATE}/${id}`);
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
export function DataSaveEdit(user: any, id: number) {
  return async (dispatch: any) => {
    dispatch(DataEditLoad(true));

    try {
      ClientAxios.put(`${POST_CANDIDATE}/${id}`, user);
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
  type: DATA_EDIT_SUCCESS,
  payload: user,
});

const DataEditError = (status: boolean) => ({
  type: DATA_EDIT_ERROR,
  payload: status,
});
