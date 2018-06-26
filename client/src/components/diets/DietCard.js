import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import photoMeat from '../../images/diet-meat.png';
import photoVegetarian from '../../images/diet-vegetarian.png';
import photoVegan from '../../images/diet-vegan.png';
import classnames from 'classnames';
import moment from 'moment';
import _ from 'lodash';

class DietCard extends Component {
	render(){
		const {diet} = this.props;

		let photo = '';
		diet.type === 'Meat' ? photo = photoMeat : null;
		diet.type === 'Vegetarian' ? photo = photoVegetarian : null;
		diet.type === 'Vegan' ? photo = photoVegan : null;
    
		let imgTopClass = '';
		diet.type === 'Meat' ? imgTopClass = 'card-img-top-bg card-img-top-bg-red' : null;
		diet.type === 'Vegetarian' ? imgTopClass = 'card-img-top-bg card-img-top-bg-blue' : null;
		diet.type === 'Vegan' ? imgTopClass = 'card-img-top-bg card-img-top-bg-green' : null;
    

    
		let tagClass = '';
		diet.type === 'Meat' ? tagClass = 'tag tag-red' : null;
		diet.type === 'Vegetarian' ? tagClass = 'tag tag-blue' : null;
		diet.type === 'Vegan' ? tagClass = 'tag tag-green' : null;
  
		let tags = '';
		if(!_.isEmpty(diet.tags)) {
			tags = diet.tags.map(tag => <span className={tagClass} key={tag}>{tag}</span>);
		}
    
		let buttonToDisplay = '';
		if(this.props.auth.user.id && this.props.auth.user.id === diet.user._id) {


			buttonToDisplay = (
				<div>
					<button className='w-50 btn-primary' data-id={diet._id}>Update <i className="ml-2 fas fa-pencil-alt"></i></button>
					<button className='w-50 btn-danger' data-id={diet._id}>Delete <i className=" ml-2 fas fa-trash-alt"></i></button>
				</div>
			);
		} else {

			let buttonClass;
			diet.type === 'Meat' ? buttonClass = 'button-red' : null;
			diet.type === 'Vegetarian' ? buttonClass = 'button-blue' : null;
			diet.type === 'Vegan' ? buttonClass = 'button-green' : null;
			buttonToDisplay = <button className={buttonClass} data-id={diet._id}>Read more... <i className="ml-2 fas fa-book"></i></button>;
      
		}
		

    
		return (
			<div className="col-12 col-md-6 col-xl-4">
				<div className="card card-diet">
					<div className={imgTopClass}>
						<img className="card-img-top" 
							src={photo} 
							alt={diet.title} />
					</div>		
					<div className="card-body">
						<p className="text-muted text-right mb-0">User: {diet.user.nickname}</p>
						<p className="text-muted text-right mb-0">Date: {moment(diet.date).format('DD-MM-YYYY')}</p>
						<p className="text-muted text-right mb-0">Type: {diet.type}</p>
						<h2>Calories: {diet.kcal}</h2>
						<h4>{diet.title}</h4>
						<p className="card-text mb-0">
							<span className="text-muted">Tags: </span>
							{tags}
						</p>
						<small className="text-muted mb-0">Likes: {diet.likes.length}</small> {'      '}
						<small className="text-muted mb-0 ml-auto">Comments: {diet.comments.length}</small>
						
						{buttonToDisplay}

					</div>
				</div>
			</div>
		);
	}
}

DietCard.propTypes = {
	diet: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(DietCard);
