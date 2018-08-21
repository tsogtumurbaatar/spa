import { SignUpForm } from './SignUpForm.js';
import { connect } from 'react-redux';
import { signUpUser, resetUser } from './users';


const mapDispatchToProps = (dispatch) => {
  return {
   signUpUser :(inputs) =>  dispatch(signUpUser(inputs)),
   resetUser :() =>	dispatch(resetUser())
  }
}

function mapStateToProps(state, ownProps) {
  return { 
    user: state.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);