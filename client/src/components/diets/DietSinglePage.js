import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {getDietByID, likeDiet, deleteDietSinglePage} from '../../actions/dietActions';
import DietFormUpdateSinglePage from './DietFormUpdateSinglePage';
import DietCommentsContainer from './DietCommentsContainer';
import * as jsPDF from 'jspdf';
import Moment from 'moment';
import _ from 'lodash';

class DietSinglePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalUpdateVisible: false
		};
	}

	componentDidMount() {
		this.props.getDietByID(this.props.match.params.id);
	}

	showUpdateForm = () => {
		let modalVisible = this.state.isModalUpdateVisible;
		this.setState({isModalUpdateVisible : !this.state.isModalUpdateVisible});
	}

	likeDiet = () => {
		this.props.likeDiet(this.props.diet.diet._id);
	}

	removeDiet = (e) => {
		this.props.deleteDietSinglePage(e.target.getAttribute('data-id'), this.props.history);
		//remove diet and push to /diets
	}

	getPDF = () => {
		let {diet} = this.props.diet;
		let doc = new jsPDF();

		doc.setFontSize(20);
		doc.text(20, 20, 'Beat Calories project by Mateusz Skibicki');
		doc.setFontSize(10);
		doc.text(20, 40, `Author: ${diet.user.name} | nickname : ${diet.user.nickname}`);
		doc.text(20, 50, `Title: ${diet.title}`);
		doc.text(20, 60, `Calories: ${diet.kcal}`);
		doc.text(20, 70, `Tags: ${diet.tags.join(',')}`);
		doc.text(20, 80, 'Description :');
		doc.text(20, 90, `${diet.description}`);
		doc.save('diet.pdf');
	}

	render() {
		const {diet, loading} = this.props.diet;

		let componentDiet;
		if(_.isEmpty(diet) || loading) {
			componentDiet = <h1 className="display-1 text-center">Loading...</h1>;
		} else {

		 //diet jumbotron bg
			let jumboBgClass;

			if(diet.type === 'Meat') {
				jumboBgClass = 'jumbotron jumbotron-fluid jumbotron-diet-single-meat jumbotron-diet-single';
			}

			if(diet.type === 'Vegan') {
				jumboBgClass = 'jumbotron jumbotron-fluid jumbotron-diet-single-vegan jumbotron-diet-single';
			}

			if(diet.type === 'Vegetarian') {
				jumboBgClass = 'jumbotron jumbotron-fluid jumbotron-diet-single-vegetarian jumbotron-diet-single';
			}

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
								<div className="col-12 mb-3">
									<Link to='/diets' className="btn btn-outline-secondary">Go back</Link>
								</div>
								<div className={jumboBgClass}>
									<div className="container text-center">
										<h1 className="mb-1 fw-500">{diet.title}</h1>
										<h2 className="m-0 fw-500">Calories: {diet.kcal}</h2>
										<p className="lead m-0 fw-500">Author: <Link to={`/profile/${diet.user.nickname}`}>{diet.user.nickname}</Link></p>
										<p className="lead m-0 fw-500">Date: {Moment(diet.date).format('Do MMMM YYYY, h:mm a')}</p>
										<p className="lead m-0 fw-500">Type: {diet.type}</p>
										<p className="lead m-0 fw-500 pdf-version">PDF version: <i className="fas fa-file-pdf ml-1" onClick={this.getPDF}></i></p>
										<p className="lead m-0 fw-500">
											<i className="far fa-heart"></i> {diet.likes.length} 
											<i className="ml-2 far fa-comments"></i> {diet.comments.length}
										</p>
										{diet.user._id.toString() === this.props.auth.user.id.toString() ? (
											<p className="lead mb-0 buttons-diet-single-page">
												<i 
													className="fas fa-trash-alt remove"  
													data-id={diet._id}
													onClick={this.removeDiet}
												></i>
												<i 
													className="fas fa-pencil-alt update" 
													data-id={diet._id}
													onClick={this.showUpdateForm}
												></i>
										 </p>
										) : null}
									</div>
								</div>
							</div>
							<div className="container text-center">
								<small className="text-muted fw-500">Do you like this diet?</small>
								<button className={likeBtnClass} onClick={this.likeDiet}><i className="far fa-heart"></i></button>
							</div>
							<div className="container mt-5 text-center">
								<p className="lead diet-text">{diet.description}</p>
							</div>
							<DietCommentsContainer diet={diet} />
						</div>
					</div>
					{this.state.isModalUpdateVisible === true ? (
						<div>
							<button type="button" className="button-update-diet-modal" hidden data-toggle="modal" data-target="#dietUpdateModal">
						Launch update
							</button>
							<div className="modal fade p-0" id="dietUpdateModal" tabIndex={-1} role="dialog" aria-labelledby="dietUpdateModal" aria-hidden="true">
								<div className="modal-dialog modal-lg" role="document">
									<div className="modal-content modal-form">
										<DietFormUpdateSinglePage singleDiet={diet} showUpdateForm={this.showUpdateForm} />
									</div>
								</div>
							</div>
						</div>
					) : null}
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
	likeDiet : PropTypes.func.isRequired,
	deleteDietSinglePage : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	diet: state.diet
});

export default connect(mapStateToProps, {getDietByID, likeDiet, deleteDietSinglePage})(withRouter(DietSinglePage));
