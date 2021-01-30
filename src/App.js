import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Menu from './components/Menu';
import Article from './components/Article';
import Nimekiri from './components/Nimekiri';

function App() {
	return (
		<div className='App'>
			<div className='container'>
				<Router>
					<div className='menu'>
						<Menu />
					</div>
					<div className='content'>
						<Switch>
							<Route exact path='/article'>
								<Article />
							</Route>
							<Route path='/list'>
								<Nimekiri />
							</Route>
							<Route path='/'>
								<Redirect to='/list' />
							</Route>
						</Switch>
					</div>
				</Router>
			</div>
		</div>
	);
}

export default App;
