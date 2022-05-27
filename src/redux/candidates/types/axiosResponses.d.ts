import { ICandidate, IConclusions } from "./data";

export type GetCandidatesResponse = {
  status: number;
  allCandidates: ICandidate[];
};

export type GetCandidateInfoResponse = {
  status: number;
  candidate: ICandidate;
};

export type GetCandidatesFilteredResponse = {
  status: number;
  candidatesFiltered: ICandidate[];
};

export type GetCandidateDetail = {
  status: number;
  candidate: ICandidate;
};

export type CreateCandidateResponse = {
  status: number;
  candidate: ICandidate;
};

export type UpdateCandidateResponse = {
  status: number;
  candidate: ICandidate;
};

export type UpdateCandidateStatusResponse = {
  status: number;
  message: string;
};

export type UpdateCandidateConclusionResponse = {
  status: number;
  candidate: IConclusions;
};

export type UpdateCandidateInfoResponse = {
  status: number;
  message: string;
};

export type GenerateUrlResponse = {
  status: number;
  url: string;
};

export type ValidateTokenResponse = {
  status: number;
  decoded: {
    candidate: ICandidate;
    url_id: string;
  };
};
