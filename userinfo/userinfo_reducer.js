import * as types from './userinfo';
const initial_state = {
 activeUserInfo:{userinfo:null, error:null, loading:false, updated:false},
}

export const userinfo = (state= initial_state, action) =>{
  let error;
  switch(action.type) {

    case types.RESET_USERINFOS:
    return state;

    case types.FETCH_USERINFO:
    return Object.assign( {}, state, {activeUserInfo: Object.assign( {}, state.activeUserInfo, {error:null, loading: true})})

    case types.FETCH_USERINFO_SUCCESS:
    return Object.assign( {}, state, {activeUserInfo: {userinfo:action.payload, error:null, loading: false}})

    case types.FETCH_USERINFO_FAILURE:
    error = action.payload 
    return Object.assign({},state, {activeUserInfo: {userinfo:null, error:error, loading: false}})

    case types.RESET_FETCH_USERINFO:
    return Object.assign({}, state, {activeUserInfo:{userinfo:null, error:null, loading: false,updated:false}})  


    case types.SAVE_USERINFO:
    return Object.assign( {}, state, {activeUserInfo: Object.assign( {}, state.activeUserInfo, {error:null, loading: true, updated:false})})

    case types.SAVE_USERINFO_SUCCESS:
    return Object.assign( {}, state, {activeUserInfo: {userinfo:action.payload, error:null, loading: false, updated:true}})

    case types.SAVE_USERINFO_FAILURE:
    error = action.payload 
    return Object.assign({},state, {activeUserInfo: {userinfo:null, error:error, loading: false, updated:false}})

    case types.RESET_SAVE_USERINFO:
    return Object.assign({}, state, {activeUserInfo:{userinfo:null, error:null, loading: false, updated:false}})  

    default:
    return state
  }
}		