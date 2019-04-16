import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as actions from '../../../store/actions';

import classes from './UpdateGameHistory.css'
import FormCode from './UpdateGameHistoryForm'
 

class UpdateGameHistory extends Component {
    componentDidMount(props) {
        //const newState = this.state;
        this.props.onFetchGames(this.props.tokenId, this.props.userId);
        // this.props.onFetchTeams(this.props.tokenId, this.props.userId);
        console.log(this.props.games);
        this.setState(this.state); 
    }
    render() {

        return (
            <div className={classes.ImportGameHistory}>
                <h1>Update Game History</h1>
                <p className={classes.Instructions}>Select date, game, team, and scores for previously played games.</p>
                {console.log(this.props.games)}
                <FormCode                         
                    gameOptions={this.props.games} />

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.auth.localId,
        token: state.auth.idToken,
        teamAdded: state.newTeam.teamAdded,
        games: state.games.games,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchGames: (tokenId, userId) => dispatch( actions.initGames(tokenId, userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateGameHistory)