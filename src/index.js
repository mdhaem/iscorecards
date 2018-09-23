import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import cardPlayReducer from './store/reducers/cardPlayReducer';
import importScoresReducer from './store/reducers/importGameHistoryReducer';
import authReducer from './store/reducers/authReducer';
import newGameReducer from './store/reducers/newGameReducer';
import newPlayeReducer from './store/reducers/newPlayerReducer';
import getPlayersReducer from './store/reducers/getPlayersReducer';
import newTeamReducer from './store/reducers/newTeamReducer';
import getGamesReducer from './store/reducers/getGamesReducer';
import getTeamsReducer from './store/reducers/getTeamsReducer';
import {reducer as formReducer } from 'redux-form';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    importScoresReducer: importScoresReducer,
    cardPlay: cardPlayReducer,
    auth: authReducer,
    newGame: newGameReducer,
    newPlayer: newPlayeReducer,
    newTeam: newTeamReducer,
    playerList: getPlayersReducer,
    games: getGamesReducer,
    teams: getTeamsReducer,
    form: formReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
