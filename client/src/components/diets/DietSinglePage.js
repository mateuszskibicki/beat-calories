import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getDietByID, likeDiet} from '../../actions/dietActions';
import DietCommentsContainer from './DietCommentsContainer';
import Moment from 'moment';
import _ from 'lodash';

class DietSinglePage extends Component {

	likeDiet = () => {
		this.props.likeDiet(this.props.diet.diet._id);
	}

	componentDidMount() {
		this.props.getDietByID(this.props.match.params.id);
	}

	render() {
		const {diet, loading} = this.props.diet;

		let componentDiet;
		if(_.isEmpty(diet) || loading) {
			componentDiet = <h1 className="display-1 text-center">Loading...</h1>;
		} else {

		 //diet jumbotron bg
			let jumboBgClass;
			diet.type === 'Meat' ? jumboBgClass = 'jumbotron jumbotron-fluid jumbotron-diet-meat' : 'jumbotron jumbotron-fluid';

			//like btn class
			let likeBtnClass;
			if (diet.likes.length === 0) {
				likeBtnClass = 'button-like';
			} else {
				if(diet.likes.includes(String(this.props.auth.user.id))) {
					likeBtnClass = 'button-liked';
				} else {
					likeBtnClass = 'button-like';
				}
			}

			componentDiet = (
				<div className="mt-5">
					<div className="container-fluid">
						<div className="row">			
							<div className="col-12">
								<div className={jumboBgClass}>
									<div className="container text-center">
										<h1 className="mb-1">{diet.title}</h1>
										<p className="lead m-0">Calories: {diet.kcal}</p>
										<p className="lead m-0">Author: <Link to={`/profile/${diet.user.nickname}`}>{diet.user.nickname}</Link></p>
										<p className="lead m-0">Date: {Moment(diet.date).format('Do MMMM YYYY, h:mm a')}</p>
										<p className="lead m-0">Type: {diet.type}</p>
										<p className="lead m-0"><i className="far fa-heart"></i> {diet.likes.length} <i className="far fa-comments"></i> {diet.comments.length}</p>
									</div>
								</div>
							</div>
							<div className="container">
								<button className={likeBtnClass} onClick={this.likeDiet}><i className="far fa-heart"></i></button>
							</div>
							<div className="container mt-5 text-center">
								<p className="lead diet-text">{diet.description}</p>
							</div>
							<DietCommentsContainer diet={diet} />
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
	getDietByID: PropTypes.func.isRequired,
	likeDiet : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	diet: state.diet
});

export default connect(mapStateToProps, {getDietByID, likeDiet})(DietSinglePage);
