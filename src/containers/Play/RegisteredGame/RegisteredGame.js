import React, {Component} from  'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Select from 'react-select'
import _ from 'lodash'

import classes from './SelectGame.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions';
import { checkValidity, getUniqueGameNamesFromTeamProps, getFirstNamesFromTeamsProps, getUniqueArray } from '../../../Shared/utility';
import { optionsAvailable } from '../../../Shared/optionsAvailable'

class RegisteredGame extends Component {
    state = {
        formIsValid: false,
        selectedGame: '',
        selectedTeam: '',
        gameOptionTouched: false,
        teamOptionTouched: false,
        noTeamOptions: false,
        noGameOptions: false,
        redirect: false,
        redirectHome:false,
    }

    getHandsFromSelectedGame = (selectedGame) => {
        // console.log(selectedGame)
        // console.log(this.props.games)
        // console.log(this.props.games.find(x => x.b === selectedGame.game))
        const gamesUnique = getUniqueArray(this.props.games)
        // console.log(gamesUnique)
        // console.log(gamesUnique.find(x => x.game === selectedGame.game).hands)
        // console.log(_.find(gamesUnique, function(o) { return o.game === selectedGame }))
        return _.find(gamesUnique, function(o) { return o.game === selectedGame }).hands
    }

    handleChange = (selectedOption, optionMeta) => {
        // console.log(selectedOption)
        // console.log(optionMeta)
        switch(optionMeta.name){
            case "selectedGame":
                if(checkValidity(selectedOption.value, {changed: true})){
                    this.setState(
                        {
                            selectedGame: selectedOption.value, 
                            gameOptionTouched: true
                        }, () => {
                            const formIsValid = this.state.gameOptionTouched && this.state.teamOptionTouched
                            this.setState({ formIsValid })
                        })
                }
                break
            case "selectedTeam":
                if(checkValidity(selectedOption.value.toString(), {changed: true})){
                    this.setState(
                        {
                            selectedTeam: selectedOption.value, 
                            teamOptionTouched: true
                        }, () => {
                            const formIsValid = this.state.gameOptionTouched && this.state.teamOptionTouched
                            this.setState({ formIsValid })
                        })
                }
                break
            default:
                console.log('ERROR - SELECTED OPTION OUT OF RANGE')
        }
    }

    registedGamePlayHandler = (event) => {
        event.preventDefault();
        console.log(this.props.games)
        const scoreCard = {
            game: this.state.selectedGame,
            players: this.state.selectedTeam,
            hands: this.getHandsFromSelectedGame(this.state.selectedGame),
            registered: this.props.registered,
            history: this.props.history,
            games: this.props.games
        }
        console.log(scoreCard)
        this.props.onNewScoreCard(scoreCard);
        this.setState(this.state); 
        this.setState({redirect: true}); 
    }

    componentDidMount(props) {
        // console.log(localStorage.getItem("token"))
        // console.log(this.props.tokenId)
        // console.log(localStorage.getItem("userId"))
        // console.log(this.props.userId)
        // this.props.onFetchGames(localStorage.getItem("tokenId"), localStorage.getItem("userId")) 
        this.props.onFetchGames(this.props.tokenId, this.props.userId) 
        this.props.onFetchGameHistory(this.props.tokenId, this.props.userId) 
        this.props.onFetchTeams(this.props.tokenId, this.props.userId)

      }

       quitHandler = () => {
        this.setState({redirectHome: true})
    }
      
    render() {
        // console.log(actions)
        let noGameOptions = optionsAvailable(this.props.games, this.props.location.state, 'returnGameToPlay', this.props)
        let noTeamOptions = optionsAvailable(this.props.teams, this.props.location.state, 'returnTeamToPlay', this.props)

        const gameOptions = []
        if (!noGameOptions) {
            let uniqueGames = []
            this.props.games !== null && this.props.games.length > 0 ?
                uniqueGames = getUniqueGameNamesFromTeamProps(this.props.games) : uniqueGames = []

            uniqueGames.map((item, index) => {
                gameOptions.push({value: item, label: item})
                return gameOptions
            })
        }

        const teamOptions = []
        if (!noTeamOptions) {
            // console.log( this.props.teams)
            let teamsFirstNames = []
            this.props.teams !== null && this.props.teams.length > 0 ?
                teamsFirstNames = getFirstNamesFromTeamsProps(this.props.teams) : teamsFirstNames = []

            teamsFirstNames.map((item, index) => {
                teamOptions.push({value: item, label: item.toString().replace(/,/g, ', ')})
                return teamOptions
            })
        }

        const customStyles = {
            option: (provided, state) => ({
                ...provided,
                width: 400,
                padding: 0,
            }),
            control: (provided, state) => ({
                ...provided,
                padding: 0,
                
                width: 400,
                align: 'center',
                margin: 'auto',
                marginBottom: 10,
            }),
            singleValue: (provided, state) => {
              return { ...provided };
            }
          }

        let form = (
            <form onSubmit={this.registedGamePlayHandler}> 
            <div>
                <Select
                    styles={customStyles}
                    name="selectedGame"
                    placeholder="...select a game"
                    value={this.selectedOption}
                    onChange={this.handleChange}
                    options={gameOptions}
                    // onFocus={this.handleOnFocus}
                />
            </div>
            <div>
                <Select
                    styles={customStyles}
                    name="selectedTeam"
                    placeholder="...select a team"
                    value={this.selectedOption}
                    onChange={this.handleChange}
                    options={teamOptions}
                    // onFocus={this.handleOnFocus}
                />
            </div>
                <Button btnType="Danger" clicked={this.quitHandler}>QUIT</Button>
                <Button btnType="Success" disabled={!this.state.formIsValid} >CONTINUE TO SCORECARD</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }

        return (
            <div className={classes.SelectGame}>
                <h1>Play</h1>
                <p className={classes.Instructions}>Select game then team.</p>
                <p>{this.state.selectedGame} {this.state.selectedTeam}</p>
                {this.state.redirect?<Redirect to="/scorecard" />:null}
                {noTeamOptions?<Redirect to='/newTeam' />:null}
                {noGameOptions?<Redirect to='/newGame' />:null}
                {this.state.redirectHome?<Redirect to="/home" />:null}
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        game: state.scoreCard.game,
        registered: state.scoreCard.registered,

        games: state.games.games,
        history: state.history.history,
        teams: state.teams.teams,
        tokenId: state.auth.idToken,
        userId: state.auth.localId,
        noTeamOptions: state.teams.noTeamOptions
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onNewScoreCard: (scoreCard) => dispatch(actions.makeScoreCard(scoreCard)),
        onAddGameResult: (scoreCard) => dispatch(actions.addGameResult(scoreCard)),
        onFetchGames: (tokenId, userId) => dispatch( actions.initGames(tokenId, userId)),
        onFetchGameHistory: (tokenId, userId) => dispatch( actions.initHistory(tokenId, userId)),
        onFetchTeams: (tokenId, userId) => dispatch( actions.initTeams(tokenId, userId)),
    };
};

 export default connect(mapStateToProps, mapDispatchToProps)(RegisteredGame);
 