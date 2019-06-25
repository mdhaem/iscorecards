import React, {Component} from  'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import classes from './NewPlayer.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions';
import {checkValidity} from '../../../Shared/utility';

class newPlayer extends Component {
  state = {
      newPlayerForm: {
          firstName: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: '...enter player first name'
              },
              value: '',
              validation: {
                  required: true
              },
              valid: false,
              errorMessage: 'Players first name is required...',
              touched: false,
          },
          lastName: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: '...enter player last name\'s'
              },
              value: '',
              validation: {
                  required: true,
              },
              valid: false,
              errorMessage: 'Players last name is required.',
              touched:false,
          },
      },
      formIsValid: false,
      redirect: false,
      fullName: '',
      returnHome: false
  }

  inputChangedHandler = (event, inputIdentifier) => {
      //alert('inputChangeHandler called');
      // console.log(event.target.value, inputIdentifier);
      const updatedNewPlayerForm = {
          ...this.state.newPlayerForm
      };
      const updatedFormElement = { 
          ...updatedNewPlayerForm[inputIdentifier]
      };
      updatedFormElement.value = event.target.value;

      // console.log(updatedFormElement.value);
      // console.log(updatedFormElement.validation);
      updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
      updatedFormElement.touched = true
      // console.log(updatedFormElement.valid);
      updatedNewPlayerForm[inputIdentifier] = updatedFormElement;
      
      let formIsValid = true;
      // console.log(updatedSelectGameForm[inputIdentifier])

      //updatedSelectGameForm[inputIdentifier].config.valid ? updatedSelectGameForm[inputIdentifier].config.errorMessage =  

      for (let inputIdentifier in updatedNewPlayerForm) {
          formIsValid = updatedNewPlayerForm[inputIdentifier].valid && formIsValid;
      }


      //const formIsValid = updatedSelectGameForm['gameName'].valid && updatedSelectGameForm['players'].valid;
      console.log(updatedNewPlayerForm);
      this.setState({newPlayerForm: updatedNewPlayerForm, formIsValid: formIsValid}, () => console.log(this.state.newPlayerForm));
      //console.log(this.state);
  }

  newPlayerHandler = (event) => {
    event.preventDefault();
    console.log('user: ',this.props.userId)
    console.log('firstName: ',this.state.newPlayerForm.firstName.value)
    console.log('lastName: ',this.state.newPlayerForm.lastName.value)
    newPlayer = {
        user: this.props.userId,
        firstName: this.state.newPlayerForm.firstName.value,
        lastName: this.state.newPlayerForm.lastName.value,
        fullName: this.state.newPlayerForm.firstName.value + ' ' + this.state.newPlayerForm.lastName.value
    }
    console.log(newPlayer.fullName);
    this.setState({fullName: newPlayer.fullName});
    this.props.onAddPlayer(newPlayer, this.props.tokenId);
    // this.setState({returnToNewTeam: true})
  }

  handleCancel = () => {
    this.setState({ returnHome: true })
  }

  render() {
    let addMessage = null;
    console.log(this.state.fullName);
    if(this.state.fullName !== '') {
        addMessage = (
            <p>{this.state.fullName}  successfuly added.</p>
        )
    }  

    //   const errorMessageStyle = {
    //       color: 'red',
    //       fontSize: 'small'
    //   }
      const formElementsArray = [];
      for (let key in this.state.newPlayerForm) {
          formElementsArray.push({
              id: key,
              config: this.state.newPlayerForm[key]
          });
      }
      // console.log(formElementsArray)
      let form = (
          <form onSubmit={this.unregistedGamePlayHandler}>
              {formElementsArray.map(formElement => (
                  <div key={formElement.id}>
                      <Input 
                          //key={formElement.id}
                          elementType={formElement.config.elementType}
                          elementConfig={formElement.config.elementConfig}
                          value={formElement.config.value}
                          invalid={!formElement.config.valid}
                          shouldValidate={formElement.config.validation}
                          touched={formElement.config.touched}
                          changed={(event) => this.inputChangedHandler(event, formElement.id)} 
                      />
                  {!formElement.config.touched || 
                  (formElement.config.valid && formElement.config.touched) 
                  ? null : formElement.config.errorMessage}
                  </div>
              ))}
              {this.state.returnHome?<Redirect to='/Home' />:null} 
              <Button type="button" btnType="Danger" clicked={this.handleCancel}>CANCEL</Button>
              <Button btnType="Success" clicked={this.newPlayerHandler} disabled={!this.state.formIsValid}>SAVE</Button>
          </form>
      );
      if ( this.props.loading ) {
          form = <Spinner />;
      }

      return (
          <div className={classes.NewPlayer}>
              <h1>New Player</h1>
              <p className={classes.Instructions}>Enter the first and last firstName of your new player.</p>
              {addMessage}{this.fullName}
              {form}
          </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    //   game: state.scoreCard.game,
    //   players: state.scoreCard.players,
    //   registered: state.scoreCard.registered
    userId: state.auth.localId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlayer: (newPlayer, tokenId) => dispatch(actions.addNewPlayer(newPlayer, tokenId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(newPlayer);