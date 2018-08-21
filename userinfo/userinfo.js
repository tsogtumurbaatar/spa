export const RESET_USERINFOS = 'RESET_USERINFOS';

export const FETCH_USERINFO = 'FETCH_USERINFO';
export const FETCH_USERINFO_SUCCESS = 'FETCH_USERINFO_SUCCESS';
export const FETCH_USERINFO_FAILURE = 'FETCH_USERINFO_FAILURE';
export const RESET_FETCH_USERINFO = 'RESET_USERINFO';

export const SAVE_USERINFO = 'SAVE_USERINFO';
export const SAVE_USERINFO_SUCCESS = 'SAVE_USERINFO_SUCCESS';
export const SAVE_USERINFO_FAILURE = 'SAVE_USERINFO_FAILURE';
export const RESET_SAVE_USERINFO = 'RESET_SAVE_USERINFO';


export function fetchUserInfo(userinfoid) {
	return (dispatch) => {
		const token = sessionStorage.getItem('jwtToken');
		   if(!token || token === '') {
		    window.alert('Unauthenticated');
		    return;
		   }

		dispatch(fetchUserInfoStart())
		return fetch('api/userinfo/fetch', { method: 'POST',
			body: JSON.stringify({  userid : userinfoid,}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization':'Bearer '+ token
			}
		})
		.then( response => Promise.all([response, response.json()]))
		.then(([response, json]) =>{
			if(response.status === 200){
				dispatch(fetchUserInfoSuccess(json))
			}
			else{
				dispatch(fetchUserInfoFailure())
			}
		})
	}
}

export function fetchUserInfoStart() {
  return {
    type: FETCH_USERINFO
  };
}

export function fetchUserInfoSuccess(posts) {
  return {
    type: FETCH_USERINFO_SUCCESS,
    payload: posts
  };
}

export function fetchUserInfoFailure(error) {
  return {
    type: FETCH_USERINFO_FAILURE,
    payload: error
  };
}

export function fetchUserInfoReset() {
  return {
    type: RESET_FETCH_USERINFO
  };
}

export function saveUserInfo(userinfo) {
	return (dispatch) => {
		const token = sessionStorage.getItem('jwtToken');
		   if(!token || token === '') {
		    window.alert('Unauthenticated');
		    return;
		   }
		

		dispatch(saveUserInfoStart())
		return fetch('api/userinfo/save', { method: 'POST',
			body: JSON.stringify({  userid : userinfo.userid,
									name : userinfo.name,
								   password : userinfo.password,	
								   mobile : userinfo.mobile,
								   gender : userinfo.gender,
								   address : userinfo.address,
								   fileurl : userinfo.fileurl
			}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization':'Bearer '+ token
			}
		})
		.then( response => Promise.all([response, response.json()]))
		.then(([response, json]) =>{
			if(response.status === 200){
				dispatch(saveUserInfoSuccess(json));
			}
			else{
				dispatch(saveUserInfoFailure())
			}
		})
	}
}

export function saveUserInfoStart() {
  return {
    type: SAVE_USERINFO
  };
}

export function saveUserInfoSuccess(posts) {
  return {
    type: SAVE_USERINFO_SUCCESS,
    payload: posts
  };
}

export function saveUserInfoFailure(error) {
  return {
    type: SAVE_USERINFO_FAILURE,
    payload: error
  };
}

export function saveUserInfoReset() {
  return {
    type: RESET_SAVE_USERINFO
  };
}