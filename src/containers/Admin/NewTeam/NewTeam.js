import React, {Component} from  'react';
import {connect} from 'react-redux';
import { reset } from 'redux-form';
//import { UncontrolledAlert } from 'reactstrap';
import axios from '../../../store/axios-data';

import classes from './NewTeam.css';
import Button from '../../../components/UI/Button/Button';
import * as actions from '../../../store/actions';
import FormCode from './NewTeamForm';
import { updateObject } from '../../../Shared/utility'; 

class SelectGame extends Component {
    state = {
        team: [],
        formIsValid: false,
        options: [{value: "selectplayer", displayValue: "...select player"}],
        teamAdded: null
    }
    
    addTeamHandler = (event) => {
        event.preventDefault();
        const newTeam = {
            user: this.props.user,
            team: this.state.team
        }
        this.props.onAddTeam(newTeam, this.props.token);
        this.setState({teamAdded: this.state.team});
        const emptyTeamList = [];
        this.setState({team: emptyTeamList, formIsValid: false});
        this.setState({ state: this.state });
    }

    componentDidMount() {
        const newState = this.state;
        axios.get('/players.json')
          .then(res => {
            const result = Object.keys(res.data).map(i => res.data[i]);
            const playerOptions = [{value: "selectplayer", displayValue: "...select player"}];
            result.map((player) => {
                return playerOptions.push({value: player.fullName, displayValue: player.fullName});
            });
            newState.options = playerOptions;
            updateObject( this.state, newState );
            this.setState(this.state); 
          });
      }

    handleNameSelect = (event, newValue, previousValue, name) => {
        console.log(newValue)
        const originalTeam = this.state.team;
        if(!originalTeam.includes(newValue)){
            originalTeam.push(newValue);
        } else {
            alert('Duplicate player, ' + newValue);
        }
        
        const formIsValid = originalTeam.length >= 2 ? true : false;
        this.setState({team: originalTeam, formIsValid});
        console.log(this.state.team);
      }

    handleCancel = () => {
        this.props.cancelNewTeam();
        reset();
    }

    render() {
        
        let form;
        if ( this.props.teamAdded ) {
            let teamName = '';
            this.state.teamAdded.map((name) => {
                let words = name.split(' ');
                if(teamName.length !== 0){
                    teamName = teamName + ', ' + words[0];
                } else {
                    teamName = words[0];
                }
                teamName = teamName.trim();
                return teamName
            })
            form = <p>Team "{teamName}" sucessfully added.</p>;
        }

        return (
            
            <div className={classes.NewTeam}>
                <h1>New Team</h1>
                <p className={classes.Instructions}>To create a new team, select two or more members from the players list.</p>
                {form}
                <FormCode 
                    options={this.state.options}
                    team={this.state.team}
                    changed={this.handleNameSelect} 
                    newTeam ={this.state.team}/> 
                
                <form id="newTeam" ref="newTeam" >
                <p className={classes.ListHeader} selected="selected">Selected Team Members:</p>
                <ol className={classes.ol} defaultValue='selectplayer'>
                    {
                            this.state.team.map((name, index) => {
                            return (<li key={index}>{name}</li>);})
                    }
                </ol>
                <Button btnType="Success" clicked={this.addTeamHandler} disabled={!this.state.formIsValid}>SAVE</Button>
                <Button btnType="Danger" clicked={this.handleCancel}>CANCEL</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.localId,
        token: state.auth.idToken,
        teamAdded: state.newTeam.teamAdded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddTeam: (newTeam, token) => dispatch(actions.addNewTeam(newTeam, token)),
        cancelNewTeam: () => dispatch(actions.cancelNewTeam())
    };
};

 export default connect(mapStateToProps, mapDispatchToProps)(SelectGame);