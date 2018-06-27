import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Loading from '../common/Loading';
import DietCard from './DietCard';
//actions
import {getDiets} from '../../actions/dietActions';
import DietForm from './DietForm';
import Chart from 'chart.js';


class Diets extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getDiets();
	}

	componentWillReceiveProps(nextProps) {
		if(this.props !== nextProps){
			document.getElementById('charts').innerHTML = `
				<div class="row">
					<div class="col-12 col-md-6 text-center">
						<small><strong>BY TYPES</strong></small>
						<canvas id="dietsChart" width="320" height="320"></canvas>
					</div>		  
					<div class="col-12 col-md-6 text-center">
						<small><strong>BY CALORIES</strong></small>
						<canvas id="kcalChart" width="320" height="320"></canvas>
					</div>
				</div>
			`;
			const {diets} = nextProps.diet;
			let dietsMeat = 0;
			let dietsVegetarian = 0;
			let dietsVegan = 0;
			let dietsLess2000 = 0;
			let diets2000to3000 = 0;
			let diets3000to4000 = 0;
			let diets4000to5000 = 0;
			let dietsMore5000 = 0;
			let dietConent;
			if(_.isEmpty(diets) && !diets.length) {
				dietConent = <Loading/>;
			} else {
				dietConent = diets.map(diet => diet.title);
				diets.map(diet => {
					diet.type === 'Meat' ? dietsMeat++ : null;
					diet.type === 'Vegetarian' ? dietsVegetarian++ : null;
					diet.type === 'Vegan' ? dietsVegan++ : null;
					Number(diet.kcal) < 2000 ? dietsLess2000++ : null;
					Number(diet.kcal) >= 2000 && Number(diet.kcal) < 3000 ? diets2000to3000++ : null;
					Number(diet.kcal) >= 3000 && Number(diet.kcal) < 4000 ? diets3000to4000++ : null;
					Number(diet.kcal) >= 4000 && Number(diet.kcal) < 5000 ? diets4000to5000++ : null;
					Number(diet.kcal) > 5000 ? dietsMore5000++ : null;
				});
				// $red-meat: #ff6347;
				// $green-vegan: #89da59;
				// $blue--vegetarian: #11998e;
				var dietsChart = document.getElementById('dietsChart');
				let dietChartData = {
					datasets: [{
						data: [dietsMeat, dietsVegetarian, dietsVegan],
						backgroundColor: [
							'#ff6347',
							'#11998e',
							'#89da59'
						],
					}],
					labels: [
						'Meat',
						'Vegetarian',
						'Vegan'
					]
				};
				var myDoughnutChart = new Chart(dietsChart, {
					type: 'doughnut',
					data: dietChartData,
					options: null
				});
				var kcalChart = document.getElementById('kcalChart');
				let kcalChartData = {
					datasets: [{			
						data: [dietsLess2000,
							diets2000to3000,
							diets3000to4000,
							diets4000to5000,
							dietsMore5000],
						backgroundColor: [
							'rgba(255, 99, 132, 0.8)',
							'rgba(54, 162, 235, 0.8)',
							'rgba(255, 206, 86, 0.8)',
							'rgba(75, 192, 192, 0.8)',
							'rgba(153, 102, 255, 0.8)'
						],
					}],
					labels: [
						'2000--',
						'2000 - 3000',
						'3000 - 4000',
						'4000 - 5000',
						'5000++'
					],				
				};
				var myDoughnutChart2 = new Chart(kcalChart, {
					type: 'doughnut',
					data: kcalChartData,
					options: null
				});
			}
		}
	}


	render() {

		const {diets, loading} = this.props.diet;
		let dietContent;

		if(diets === null || loading) {
			dietContent = <h1 className="display-1 text-center">Loading....</h1>;
		} else {
			dietContent = diets.map(diet => <DietCard key={diet._id} diet={diet}/>);
		}


		return (
			<div id="diets" className="mt-5">
				<div className="container-fluid">
					<div className="row">			
						<div className="col-12 col-xl-4">
							<div className="add-container add-container-diet">
								<button type="button" className="button-add-modal" data-toggle="modal" data-target="#dietAddModal">
									ADD DIET
									<div className="d-block">
										<i className="far fa-plus-square"></i>
									</div>
								</button>		
							</div>
							<div className="modal fade" id="dietAddModal" tabIndex={-1} role="dialog" aria-labelledby="dietAddModalLabel" aria-hidden="true">
								<div className="modal-dialog" role="document">
									<div className="modal-content modal-form">
										<DietForm />
									</div>
								</div>
							</div>

						</div>
						<div className="col-12 col-xl-8 mt-5" id="charts">

						</div>			
					</div>
				</div>
				<div className="container-fluid">
					<div className="row user-content">
						{dietContent}
					</div>
				</div>
			</div>

		);
	}
}

Diets.propTypes = {
	getDiets: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	diet: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	diet: state.diet
});

export default connect(mapStateToProps, {getDiets})(Diets);
