import React, { Component } from 'react';
import {logoutUser} from '../../actions/authActions';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class TopNavbar extends Component {

	logoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	}

  showMenu = () => {
  	let navLeft = document.getElementById('left-nav');
  	if(navLeft.classList.contains('d-none')) {
  		navLeft.classList.remove('d-none');
  	} else {
  		navLeft.classList.add('d-none');
  	}
  	
  }

  render() {
  	return (
  		<div className="navbar-top">
  			<div className="row">
  				<div className="col-4 col-sm-3 col-xl-2 left">
  					<Link to='/' className="beat-logo"><span>Beat</span>Calories</Link>
  				</div>
  				<div className="col-8 col-sm-9 col-xl-10 right">
  					<div className="row">
  						<div className="col-6 navbar-top-item text-center">
  							<div onClick={this.showMenu} className="m-auto">
  								<i className="fas fa-bars m-auto d-block d-sm-none"></i>
  							</div>
  							
  						</div>
  						<div className="col-6 navbar-top-item">
  							<img src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png" onClick={this.logoutClick} alt="User avatar"/>
  						</div>
  					</div>
  				</div>
  			</div>
  		</div>
  	);
  }
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps , {logoutUser})(TopNavbar);
