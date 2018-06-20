import React, { Component } from 'react';
import {connect} from 'react-redux';

class RightSideHeader extends Component {
	render() {
		const {user} = this.props.auth;
		return (
			<header id="header" className="header">
				<div className="header-menu">
					<div className="col-sm-7">
						
					</div>
					<div className="col-sm-5">
						<div className="user-area dropdown float-right">
							<a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<img className="user-avatar rounded-circle" src={user.avatar} alt="User Avatar" />
							</a>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(RightSideHeader);
