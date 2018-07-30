import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import PropTypes from 'prop-types';

import photoMeat from '../../images/diet-meat.png';
import photoVegetarian from '../../images/diet-vegetarian.png';
import photoVegan from '../../images/diet-vegan.png';
import moment from 'moment';
import _ from 'lodash';

class RecipeCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShortAboutVisible : false,
			isModalUpdateVisible: false
		};
	}

	showShortAbout = (e) => {
		this.setState({isShortAboutVisible: !this.state.isShortAboutVisible});
	}
	
	// showUpdateForm = () => {
	// 	let modalVisible = this.state.isModalUpdateVisible;
	// 	this.setState({isModalUpdateVisible : !this.state.isModalUpdateVisible});
	// }

	// deleteDiet = (e) => {
	// 	const dietId = e.target.getAttribute('data-id');
		
	// 	if (this.props.match.path === '/diets') {
	// 		this.props.deleteDiet(dietId);
	// 	} else if (this.props.match.path === '/profile/:nickname') {
	// 		this.props.deleteDietProfilePage(dietId);
	// 	}
	// }

	render(){
		const {
			comments,
			cookingMethod,
			cookingTime,
			cuisine,
			date,
			dishType,
			ingredients,
			kcal,
			lifestyle,
			likes,
			longDescription,
			shortDescription,
			preparationTime,
			price,
			tags,
			title,
			user,
			_id
		} = this.props.recipe;
    
		console.log(this.props);

  	let photo = '';
  	lifestyle === 'Meat' ? photo = photoMeat : null;
  	lifestyle === 'Vegetarian' ? photo = photoVegetarian : null;
  	lifestyle === 'Vegan' ? photo = photoVegan : null;
    
  	let imgTopClass = '';
  	lifestyle === 'Meat' ? imgTopClass = 'card-img-top-bg card-img-top-bg-red' : null;
  	lifestyle === 'Vegetarian' ? imgTopClass = 'card-img-top-bg card-img-top-bg-blue' : null;
  	lifestyle === 'Vegan' ? imgTopClass = 'card-img-top-bg card-img-top-bg-green' : null;
    

    
  	let tagClass = '';
  	lifestyle === 'Meat' ? tagClass = 'tag tag-red' : null;
  	lifestyle === 'Vegetarian' ? tagClass = 'tag tag-blue' : null;
  	lifestyle === 'Vegan' ? tagClass = 'tag tag-green' : null;
  
  	let tagsRecipe = '';
  	if(!_.isEmpty(tags)) {
  		tagsRecipe = tags.map(tag => <small className={tagClass} key={tag}>{tag}</small>);
		}
    
		let ingredientsRecipe = '';
  	if(!_.isEmpty(ingredients)) {
  		ingredientsRecipe = ingredients.map(ingredient => <small className={tagClass} key={ingredient}>{ingredient}</small>);
  	}
    
  	let buttonClass;
  	lifestyle === 'Meat' ? buttonClass = 'button-red' : null;
  	lifestyle === 'Vegetarian' ? buttonClass = 'button-blue' : null;
  	lifestyle === 'Vegan' ? buttonClass = 'button-green' : null;
    
  	 let buttonsUpdateDelete = '';

  	if(this.props.auth.user.id && this.props.auth.user.id === user._id) {
  		buttonsUpdateDelete = (
  			<div className='buttons-update-remove-card'>
  				<button 
  					className='button-update' 
  					onClick={this.showUpdateForm}
  				>
  					<i className="fas fa-pencil-alt"></i>
  				</button>
  				<button 
  					className='button-remove'
  					data-id={_id} 
					  onClick={this.deleteDiet}
					 >
					 <i className="fas fa-trash-alt"  data-id={_id}></i>
					 </button>
  			</div>
  		);
  	}
		

		// comments,
		// cookingMethod,
		// cookingTime,
		// cousines,
		// date,
		// dishType,
		// ingredients,
		// kcal,
		// lifestyle,
		// likes,
		// longDescription,
		// shortDescription,
		// tags,
		// title,
		// user,
    
  	return (
  		<div className="col-12 col-md-6 col-xl-4 fade-in-left">
				<div className="card card-recipe">
					{buttonsUpdateDelete}
					<div className={imgTopClass}>
						<img className="card-img-top" 
							src={photo} 
							alt={title} />
					</div>			
  				<div className="card-body pt-1">
						<small className="text-muted text-right mb-0 d-block">User: <Link to={`/profile/${user.nickname}`}>{user.nickname}</Link></small>
						<small className="text-muted text-right mb-0 d-block">Date: {moment(date).format('DD MMM YYYY')}</small>
						<small className="text-muted text-right mb-0 d-block">Lifestyle: {lifestyle}</small>
						<small className="text-muted text-right mb-0 d-block">Dish type: {dishType}</small>
						<small className="text-muted text-right mb-0 d-block">Cuisine: {cuisine}</small>
						<small className="text-muted text-right mb-0 d-block"><strong className="price">Price: {price}</strong></small>
						<h3 className='text-space'>{title}</h3>
						<p className="mb-0">{kcal} kcal</p>
						<p className="mb-0">Cooking method : {cookingMethod}</p>
						<p className="mb-0">Preparation time : {preparationTime}</p>
						<p className="mb-0">Cooking time : {cookingTime}</p>

						<button className={buttonClass} onClick={this.showShortAbout}>
							Short about {
								this.state.isShortAboutVisible ?
									<i class="fas fa-arrow-up"></i> :
									<i class="fas fa-arrow-down"></i> 
							}
						</button>

						{this.state.isShortAboutVisible ? (
							<div className='fade-in-up'>
								<hr/>
								<p className="text-space">{shortDescription}</p>
								<hr />
								<p className="card-text mb-0">
									<span className="text-muted">Tags: </span>
									{tagsRecipe}
								</p>
								<p className="card-text mb-0">
									<span className="text-muted">Ingredients: </span>
									{ingredientsRecipe}
								</p>
								<hr />
							</div>
						) : null}



						<Link to={`/recipes/${_id}`}>
							<button
								className={buttonClass} 
								data-id={_id}   
							>
						Read more... <i className="ml-2 fas fa-book"></i>
							</button>
						</Link>
  				</div>
				</div>
        
  		</div>
  	);
	}
}

RecipeCard.propTypes = {
	recipe: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(withRouter(RecipeCard));
