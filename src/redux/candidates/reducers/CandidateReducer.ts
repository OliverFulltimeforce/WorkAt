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

import { ActionTypes } from '../types/index';
import { InitialState } from '../types/states';
import { Action } from '../types/dispatchActions';

const initialState: InitialState = {
  candidates: [],
  detail: {
    _id: '',
    name: '',
    email: '',
    conclusions: {
      good: [],
      bad: [],
    },
    country: '',
    english_level: '',
    academic_training: '',
    phone: 0,
    position: {
      _id: '',
      title: '',
      client_name: '',
      rie_link: '',
      designated: [],
      priority: '',
      recruiter_filter: '',
      url: '',
      isActive: true,
      skills_required: [],
      video_questions_list: [],
    },
    working_reason: '',
    videos_question_list: [],
    main_status: '',
    secondary_status: '',
    designated_recruiters: [],
    skills: [],
    linkedin: '',
    portfolio: '',
    createdAt: undefined,
    updatedAt: undefined,
    video_recording_url: {
      _id: '',
      short_url: '',
      expiresAt: undefined,
    },
    cv: '',
    isRejected: false,
    url_link_2: '',
  },
  detailFinishedLoading: false,
  url_id: '',
  user: {
    college: '',
    salary: '',
    available: '',
    skills: [''],
    description: '',
    video: '',
  },
  toEdit: false,
  loading: false,
  updating: false,
  error: {
    status: 400,
    message: '',
  },
  success: {
    status: 200,
    message: '',
  },
  currentFilters: {
    position: [],
    status: [],
    query: '',
  },
};

function CandidateReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.GET_CANDIDATES: {
      return {
        ...state,
        candidates: action.payload,
      };
    }

    case ActionTypes.GET_CANDIDATE_DETAIL: {
      return {
        ...state,
        detail: action.payload,
      };
    }

    case ActionTypes.VALIDATE_TOKEN: {
      return {
        ...state,
        detail: action.payload.decoded.candidate,
        url_id: action.payload.decoded.url_id,
      };
    }

    case ActionTypes.GET_CANDIDATES_FILTERED: {
      return {
        ...state,
        candidates: action.payload,
      };
    }

    case ActionTypes.CREATE_CANDIDATE: {
      return {
        ...state,
        candidates: state.candidates.concat(action.payload),
      };
    }

    case ActionTypes.UPDATE_CONCLUSION: {
      return {
        ...state,
        detail: {
          ...state.detail,
          conclusions: {
            good: action.payload.good
              ? state.detail.conclusions?.good.concat(action.payload.good)
              : state.detail.conclusions?.good,
            bad: action.payload.bad
              ? state.detail.conclusions?.bad.concat(action.payload.bad)
              : state.detail.conclusions?.bad,
          },
        },
      };
    }

    case ActionTypes.UPDATE_STATUS: {
      return {
        ...state,
        candidates: state.candidates.map((candidate) =>
          candidate._id === action.payload._id
            ? {
                ...candidate,
                main_status: action.payload.main_status,
                secondary_status: action.payload.secondary_status,
              }
            : candidate,
        ),
        detail: {
          ...state.detail,
          main_status: action.payload.main_status,
          secondary_status: action.payload.secondary_status,
        },
      };
    }

    case ActionTypes.UPDATE_CANDIDATE_INFO: {
      return {
        ...state,
        detail: action.payload,
      };
    }

    case ActionTypes.SET_TO_EDIT_INFO: {
      return {
        ...state,
        toEdit: !state.toEdit,
      };
    }

    case ActionTypes.SET_IS_CANDIDATE_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case ActionTypes.SET_IS_NOT_CANDIDATE_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }

    case ActionTypes.SET_IS_CANDIDATE_UPDATING: {
      return {
        ...state,
        updating: true,
      };
    }

    case ActionTypes.SET_IS_NOT_CANDIDATE_UPDATING: {
      return {
        ...state,
        updating: false,
      };
    }

    case ActionTypes.SET_CANDIDATE_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case ActionTypes.SET_CANDIDATE_SUCCESS: {
      return {
        ...state,
        success: action.payload,
      };
    }

    case ActionTypes.CLEAR_CANDIDATE_SUCCESS: {
      return {
        ...state,
        success: {
          status: 200,
          message: '',
        },
      };
    }

    case ActionTypes.SET_DETAIL_FINISHED_LOADING: {
      return {
        ...state,
        detailFinishedLoading: !state.detailFinishedLoading,
      };
    }

    case ActionTypes.CLEAN_CANDIDATE_ERROR: {
      return {
        ...state,
        error: {
          status: 400,
          message: '',
        },
      };
    }

    case ActionTypes.CLEAN_FILTERS: {
      return {
        ...state,
        currentFilters: {
          position: [],
          status: [],
          query: '',
        },
      };
    }

    case ActionTypes.CLEAR_CANDIDATE_DETAIL: {
      return {
        ...state,
        detail: {
          _id: '',
          name: '',
          email: '',
          conclusions: {
            good: [''],
            bad: [''],
          },
          country: '',
          english_level: '',
          academic_training: '',
          phone: 123,
          position: {
            _id: '',
            title: '',
            client_name: '',
            rie_link: '',
            designated: [''],
            priority: '',
            recruiter_filter: '',
            url: '',
            isActive: true,
            skills_required: [],
            video_questions_list: [],
          },
          working_reason: '',
          main_status: 'interested',
          secondary_status: 'new entry',
          designated_recruiters: [],
          skills: [],
          linkedin: '',
          portfolio: '',
          createdAt: undefined,
          updatedAt: undefined,
          video_recording_url: {
            _id: '',
            short_url: '',
            expiresAt: undefined,
          },
          cv: '',
          isRejected: false,
        },
      };
    }

    case ActionTypes.SET_CURRENT_FILTERS: {
      return {
        ...state,
        currentFilters: action.payload,
      };
    }

    case ADD_CANDIDATE:
    case GET_DATA:
    case DATA_EDIT:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_CANDIDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case ADD_CANDIDATE_ERROR:
    case GET_DATA_ERROR:
    case DATA_EDIT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case GET_DATA_EDIT:
      return {
        ...state,
        loading: false,
        isToEdit: true,
        user: action.payload,
      };
    case DATA_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        isToEdit: false,
        user: action.payload,
      };
    default: {
      return state;
    }
  }
}

export default CandidateReducer;
