import React from 'react';

class ConfirmPage extends React.Component{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return(
			<div className="welcometext">
			Confirmation an email has been sent to - {this.props.params.email}. 
			<br/>If the email is not in Inbox, please check in spam, social or promotions folders.
			</div>
			)
	}	
}

export default ConfirmPage