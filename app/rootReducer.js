import {combineReducers} from 'redux';
import {user} from '../user/user_reducer';
import {userinfo} from '../userinfo/userinfo_reducer';

const rootReducer = combineReducers({
	user : user,
	userinfo : userinfo
})

export default rootReducer