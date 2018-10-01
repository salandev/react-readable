import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import reducer from './reducer';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import registerServiceWorker from './registerServiceWorker';

const logger = createLogger({ collapsed: true })

const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(thunk, logger)
	)
)

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
