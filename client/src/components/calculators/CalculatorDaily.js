import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import InputForm from '../common/InputForm';
import TextAreaForm from '../common/TextAreaForm';
import SelectForm from '../common/SelectForm';


class CalculatorDaily extends Component {
	constructor(props) {
		super(props);
		this.state={
			benedict : '',
			action : '',
			daily: '',
			errors: {}
		};
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	calculateDaily = (e) => {
		e.preventDefault();
		let errors = {};
		_.isEmpty(this.state.benedict) ? errors.benedict = 'Daily in kcal (H.Benedict) is required.' : null;
		_.isEmpty(this.state.action) ? errors.action = 'Action is required.' : null;
    
		if(!_.isEmpty(errors)) {
			this.setState({errors: errors});
		} else if (this.state.action === 'Lose weight') {
			this.setState({
				errors: {},
				daily: Number(this.state.benedict) - 300
			});
		} else if (this.state.action === 'Gain weight') {
			this.setState({
				errors: {},
				daily: Number(this.state.benedict) + 300
			});
		}
	}

	render() {
		const {errors} = this.state;
    
		let dailyContent = '';
		_.isNumber(this.state.daily) ?
			dailyContent = (
				<div>
					<h2>
    Your daily calories : {Math.round(this.state.daily * 100) / 100}			
					</h2>
				</div>
			) : 
			dailyContent = '';

		return (
			<div className="calculator-bmi">
				<h1 className="display-4 text-center">Daily calories to lose or gain weight</h1>

				<div className="row">
        
					<div className="col-12 col-xl-6 mt-3 mb-3">
						<p className="lead text-center">
       Remember, everyone is different. This is just a calculator and it gives you an approximate calorie value that you need. When you have already calculated your Harris Benedict Formula value, add 300 kcal to the number to gain weight in a healthy way or subtract 300 kcal to lose weight. Remember, the process of gaining or losing weight is time-consuming and you should'nt do it too fast.
						</p>
					</div>

					<div className="col-12 col-xl-6 mt-3 mb-3">
						<div className="form mt-5 max-500 m-auto">	
            			
							<InputForm
								type="number"
								placeholder="Daily H.Benedict in kcal *"
								name = "benedict"
								value = {this.state.benedict}
								onChange = {this.onChange}
								error = {errors.benedict}
							/>
              
							<SelectForm
								htmlForAndID='action'
								label="Action"
								name="action"
								optionArray={['Lose weight', 'Gain weight']}
								value = {this.state.action}
								onChange = {this.onChange}
								error = {errors.action}
							/>

							{dailyContent}

							<button className='btn btn-green-medium' type='submit' onClick={this.calculateDaily}>Calculate Daily</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CalculatorDaily;
