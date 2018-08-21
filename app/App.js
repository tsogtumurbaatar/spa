import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import {HeaderMenuUser} from './HeaderMenuUser'; 

class App extends React.Component {
	render()
	{
		return(
			<div className="col-md-12">
			<HeaderMenuUser />
			{this.props.children}
			</div>
			)
	}
}

App.propsTypes = {
	children:PropTypes.object.isRequired
};

export default App;