import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getDietByID} from '../../actions/dietActions';
import Moment from 'moment';
import _ from 'lodash';

class DietSinglePage extends Component {
	componentDidMount() {
		this.props.getDietByID(this.props.match.params.id);
    
	}

	render() {
		const {diet, loading} = this.props.diet;

		let componentDiet;
		if(_.isEmpty(diet) || loading) {
			componentDiet = <h1 className="display-1 text-center">Loading...</h1>;
		} else {
			componentDiet = (
				<div className="mt-5">
					<div className="container-fluid">
						<div className="row">			
							<div className="col-12">
								<div className="jumbotron jumbotron-fluid">
									<div className="container text-center">
										<h1 className="display-4 mb-1">{diet.title}</h1>
										<p className="lead m-0">Calories: {diet.kcal}</p>
										<p className="lead m-0">Author: {diet.user.nickname}</p>
										<p className="lead m-0">Date: {Moment(diet.date).format('Do MMMM YYYY, h:mm:ss a')}</p>
										<p className="lead m-0">Type: {diet.type}</p>
										<p className="lead m-0">Type: {diet.description}</p>
										<p className="lead m-0"><i className="far fa-heart"></i> {diet.likes.length} <i className="far fa-comments"></i> {diet.comments.length}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		
		return (
			<div>
				{componentDiet}
			</div>
		);
	}
}

DietSinglePage.propTypes = {
	diet: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	getDietByID: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	diet: state.diet
});

export default connect(mapStateToProps, {getDietByID})(DietSinglePage);
