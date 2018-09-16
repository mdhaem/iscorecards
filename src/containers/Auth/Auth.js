import React, {Component} from 'react';
import {connect} from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions';



class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'eMail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false,
        formIsValid: false,
        clickedSubmit: ''
        
    }

    checkValidity(value, rules) {
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

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true

            }
        };

        this.setState({controls: updatedControls});   
    }

    submitHandler = (event) => {
        console.log('EVENT', event);
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = (value) => {
        this.setState({isSignup: value}); 
    }

    handleClick = (e) => {
        console.log(e.target);
        const clickedButton = e.target;
        console.log(typeof clickedButton);
        console.log(clickedButton.toString());
        
        //const isSignup = clickedButton.includes("REGISTER");
        //console.log(isSignup);
        this.setState({ clickedSubmit: e.target.id },() => {
          console.log(this.state.clickedSubmit)
        });
      }

    render () {
        console.log(this.state.controls);
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        if(this.props.loading) {
            form = <Spinner />
        };

        let errorMessage = null;
        console.log(this.props);
        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error}</p>
            );
        };

        return (
            <div className={classes.Auth}>
                <div><h1>Register/Login</h1></div>
                <p>To LOGIN enter email and passwork then click LOGIN.</p>
                <p>To register, enter your email address and a password, click SIGNUP to regester, then click LOGIN.</p>
                <div>{errorMessage}</div>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button id="login" btnType="Success">LOGIN</Button>
                </form>
                <Button id="register" clicked={() => this.switchAuthModeHandler(true)} btnType="Danger">{this.state.isSignup ? '' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.authAction(email, password, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);