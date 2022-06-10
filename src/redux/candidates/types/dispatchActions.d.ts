import { ActionTypes } from '../types/index';
import { ICandidate, IError, IConclusionInv } from './data';

export type GetCandidatesAction = {
  type: ActionTypes.GET_CANDIDATES;
  payload: CandidateState;
};

export type GetCandidatesFilteredAction = {
  type: ActionTypes.GET_CANDIDATES_FILTERED;
  payload: CandidateState;
};

export type GetCandidateInfoAction = {
  type: ActionTypes.GET_CANDIDATE_DETAIL;
  payload: ICandidate;
};

export type ClearCandidateDetailAction = {
  type: ActionTypes.CLEAR_CANDIDATE_DETAIL;
};

export type UpdateCandidateStatusAction = {
  type: ActionTypes.UPDATE_STATUS;
  payload: {
    _id: string;
    main_status: string;
    secondary_status: string;
  };
};

export type UpdateCandidateInfoAction = {
  type: ActionTypes.UPDATE_CANDIDATE_INFO;
  payload: ICandidate;
};

export type SetToEditInfoAction = {
  type: ActionTypes.SET_TO_EDIT_INFO;
};

export type CleanCandidateSuccessAction = {
  type: ActionTypes.CLEAR_CANDIDATE_SUCCESS;
};

export type SetDetailFinishedLoadingAction = {
  type: ActionTypes.SET_DETAIL_FINISHED_LOADING;
};

export type SetCandidateLoadingAction = {
  type:
    | ActionTypes.SET_IS_CANDIDATE_LOADING
    | ActionTypes.SET_IS_NOT_CANDIDATE_LOADING;
};

export type SetUpdatingCandidateAction = {
  type:
    | ActionTypes.SET_IS_CANDIDATE_UPDATING
    | ActionTypes.SET_IS_NOT_CANDIDATE_UPDATING;
};

export type SetCandidateErrorAction = {
  type: ActionTypes.SET_CANDIDATE_ERROR;
  payload: IError;
};

export type ClearCandidateErrorAction = {
  type: ActionTypes.CLEAN_CANDIDATE_ERROR;
};

export type CreateCandidateAction = {
  type: ActionTypes.CREATE_CANDIDATE;
  payload: ICandidate;
};

export type UpdateCandidateConclusionAction = {
  type: ActionTypes.UPDATE_CONCLUSION;
  payload: {
    good?: IConclusionInv;
    bad?: IConclusionInv;
  };
};

export type SetCandidateSuccessAction = {
  type: ActionTypes.SET_CANDIDATE_SUCCESS;
  payload: {
    status: number;
    message: string;
  };
};

export type GenerateUrlAction = {
  type: ActionTypes.GENERATE_URL;
  payload: {
    status: number;
    url: string;
  };
};

export type SetCurrentFiltersAction = {
  type: ActionTypes.SET_CURRENT_FILTERS;
  payload: {
    position: Array<string>;
    status: Array<string>;
    query: string;
  };
};

export type CleanFiltersAction = {
  type: ActionTypes.CLEAN_FILTERS;
};

export type ValidateTokenAction = {
  type: ActionTypes.VALIDATE_TOKEN;
  payload: {
    status: number;
    decoded: {
      candidate: ICandidate;
      url_id: string;
    };
  };
};

export type Action =
  | GetCandidatesAction
  | GetCandidatesFilteredAction
  | NotFoundWithFilers
  | SetToEditInfoAction
  | SetCandidateLoadingAction
  | CreateCandidateAction
  | SetCandidateErrorAction
  | ClearCandidateErrorAction
  | UpdateCandidateStatusAction
  | UpdateCandidateInfoAction
  | GetCandidateInfoAction
  | SetCurrentFiltersAction
  | CleanFiltersAction
  | ClearCandidateDetailAction
  | SetDetailFinishedLoadingAction
  | CleanCandidateSuccessAction
  | SetCandidateSuccessAction
  | ValidateTokenAction
  | GenerateUrlAction;
