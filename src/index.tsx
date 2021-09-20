import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import { Route, Switch, HashRouter } from 'react-router-dom';
import 'bootswatch/dist/minty/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './css/styles.css';
import './css/styles.css.map';

// Components
import Login from './Components/Login';
import PhotosContainer from './Components/PhotosContainer';

const App = () => {
	return (
		<React.StrictMode>
			<HashRouter>
				<main className="container">
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/:username" component={PhotosContainer} />
					</Switch>
				</main>
			</HashRouter>
		</React.StrictMode>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
