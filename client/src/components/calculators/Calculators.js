import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import CalculatorBMI from './CalculatorBMI';
import CalculatorBMR from './CalculatorBMR';
import CalculatorHarrisBenedict from './CalculatorHarrisBenedict';


class Calculators extends Component {

	render() {
		const { user } = this.props.auth;


		return (
			<div id="calculators">
				<div className="mt-5 mb-5 fade-in-left">
					<div className="container">

						<div className="add-container add-container-calculators mb-5">
							<div className="jumbotron mt-3 mb-3">
								<div className="display-4">Calculators</div>
							</div>
						</div>

						<CalculatorBMI />

						<CalculatorBMR />

						<CalculatorHarrisBenedict />
					

						Harris Benedict Formula
						Harris Benedict Formula
						Harris Benedict Formula
						Harris Benedict Formula
						Harris Benedict Formula


					</div>
				</div>
			</div>
		);
	}
}

Calculators.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Calculators);
