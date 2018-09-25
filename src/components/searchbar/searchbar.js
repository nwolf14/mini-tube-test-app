
import React from 'react';

export default function Searchbar(props) {
	return (
		<div className="searchbar">
			<div className="input-group">
				<input
					className="form-control py-2 border-right-0 border"
					type="search"
					placeholder="Search for a job"
					id="example-search-input" />
				<span className="input-group-append">
					<button className="btn btn-outline-secondary border-left-0 border" type="button">
						<i className="material-icons">search</i>
					</button>
				</span>
			</div>
		</div>
	);
}
