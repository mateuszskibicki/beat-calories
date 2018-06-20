import React from 'react';

const Breadcrumbs = ({
	Title,
	Link,
	Link2,
	Link3
}) => {
	return (
		<div className="breadcrumbs d-none d-md-block">
			<div className="col-4">
				<div className="page-header float-left">
					<div className="page-title">
						<ol className="breadcrumb text-left">
							<li>{Title}</li>
						</ol>
					</div>
				</div>
			</div>
			<div className="col-8">
				<div className="page-header float-right">
					<div className="page-title">
						<ol className="breadcrumb text-right">
							<li>{Link}</li>
							{Link2 && (<li>{Link2}</li>)}
							{Link3 && (<li>{Link3}</li>)}
						</ol>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Breadcrumbs;
