import React from 'react';

const SearchBox = (props) => {
	return (
		<div className='col col-sm-4'>
			<input
				className='form-control'
				value={props.value}
				onLoad={props.setSearchValue('star wars')}
				onChange={(event) => {props.setSearchValue(event.target.value)}}
				placeholder='Type to search...'
			></input>
		</div>
	);
};

export default SearchBox;