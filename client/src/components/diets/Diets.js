import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//actions
import {getDiets} from '../../actions/dietActions';
import DietForm from './DietForm';


class Diets extends Component {
	state = {
		diets: 0
	}

	componentDidMount() {
		this.props.getDiets();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.diet.diets.length > 0) {
			this.setState({
				diets: nextProps.diet.diets.length
			});
		}
	}

	// onDeleteClick(e) {
	// 	this.props.deleteAccount();
	// }

	render() {
		const { diets, loading } = this.props.diet;

		return (
			<div id="diets" className="mt-5">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12 m-auto">
							<DietForm />
						</div>
					</div>
				</div>
				
			</div>
		);
	}
}

// Dashboard.propTypes = {
// 	getCurrentProfile: PropTypes.func.isRequired,
// 	deleteAccount: PropTypes.func.isRequired,
// 	auth: PropTypes.object.isRequired,
// 	profile: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
	auth: state.auth,
	diet: state.diet
});

export default connect(mapStateToProps, {getDiets})(Diets);
