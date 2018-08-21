import React from 'react';
import {connect} from 'react-redux';
import { logoutUser } from '../user/users';
import { Link } from 'react-router';

import { hashHistory } from 'react-router';
var divStyleBottom = {
  paddingBottom: 7,
  paddingTop:7
};

const mapDispatchToProps = (dispatch) =>{
	return {
		logoutUser:() => dispatch(logoutUser())
	}
}


const mapStateToProps = (state) =>{
	return {
		userToProps:state.user
	}
}

class HeaderMenuUserComponent extends React.Component{
	constructor(props){
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout()
	{
		var result = confirm("Want to Logout?");
		if (result) {
		this.props.logoutUser();
		hashHistory.push('/');
		}
	}

	render()
	{
		if(this.props.userToProps.status!='authenticated')
			return (
				<nav className="navbar navbar-inverse">
				 <div className="container-fluid">
				<ul className="nav navbar-nav navbar-right">
				<li><Link to="/"><span className="glyphicon glyphicon-home"></span> Home</Link></li>
				<li><Link to="/signup"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
				<li><Link to="/signin"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
				<li>&nbsp;&nbsp;&nbsp;&nbsp;</li>
				</ul>
				</div>
				</nav>
				)
		else
			return (
				<nav className="navbar navbar-inverse">
				 <div className="container-fluid">
				<ul className="nav navbar-nav navbar-right">
				<li><Link to="/"><span className="glyphicon glyphicon-home"></span> Home</Link></li>
				<li className="dropdown"><a><span className="glyphicon glyphicon-user"></span> {this.props.userToProps.user.name} <span className="caret"></span></a>
				<ul className="dropdown-content1 dropdown-menu">
				<li style={divStyleBottom}><Link to="/dashboard"><span className="glyphicon glyphicon-home"></span> Dashboard</Link></li>
				<li style={divStyleBottom}><a onClick={this.handleLogout}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
				
				</ul>
				</li>
				<li>&nbsp;&nbsp;&nbsp;&nbsp;</li>
				</ul>
				</div>
				</nav>
				)

	}
}

export const HeaderMenuUser =  connect( 
	mapStateToProps,
	mapDispatchToProps
	)(HeaderMenuUserComponent)