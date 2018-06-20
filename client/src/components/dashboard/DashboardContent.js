import React, { Component } from 'react';
import Breadcrumbs from '../common/Breadcrumbs';

class DashboardContent extends Component {
	render() {
		return (
			<div>
				<Breadcrumbs 
					Title = 'User content'
					Link = 'Dashboard'
				/>
				<div className="content mt-3">
					<div className="col-md-6"><h1 className="display-1">Hejo</h1></div>
					<div className="col-md-6"><h1 className="display-1">Hejo</h1></div>
					<div className="col-md-6"><h1 className="display-1">Hejo</h1></div>
					<div className="col-md-6"><h1 className="display-1">Hejo</h1></div>
					<div className="col-md-6"><h1 className="display-1">Hejo</h1></div>
					<div className="col-md-4"><p className="lead">cos cos</p></div>
					<div className="col-md-4"><p className="lead">cos cos</p></div>
					<div className="col-md-4"><p className="lead">cos cos</p></div>
					<div className="col-md-4"><p className="lead">cos cos</p></div>
					<div className="col-md-4"><p className="lead">cos cos</p></div>
					<div className="col-md-4"><p className="lead">cos cos</p></div>
				</div>
			</div>
		);
	}
}

export default DashboardContent;
