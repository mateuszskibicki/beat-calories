import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';
// import Navbar from './components/layout/Navbar';
// import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import LeftSide from './components/leftSide/LeftSide';
import Dashboard from './components/dashboard/Dashboard';
import Posts from './components/posts/Posts';
import Diets from './components/diets/Diets';
import DietForm from './components/diets/DietForm';
// import CreateProfile from './components/create-profile/CreateProfile';
// import EditProfile from './components/edit-profile/EditProfile';
// import AddExperience from './components/add-credentials/AddExperience';
// import AddEducation from './components/add-credentials/AddEducation';
// import Profiles from './components/profiles/Profiles';
// import Profile from './components/profile/Profile';
// import Posts from './components/posts/Posts';
// import Post from './components/post/Post';
// import NotFound from './components/not-found/NotFound';

//assets template
import './assets/css/normalize.css';
import './assets/css/font-awesome.min.css';
import './assets/css/style.css';
import './assets/js/main';


//Check for token
if (localStorage.jwtToken) {
// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	console.log(decoded);

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());
		// Clear current Profile
		store.dispatch(clearCurrentProfile());
		// Redirect to login
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />	
						<Switch>
							<PrivateRoute path="/" component={LeftSide} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/" component={Dashboard} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/profile" component={Dashboard} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/posts" component={Posts} />
						</Switch>
						{
							// DIETS
						}
						<Switch>
							<PrivateRoute exact path="/diets" component={Diets} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/diets/add" component={DietForm} />
						</Switch>


						<Switch>
							<PrivateRoute exact path="/recipes" component={Dashboard} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/trainings" component={Dashboard} />
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;

const component = () => (
	<div>
		<Navbar />
		<Route exact path="/" component={Landing} />
		<div className="container">
			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/profiles" component={Profiles} />
			<Route exact path="/profile/:handle" component={Profile} />
			<Switch>
				<PrivateRoute exact path="/dashboard" component={Dashboard} />
			</Switch>
			<Switch>
				<PrivateRoute exact path="/create-profile" component={CreateProfile} />
			</Switch>
			<Switch>
				<PrivateRoute exact path="/edit-profile" component={EditProfile} />
			</Switch>
			<Switch>
				<PrivateRoute exact path="/add-experience" component={AddExperience} />
			</Switch>
			<Switch>
				<PrivateRoute exact path="/add-education" component={AddEducation} />
			</Switch>
			<Switch>
				<PrivateRoute exact path="/post/:id" component={Post} />
			</Switch>
			<Switch>
				<PrivateRoute exact path="/feed" component={Posts} />
			</Switch>
			<Route exact path="/not-found" component={NotFound} />
		</div>
		<Footer />
	</div>
);
