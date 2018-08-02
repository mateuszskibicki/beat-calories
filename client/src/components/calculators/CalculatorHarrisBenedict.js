import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import InputForm from '../common/InputForm';
import TextAreaForm from '../common/TextAreaForm';
import SelectForm from '../common/SelectForm';


class CalculatorHarrisBenedict extends Component {
	constructor(props) {
		super(props);
		this.state={
			bmr : '',
			harrisBenedict: '',
			errors: {}
		};
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	calculateHarrisBenedict = (e) => {
		e.preventDefault();
		let errors = {};

	}

	render() {
		const {errors} = this.state;
    
		let harrisBenedictContent = '';
		_.isNumber(this.state.harrisBenedictContent) ?
			harrisBenedictContent = (
				<div>
					<h2>
    Your BMR : {Math.round(this.state.bmr * 100) / 100}			
					</h2>
				</div>
			) : 
			harrisBenedictContent = '';

		return (
			<div className="calculator-bmi">
				<h1 className="display-4 text-center">Harris Benedict</h1>

				<div className="row">
        
					<div className="col-12 col-xl-6 mt-3 mb-3">
						<p className="lead text-center">
            Once you've calculated your BMR, this is then put into the Harris Benedict Formula, which calculates your total calorie intake required to maintain your current weight (daily). Example: your BMR=1700 and you have some light exerices daily (1.375), your total amount of calories you need daily = 1700*1.375 = 2.337. This is as follows:
						</p>
      
						<ul className="list-group list-group-ranges max-500">
							<li className="list-group-item">Little/no exercise: <span className="badge badge-info">BMR * 1.2</span></li>
							<li className="list-group-item">Light exercise: <span className="badge badge-info">BMR * 1.375</span></li>
							<li className="list-group-item">Moderate exercise (3-5 days/wk): <span className="badge badge-info">BMR * 1.55</span></li>
							<li className="list-group-item">Very active (6-7 days/wk): <span className="badge badge-info">BMR * 1.725</span></li>
							<li className="list-group-item">Extra active (very active & physical job): <span className="badge badge-info">BMR * 1.9</span></li>
						</ul>
					</div>

					<div className="col-12 col-xl-6 mt-3 mb-3">
						<div className="form mt-5 max-500 m-auto">	
            			
							<InputForm
								type="number"
								placeholder="BMR in kcal *"
								name = "bmr"
								value = {this.state.bmr}
								onChange = {this.onChange}
								error = {errors.bmr}
							/>

              
							<SelectForm
								htmlForAndID='exercise'
								label="Exercise"
								name="exercise"
								optionArray={[
									'Little/no exercise',
									'Light exercise',
									'Moderate exercise (3-5 days/wk)',
									'Very active (6-7 days/wk)',
									'Extra active (very active & physical job)'
								]}
								value = {this.state.gender}
								onChange = {this.onChange}
								error = {errors.gender}
							/>

							{harrisBenedictContent}

							<button className='btn btn-green-medium' type='submit' onClick={this.calculateHarrisBenedict}>Calculate BMR</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CalculatorHarrisBenedict;
