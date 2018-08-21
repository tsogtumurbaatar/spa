import {
  ME_FROM_TOKEN, ME_FROM_TOKEN_SUCCESS, ME_FROM_TOKEN_FAILURE, RESET_TOKEN,
	SIGNUP_USER, SIGNUP_USER_START, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE, RESET_USER,
	SIGNIN_USER, SIGNIN_USER_START, SIGNIN_USER_SUCCESS,  SIGNIN_USER_FAILURE,
	LOGOUT_USER, UPDATE_USER_EMAIL
} from './users';

const INITIAL_STATE = {user: null, status:null, error:null, loading: false};

export const user = (state = INITIAL_STATE, action)=> {
  let error;
  switch(action.type) {
    case ME_FROM_TOKEN:
    return Object.assign({}, state, {user: null, status:'storage', error:null, loading: true}); 
    case ME_FROM_TOKEN_SUCCESS:
    return Object.assign({}, state, {user: action.payload.user, status:'authenticated', error:null, loading: false}); //<-- authenticated
    case ME_FROM_TOKEN_FAILURE:
     error = action.payload.data || {message: action.payload.message};   
    return Object.assign({}, state, {user: null, status:'storage', error:error, loading: false});
    case RESET_TOKEN:
    return Object.assign({}, state, {user: null, status:'storage', error:null, loading: false});

     
    case SIGNUP_USER:
    return Object.assign({}, state, {user: null, status:'signup', error:null, loading: true}); 
    case SIGNUP_USER_START:
    return Object.assign({}, state, {user: null, status:'signup', error:null, loading: true}); 
    case SIGNUP_USER_SUCCESS:
    return Object.assign({}, state, {user: action.payload.user, status:'authenticated', error:null, loading: false}); //<-- authenticated
    case SIGNUP_USER_FAILURE:
    error = action.payload || {message: action.payload}; 
    return Object.assign({}, state, {user: null, status:'signup', error:error, loading: false});


    case SIGNIN_USER:
    return Object.assign({}, state, {user: null, status:'signin', error:null, loading: true}); 
    case SIGNIN_USER_START:
    return Object.assign({}, state, {user: null, status:'signin', error:null, loading: true}); 
    case SIGNIN_USER_SUCCESS:
    return Object.assign({}, state, {user: action.payload.user, status:'authenticated', error:null, loading: false}); 
    case SIGNIN_USER_FAILURE:
    error = action.payload || {message: action.payload};    
    return Object.assign({}, state, {user: null, status:'signin', error:error, loading: false});


    case LOGOUT_USER:
      return Object.assign({}, state, {user:null, status:'logout', error:null, loading: false});

    case RESET_USER:
    return Object.assign({}, state, {user: null, status:null, error:null, loading: false});
    
    default:
    return state;
  }
}