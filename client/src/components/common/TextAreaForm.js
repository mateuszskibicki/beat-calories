import React from 'react';
import PropTypes from 'prop-types';


const TextAreaForm = ({
	label,
	type,
	placeholder,
	name,
	value,
	onChange,
	error,
	icon
}) => {
	return (
		<div className="form-group">
			<label>{icon && icon}{label}</label>
			<textarea 
				type={type} 
				className="form-control" 
				placeholder={placeholder}
				name={name} 
				value={value} 
				onChange={onChange}
			/>
			{_.isEmpty(error) ? null : (
				<small className="form-text alert-danger">{error}</small>
			)}
		</div>
	);
};

TextAreaForm.propTypes = {
	label : PropTypes.string,
	type : PropTypes.string,
	placeholder : PropTypes.string,
	name : PropTypes.string,
	value : PropTypes.string,
	onChange : PropTypes.func,
	error : PropTypes.string,
};

export default TextAreaForm;
