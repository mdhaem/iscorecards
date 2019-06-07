import React, {Component} from  'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Select from 'react-select'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import * as moment from 'moment'

import classes from './ImportGameHistory.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions';
import { checkValidity, getUniqueGameNamesFromTeamProps, getFirstNamesFromTeamsProps } from '../../../Shared/utility';
import GameScoreHistory from './importGameHistoryScores/importGameHistoryScores.js'
import { resolve } from 'dns';

class RegisteredGame extends Component {
    state = {
        formIsValid: false,
        selectedGame: '',
        selectedTeam: '',
        selectedDate: moment(),
        scores: [],
        gameOptionTouched: false,
        teamOptionTouched: false,
    }

    handleOptionSelect = (selectedOption, optionMeta) => {
        console.log(selectedOption)
        console.log(optionMeta)
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

    handleBlur = (e) => {
        let newScore = this.state.scores
        newScore.push({id: e.target.id, score: e.target.value})
        this.setState({ scores: newScore}) //, () => {console.log(this.state.scores)})
      }

    handleDateChange = date => {
        this.setState({selectedDate: date})
      };

    saveRegisteredGameHistory = (event) => {
        event.preventDefault();
        console.log(this.props.games)
        console.log(this.state.selectedGame)
        let gameObject = {}
        gameObject = this.props.games.find( gh => gh.game === this.state.selectedGame );
        console.log(gameObject)

        let winningScore = {}
        if (typeof(gameObject.winningHand) !== "undefined" && gameObject.winningHand === 'Low Score') {
            winningScore = this.state.scores.reduce((acc, cur) => acc = acc.score*1 < cur.score *1 ? acc : cur, 0)
        } else {
            winningScore = this.state.scores.reduce((acc, cur) => acc = acc.score*1 > cur.score*1 ? acc : cur, 0)
        }

        // const highScore = this.state.scores.reduce((acc, cur) => acc = acc.score > cur.score ? acc : cur, 0)
        // const lowScore = this.state.scores.reduce((acc, cur) => acc = acc.score < cur.score ? acc : cur, 0)

        const  newHistory = {
            user: localStorage.getItem('userId'),
            scoresDate: moment(this.state.selectedDate).format('MM-DD-YYYY'),
            game: this.state.selectedGame,
            team: this.state.selectedTeam,
            scores: this.state.scores,
            winner: winningScore,
            gameNumber: 1
        }
        console.log(newHistory)
        this.props.onAddGameResult(newHistory);
        this.setState(this.state); 
        this.setState({redirect: true}); 
    }

    calculateWinner = (scores) => {
        if(scores.length > 0) {
            const highScore = Math.max.apply(Math, scores.map(function(o) { return o.score; }))
            console.log(scores)
            console.log(highScore)
            return highScore
        }
        
    }

    componentDidMount(props) {
        this.props.onFetchGames(this.props.tokenId, this.props.userId) 
        this.props.onFetchTeams(this.props.tokenId, this.props.userId)
      }

    render() {
        let uniqueGames = []
        this.props.teams.length > 1 ?
            uniqueGames = getUniqueGameNamesFromTeamProps(this.props.games) : uniqueGames = []
console.log(uniqueGames)
        const gameOptions = []
        uniqueGames.map((item) => {
            gameOptions.push({value: item, label: item})
            return gameOptions
        })
        
        let teamsFirstNames = []
        this.props.teams.length > 1 ?
            teamsFirstNames = getFirstNamesFromTeamsProps(this.props.teams) : teamsFirstNames = []
// this.props.teams.length > 0 ? console.log(this.props.teams) : null
        const teamOptions = []
        teamsFirstNames.map((item, index) => {
            teamOptions.push({value: item, label: item.toString().replace(/,/g, ', ')})
            return teamOptions
        })

        const customStyles = {
            option: (provided, state) => ({
                ...provided,
                width: 400,
                padding: 0,
            }),
            control: (provided, state) => ({
                ...provided,
                width: 100,
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
        
          const tableColumns = [
            {
                header: 'Id',
                accessor: 'id'
            },
            {
                header: 'Name',
                accessor: 'name',
                render: props => <input value={props.row.name}  />
            },
            {
                header: 'Score',
                accessor: 'score',
                render: props => <input value={props.row.name}  />
            }
        ]


        let form = (
            <form onSubmit={this.saveRegisteredGameHistory}> 
            <div>
                <Select
                    styles={customStyles}
                    name="selectedGame"
                    placeholder="...select a game"
                    value={this.selectedOption}
                    onChange={this.handleOptionSelect}
                    options={gameOptions}
                />
            </div>
            <div>
                <Select
                    styles={customStyles}
                    name="selectedTeam"
                    placeholder="...select a team"
                    value={this.selectedOption}
                    onChange={this.handleOptionSelect}
                    options={teamOptions}
                />
            </div>
            <div>{this.state.selectedTeam.length > 0 ?
                 <GameScoreHistory 
                    team={this.state.selectedTeam} 
                    // changed={this.scoreInputChangeHandler}
                    blur={this.handleBlur}
                    /> : null}
            </div>
                <Button btnType="Danger">CANCEL</Button>
                <Button btnType="Success" disabled={!this.state.formIsValid}>SAVE</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }

        return (
            <React.Fragment>

            <div className={classes.ImportGameHistory}>
                <h1>Import Scores</h1>
                <p className={classes.Instructions}>Select game then team.</p>
                <DatePicker selected={this.state.selectedDate} value={this.state.selectedDate} onChange={this.handleDateChange}/>

                <p>{this.state.selectedGame} {this.state.selectedTeam}</p>
                {this.state.redirect?<Redirect to="/scorecard" />:null}
                {form}
            </div>

            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        game: state.scoreCard.game,
        registered: state.scoreCard.registered,

        games: state.games.games,
        teams: state.teams.teams,
        tokenId: state.auth.idToken,
        userId: state.auth.localId,

        noTeamOptions: state.teams.noTeamOptions
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddGameResult: (scoreCard) => dispatch(actions.addGameResult(scoreCard)),
        onFetchGames: (tokenId, userId) => dispatch( actions.initGames(tokenId, userId)),
        onFetchTeams: (tokenId, userId) => dispatch( actions.initTeams(tokenId, userId)),
    };
};

 export default connect(mapStateToProps, mapDispatchToProps)(RegisteredGame);
 