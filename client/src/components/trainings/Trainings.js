import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class Trainings extends Component {

	render() {
		const { user } = this.props.auth;


		return (
			<div id="trainigs">
				<div className="mt-5 fade-in-left">
					<div className="container text-center text-muted">
						<h1 className="lead">This is TRAININGS page, this is going to be finished soon.</h1>
						<div>
							<Link to='/diets'>
								<button className="btn btn-green-medium">GO TO DIETS PAGE <i class="far fa-hand-point-left"></i></button>
							</Link>
						</div>
						<div>
							<Link to='/recipes'>
								<button className="btn btn-green-medium">GO TO RECIPES PAGE <i class="far fa-hand-point-left"></i></button>
							</Link>
						</div>
						<div>
							<Link to={`/profile/${this.props.auth.user.nickname}`}>
								<button className="btn btn-green-medium">GO TO YOUR PROFILE PAGE <i class="far fa-hand-point-left"></i></button>
							</Link>
						</div>
						<div>
							<Link to='/users'>
								<button className="btn btn-green-medium">FIND USERS <i class="far fa-hand-point-left"></i></button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Trainings.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Trainings);
