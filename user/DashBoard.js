import React from 'react';
import {connect} from 'react-redux';
import { Link, hashHistory } from 'react-router';
import {  fetchUserInfo , fetchUserInfoReset } from '../userinfo/userinfo';
import { logoutUser } from '../user/users';

var divStyle = {
	paddingBottom: 25
};

const mapDispatchToProps = (dispatch) =>{
	return {
		fetchUserInfo:(userinfo_id) => dispatch(fetchUserInfo(userinfo_id)),
		fetchUserInfoReset:() => dispatch(fetchUserInfoReset()),
		logoutUser:() => dispatch(logoutUser())
	}
}


const mapStateToProps = (state) =>{
	return {
		loading: state.userinfo.activeUserInfo.loading,
		activeUserInfoToProps:state.userinfo.activeUserInfo,
		userToProps:state.user
	}
}


class DashBoardComponent extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			username : '',
			password : '',
			c_password : '',
			email : '',
			gender : '',
			address : '',
			mobile : '',
			confirmed : '',
			fileurl :'images/blank-user.gif'
		}
	}

	componentWillMount()
	{
		
		if(this.props.userToProps.status!='authenticated')
		{
			hashHistory.push('/');
		}

		if(this.props.userToProps.user){
    	this.props.fetchUserInfo(this.props.userToProps.user.id);
  		}

  		if(this.props.userToProps.user)
  		if(this.props.userToProps.user.confirmed!=1) {
			this.props.logoutUser();
			this.props.fetchUserInfoReset();
			hashHistory.push(`/confirm/${this.props.userToProps.user.email}`);
		} 
	}

	componentDidMount()
	{
		window.email_confirm='';
	}

	componentWillReceiveProps(nextProps)
  	{
  		 if(nextProps.activeUserInfoToProps.userinfo)
  		{
  			this.setState({
  			name : nextProps.activeUserInfoToProps.userinfo.name,
			email : nextProps.activeUserInfoToProps.userinfo.email,
			address :nextProps.activeUserInfoToProps.userinfo.address,
			gender : nextProps.activeUserInfoToProps.userinfo.gender,
			mobile : nextProps.activeUserInfoToProps.userinfo.mobile,
  			fileurl : nextProps.activeUserInfoToProps.userinfo.fileurl,
  			confirmed : nextProps.activeUserInfoToProps.userinfo.confirmed,
  			})
  		}
  	}	

	render()
	{		
		

		if(this.props.loading) {
			return <div><h2>User Dashboard</h2><h3>Loading...</h3><img id="imgloading" src="images/giphy.gif"/></div>      
		} 
	
		return(
			<div className="row">
			<div className="col-md-12" style={divStyle}>
			<h1>Hello {this.props.userToProps.user?this.props.userToProps.user.name:''}</h1>
			</div>
			<div className="col-md-4 align-center">
			<img src={this.state.fileurl} className="center_image"/>

			</div>
			
			<div className="col-md-8">
			
			<div className="alert alert-info">
			<b>Username</b> : {this.state.name}
			</div>

			<div className="alert alert-info">
			<b>Email </b> : {this.state.email}
			</div>

			<div className="alert alert-info">
			<b>Mobile</b> : {this.state.mobile}
			</div>
			
			<div className="alert alert-info">
			<b>Organization</b> :	{this.state.gender}
			</div>	
			<div className="alert alert-info">
			<b>Address </b> : {this.state.address}
			</div>

			<Link to={`/user/${this.props.userToProps.user?this.props.userToProps.user.id:''}`} >
          	 Edit
        	</Link>

			</div>
			
		
			
			</div>
			)	
	}
}

export default connect( 
	mapStateToProps,
	mapDispatchToProps
	)(DashBoardComponent)