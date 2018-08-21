import { SignInForm } from './SignInForm.js';
import { connect } from 'react-redux';
import { signInUser, resetUser } from './users';


const mapDispatchToProps = (dispatch) => {
  return {
   signInUser :(inputs) =>  dispatch(signInUser(inputs)),
   resetUser :() =>	dispatch(resetUser())
  }
}

function mapStateToProps(state, ownProps) {
  return { 
    user: state.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);