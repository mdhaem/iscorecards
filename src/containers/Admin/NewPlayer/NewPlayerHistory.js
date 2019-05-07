import React, {Component} from 'react'
import {connect} from 'react-redux';
import { reduxForm, formValueSelector, reset } from 'redux-form'

import classes from './NewPlayer.css';
//import buttonClasses from '../../../components/UI/Button/Button.css';
import * as actions from '../../../store/actions';
import FormCode from './NewPlayerFormF';


class newPlayer extends Component {

    state = {
        fullName: '',
        returnToNewTeam: false
    }

  submit = (values) => {
      alert("submitted");
      console.log(values);
  }

  onSubmit = (data) => {
      newPlayer = {
          user: this.props.user,
          firstName: data.firstName,
          lastName: data.lastName,
          fullName: data.firstName + ' ' + data.lastName
      }
      console.log(newPlayer.fullName);
      this.setState({fullName: newPlayer.fullName});
      this.props.onAddPlayer(newPlayer, this.props.token);
      this.setState({returnToNewTeam: true})

      reset('newPlayer');
  }

  handleCancel = () => {
    this.props.cancelNewPlayer();
    reset();
}

  render() {
    
    let addMessage = null;
    console.log(this.props.playerAdded);
    if(this.props.playerAdded) {
        addMessage = (
            <p>{this.state.fullName}  successfuly added.</p>
        )
    }

    return (
    <div className={classes.NewPlayer}>
      {/* {returnToNewTeam?<Redirect to='/newTeam' />:null} */}
      {this.state.returnToNewTeam?<Redirect to={{
                                                pathname: "/newTeam",
                                                search: "?returnToNewTeam=true",
                                                state: { returnToNewTeam: this.state.returnToNewTeam }
                                            }}/>:null}
        <h1>New Player</h1>
        <p className={classes.Instructions}>Enter the first and last firstName of your new player.</p>
        {addMessage}{this.fullName}
        <FormCode onSubmit={this.onSubmit} />
    </div>
    );
  }
}

// Decorate the form component
newPlayer = reduxForm({
  form: 'newPlayerForm' // a unique name for this form
})(newPlayer);

const selector = formValueSelector('newPlayerForm') // <-- same as form name
newPlayer = connect(
  state => {
    const { firstName, lastName } = selector(state, 'firstName', 'lastName')
    return {
      fullName: `${firstName || ''} ${lastName || ''}`
    }
  }
)(newPlayer)

const mapStateToProps = state => {
        return {
            playerAdded: state.newPlayer.playerAdded,
            user: state.auth.localId,
            token: state.auth.idToken,
        }
    };
    
const mapDispatchToProps = dispatch => {
    return {
        onAddPlayer: (newPlayer, token) => dispatch(actions.addNewPlayer(newPlayer, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(newPlayer);