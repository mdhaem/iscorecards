import React, {Component} from  'react';

import classes from './UnregisteredGame.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class UnregisteredGame extends Component {
    state = {
        unregisteredGameForm: {
            
            gameName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '...enter game name'
                },
                value: '',
                validation: {
                    reguired: true
                },
                valid: false,
            },
            hands: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '...chose number of hands', displayValue: '...chose number of hands'},
                        {value: 'Mike, Sandy', displayValue: 'Mike, Sandy'}
                    ]
                },
                value: 8,
                validation: {
                    changed: true
                },
                valid: false
            }
        },
        formIsValid: false
    }
    
    checkValidity(value, rules) {
        //console.log(value, rules);
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if(rules.changed) {
            isValid = value.includes('...chose a');
        }
        
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //console.log(event, inputIdentifier);
        const updatedSelectGameForm = {
            ...this.state.unregisteredGameForm
        };
        const updatedFormElement = { 
            ...updatedSelectGameForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;

        //console.log(updatedFormElement.value);
        //console.log(updatedFormElement.validation);
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation.changed);
        //console.log(updatedFormElement.valid);
        updatedSelectGameForm[inputIdentifier] = updatedFormElement;
        
        const formIsValid = updatedSelectGameForm['gameName'].valid && updatedSelectGameForm['hands'].valid;
        //console.log(formIsValid);
        this.setState({unregisteredGameForm: updatedSelectGameForm, formIsValid: formIsValid});
        //console.log(this.state);
    }

    createOptions = () => {
        const handOptions = [];
        for (let i = 1; i < 13; i++) { 
            handOptions.push({value: i, displayValue: i});
        } 
        return handOptions;
    }
        
    componentDidMount() {
        const newState = this.state;
        // console.log(newState);
        // console.log(this.createOptions());
        newState.unregisteredGameForm.hands.elementConfig.options = this.createOptions();
        // console.log(newState);
        this.setState({unregisteredGameForm: newState.unregisteredGameForm});
        // console.log(this.state.newGameForm);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.unregisteredGameForm) {
            formElementsArray.push({
                id: key,
                config: this.state.unregisteredGameForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Danger">CANCEL</Button>
                <Button btnType="Success" disabled={!this.state.formIsValid}>SAVE</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }

        return (
            <div className={classes.SelectGame}>
                <h1>Play</h1>
                <p className={classes.Instructions}>Select game then team.</p>
                {form}
            </div>
        );
    }
}

 export default UnregisteredGame;