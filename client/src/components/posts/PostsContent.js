import React, { Component } from 'react';
import Breadcrumbs from '../common/Breadcrumbs';

class PostsContent extends Component {
	render() {
		return (
			<div>
				<Breadcrumbs 
					Title = 'User content'
					Link = 'Dasboard'
					Link2 = 'Posts'
				/>
				<div className="content mt-3">
					<div className="col-12">
						<div className="alert alert-success">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur vitae harum omnis enim autem recusandae expedita aperiam hic dolores placeat illum, reiciendis ut impedit perspiciatis eos totam, voluptas, itaque culpa veritatis quo officia vel non. Voluptas suscipit ipsam est hic architecto. Debitis dolore architecto aut corporis cumque expedita iusto velit?</div>
						<h1>POSTS</h1>
					</div>
				</div>
			</div>
		);
	}
}

export default PostsContent;
