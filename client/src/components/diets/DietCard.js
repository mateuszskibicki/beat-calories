import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {deleteDiet} from '../../actions/dietActions';
import PropTypes from 'prop-types';
import photoMeat from '../../images/diet-meat.png';
import photoVegetarian from '../../images/diet-vegetarian.png';
import photoVegan from '../../images/diet-vegan.png';
import moment from 'moment';
import _ from 'lodash';

import Modal from 'react-modal';
Modal.setAppElement('#root');

class DietCard extends Component {
	constructor(props) {
		super(props);
	}

  closeModal =() => {
  	this.setState({isModalOpen: false});
  }

  deleteDiet = (e) => {
  	const dietId = e.target.getAttribute('data-id');
  	this.props.deleteDiet(dietId);
  }

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
  		tags = diet.tags.map(tag => <small className={tagClass} key={tag}>{tag}</small>);
  	}
    
  	let buttonClass;
  	diet.type === 'Meat' ? buttonClass = 'button-red' : null;
  	diet.type === 'Vegetarian' ? buttonClass = 'button-blue' : null;
  	diet.type === 'Vegan' ? buttonClass = 'button-green' : null;
    
  	let buttonsUpdateDelete = '';

  	if(this.props.auth.user.id && this.props.auth.user.id === diet.user._id) {
  		buttonsUpdateDelete = (
  			<div className='buttons-update-remove-diet'>
  				<button className='button-update' data-id={diet._id} ><i className="fas fa-pencil-alt"></i></button>
  				<button className='button-remove' data-id={diet._id} onClick={this.deleteDiet}><i className="fas fa-trash-alt"  data-id={diet._id}></i></button>
  			</div>
  		);
  	}
		

    
  	return (
  		<div className="col-12 col-md-6 col-xl-4">
  			<div className="card card-diet">
  				{buttonsUpdateDelete}
  				<div className={imgTopClass}>
  					<img className="card-img-top" 
  						src={photo} 
  						alt={diet.title} />
  				</div>		
  				<div className="card-body pt-1">
  					<small className="text-muted text-right mb-0 d-block">User: <Link to={`/profile/${diet.user.nickname}`}>{diet.user.nickname}</Link></small>
  					<small className="text-muted text-right mb-0 d-block">Date: {moment(diet.date).format('DD MMM YYYY')}</small>
  					<small className="text-muted text-right mb-0 d-block">Type: {diet.type}</small>
  					<h3>Calories: <strong>{diet.kcal}</strong></h3>
  					<h4>{diet.title}</h4>
  					<p className="card-text mb-0">
  						<span className="text-muted">Tags: </span>
  						{tags}
  					</p>
  					<p className="text-muted mb-0"><i className="far fa-heart"></i> {diet.likes.length} | <i className="far fa-comments"></i> {diet.comments.length}</p>
  					<Link to={`/diets/${diet._id}`}>
  						<button
  						className={buttonClass} 
  						data-id={diet._id}   
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

DietCard.propTypes = {
	diet: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteDiet: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, {deleteDiet})(DietCard);
