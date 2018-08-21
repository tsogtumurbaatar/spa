export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';


export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_START = 'SIGNUP_USER_START';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';
export const RESET_USER = 'RESET_USER';


export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_START = 'SIGNIN_USER_START';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';

export const UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL';

export const LOGOUT_USER = 'LOGOUT_USER';

export function meFromToken(tokenFromStorage) {
  return (dispatch) => {
    return fetch('api/details', { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+ tokenFromStorage
      }
    })
    .then( response => Promise.all([response, response.json()]))
    .then(([response, json]) =>{
      if(response.status === 200){
        dispatch(meFromTokenSuccess(json.success));
      }
      else{
        dispatch(meFromTokenFailure(json.error))
      }
    })
  }
}

export function meFromTokenSuccess(currentUser) {
  return {
    type: ME_FROM_TOKEN_SUCCESS,
    payload: currentUser
  };
}

export function meFromTokenFailure(error) {
  return {
    type: ME_FROM_TOKEN_FAILURE,
    payload: error
  };
}


export function resetToken() {
  return {
    type: RESET_TOKEN
  };
}


export function signUpUser(formValues) {  return (dispatch) => {
    dispatch(signUpUserStart());
    return fetch('api/register', { method: 'POST',
      body: JSON.stringify({ email : formValues.email,
                             password : formValues.password,
                             c_password : formValues.c_password,
                             name: formValues.name
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then( response => Promise.all([response, response.json()]))
    .then(([response, json]) =>{
      if(response.status === 200){
       sessionStorage.setItem('jwtToken', json.success.token);
       sessionStorage.setItem('jwtUserName', json.success.user.name);
       sessionStorage.setItem('jwtUserID', json.success.user.id);
        dispatch(signUpUserSuccess(json.success));
      }
      else{
        dispatch(signUpUserFailure(json.error))
      }
    })
  }
}

export function signUpUserStart() {
  return {
    type: SIGNUP_USER_START
  };
}

export function signUpUserSuccess(user) {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: user
  };
}

export function signUpUserFailure(error) {
  return {
    type: SIGNUP_USER_FAILURE,
    payload: error
  };
}


export function resetUser() {
  return {
    type: RESET_USER,
  };
}

export function signInUserStart(user) {
  return {
    type: SIGNIN_USER_START,
  };
}

export function signInUser(formValues) {
  return (dispatch) => {
    dispatch(signInUserStart());
    return fetch('api/login', { method: 'POST',
      body: JSON.stringify({ email : formValues.email,
                             password : formValues.password
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then( response => Promise.all([response, response.json()]))
    .then(([response, json]) =>{
      if(response.status === 200){
        sessionStorage.setItem('jwtToken', json.success.token);
        sessionStorage.setItem('jwtUserName', json.success.user.name);
        sessionStorage.setItem('jwtUserID', json.success.user.id);
        dispatch(signInUserSuccess(json.success));
      }
      else{
        dispatch(signInUserFailure(json.error))
      }
    })
  }
}

export function signInUserSuccess(user) {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: user
  };
}

export function signInUserFailure(error) {
  return {
    type: SIGNIN_USER_FAILURE,
    payload: error
  };
}

export function logoutUser() {
  sessionStorage.removeItem('jwtToken');
  sessionStorage.removeItem('jwtUserName');
  sessionStorage.removeItem('jwtUserID'); 
  return {
    type: LOGOUT_USER
  };
}
export function updateUserEmail(email) {
  return {
    type: UPDATE_USER_EMAIL,
    payload:email
  };
}
