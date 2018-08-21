import React from 'react';
import {UserInfoForm} from './UserInfoForm';
import {connect} from 'react-redux';
import { saveUserInfo } from './userinfo';

const getUserId = (props) =>
{
	if(props.params.userid)
	return props.params.userid
	else
	return ;	
}

const mapDispatchToProps = (dispatch) =>{
	return {
		handleSaveEvent:(userinfo) => 	{ dispatch(saveUserInfo(userinfo))},
	}
}

const mapStateToProps = (state, props) =>{
	return {
		userinfoidToProps:getUserId(props),
		activeUserInfoToProps:state.userinfo.activeUserInfo,
		userToProps:state.user
	}
}

export default connect( 
	mapStateToProps,
	mapDispatchToProps
	)(UserInfoForm)