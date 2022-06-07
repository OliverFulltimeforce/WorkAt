/* ENDPOINTS FROM LINK 1 */
export const CREATE_CANDIDATE = '/candidate';

/* ENDPOINTS FROM LINK 2 */
export const POST_CANDIDATE = '/candidate';

/* ENDPOINTS FROM ADMIN */
export const POST_FEED = '/candidate/conclusions';

export const GET_ALL_CANDIDATES = '/candidate';
export const GET_ALL_CANDIDATES_FILTERED = '/candidate/filter';
export const UPDATE_STATUS = '/candidate/status';
export const GENERATE_URL = '/candidate/url';
export const SEND_VIDEO = '/candidate/video';
export const UPDATE_INFO = '/candidate';

export const GET_ALL_POSITIONS = '/position';
export const CREATE_POSITION = '/position';
export const UPDATE_POSITION = '/position';
export const SET_IS_ACTIVE = '/position/status';
export const DELETE_POSITION = '/position';

export const UPDATE_CONCLUSION = '/candidate/conclusions';
export const VALIDATE_TOKEN = '/candidate/url/validate';

/* ENDPOINTS FROM LOGIN */
export const GET_ALL_USERS = '/users';
export const LOGIN_USER = '/users/signIn';
export const LOGOUT_USER = '/users/signOut';
export const REFRESH_TOKENS = '/users/token/refresh';
export const UPDATE_USER = '/users';
export const DELETE_USER = '/users';
