import React, { Component } from 'react';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions';
import {Link} from 'react-router-dom';

class leftSide extends Component {

	constructor() {
		super();
	}

	logoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	}

	hideNavbar = (e) => {
		if(e.target.tagName === 'A' && window.innerWidth < 576) {
			document.querySelector('.navbar-toggler').click();
		}
	}

	render() {
		return (
			<aside id="left-panel" className="left-panel">
				<nav className="navbar navbar-expand-sm navbar-default"> 
					<div className="navbar-header">
						<button className="navbar-toggler pt-2 pb-2" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
							Beat Calories			<i className="fa fa-bars" />
						</button>
					</div>
					<div id="main-menu" className="main-menu collapse navbar-collapse">
						<ul className="nav navbar-nav" onClick={this.hideNavbar}>
							<li>
								<h3 className="menu-title d-none d-md-block">YOUR ACCOUNT</h3>
								<Link to="/profile" className="menu-text"> <i className="menu-icon fa fa-user-circle" aria-hidden="true"></i>Profile </Link>

								<h3 className="menu-title d-none d-md-block">USER CONTENT</h3>
								<Link to="/" className="menu-text"><i className="menu-icon fa fa-window-maximize" />DASHBOARD </Link>
								<Link to="/posts" className="menu-text"><i className="menu-icon fa fa-info" />POSTS </Link>
								<Link to="/diets" className="menu-text"><i className="menu-icon fa fa-cutlery" />DIETS </Link>
								<Link to="/recipes" className="menu-text"><i className="menu-icon fa fa-list-ol" />RECIPES </Link>
								<Link to="/trainings" className="menu-text"><i className="menu-icon fa fa-hand-rock-o" />TRAININGS </Link>
							
								<h3 className="menu-title d-none d-md-block">KNOW MORE</h3>
								<Link to="/" className="menu-text" onClick={this.logoutClick}> <i className="menu-icon fa fa-sign-out" />Logout </Link>
							</li>
						</ul>
					</div>{/* /.navbar-collapse */}
				</nav>
			</aside>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps , {logoutUser})(leftSide);
