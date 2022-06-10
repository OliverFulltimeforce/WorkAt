import { ICandidate, IError } from './data';

export type InitialState = {
  candidates: ICandidate[];
  detail: ICandidate;
  url_id: string;
  user: {
    college: string;
    salary: string;
    available: string;
    skills: string[];
    description: string;
    video: string;
  };
  toEdit: boolean;
  loading: boolean;
  updating: boolean;
  detailFinishedLoading: boolean;
  error: IError;
  success: {
    status: number;
    message: string;
  };
  currentFilters: {
    position: Array<string>;
    status: Array<string>;
    query: string;
  };
};
