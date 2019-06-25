import React, {Component} from  'react';
import {connect} from 'react-redux';
// import { reset } from 'redux-form';
import {Redirect} from 'react-router-dom';
// import axios from '../../../store/axios-data';

import classes from './NewTeam.css';
import Button from '../../../components/UI/Button/Button';
import * as actions from '../../../store/actions';
import FormCode from './NewTeamForm';
// import { updateObject } from '../../../Shared/utility'; 
import { optionsAvailable } from '../../../Shared/optionsAvailable'

class SelectGame extends Component {
    state = {
        team: [],
        formIsValid: false,
        options: {value: "selectplayer", displayValue: "...select player"},
        teamAdded: null,
        returnTeamToPlay: false,
        returnHome: false
    }
    
    addTeamHandler = (event) => {
        event.preventDefault();
        const newTeam = {
            user: this.props.userId,
            team: this.state.team
        }
        this.props.onAddTeam(newTeam, this.props.token);
        this.setState({teamAdded: this.state.team});
        const emptyTeamList = [];
        this.setState({team: emptyTeamList, formIsValid: false});
        this.setState({returnTeamToPlay: true})
        this.setState({ state: this.state });
    }

    componentDidMount() {
        this.props.onFetchPlayers(this.props.tokenId, this.props.userId)
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
        this.setState({ returnHome: true})
    }

    render() {
        let noPlayerOptions = optionsAvailable(this.props.playerList, this.props.location.state, 'returnNewTeam', this.props)

        let playerOptions = []
        console.log('PLAYERS UNDEFINED: ', typeof this.props.playerList === 'undefined')
        console.log(this.props.playerList)
        if(!noPlayerOptions){
            playerOptions.push(this.state.options);
            this.props.playerList.map((player) => {
                return playerOptions.push({value: player.fullName, displayValue: player.fullName});
            });
        }
        
        let form;
        console.log(this.state.returnToPlay)
        if ( this.props.teamAdded.length > 0) {
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

        let newTeamInstructions = 'To create a new team, select two or more members from the players list.';
        if(typeof this.props.location.state !== 'undefined') 
            { newTeamInstructions = 'Please create a team to continue.' }
            
        return (
            
        <div className={classes.NewTeam}>
            {console.log(this.state.returnToPlay)}
            {this.state.returnTeamToPlay?<Redirect to={{
                                                pathname: "/rplay",
                                                search: "?returnTeamToPlay=true",
                                                state: { returnTeamToPlay: this.state.returnTeamToPlay }
                                            }}/>:null}

                <h1>New Team</h1>
            <p className={classes.Instructions}>{newTeamInstructions}</p>
                {form}
                <FormCode 
                    options={playerOptions}
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
                {noPlayerOptions?<Redirect to='/newPlayer' />:null}
                {this.state.returnHome?<Redirect to='/Home' />:null}                  
                <Button btnType="Success" clicked={this.addTeamHandler} disabled={!this.state.formIsValid}>SAVE</Button>
                <Button type="button" btnType="Danger" clicked={this.handleCancel}>CANCEL</Button>
                </form>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        playerList: state.playerList.playerList,
        tokenId: state.auth.idToken,
        userId: state.auth.localId,
        teamAdded: state.newTeam.teamAdded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPlayers: (tokenId, userId) => dispatch( actions.initPlayers(tokenId, userId)),
        onAddTeam: (newTeam, tokenId) => dispatch(actions.addNewTeam(newTeam, tokenId)),
        cancelNewTeam: () => dispatch(actions.cancelNewTeam())
    };
};

 export default connect(mapStateToProps, mapDispatchToProps)(SelectGame);