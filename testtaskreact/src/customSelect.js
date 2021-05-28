// import './form.css';

function CustomSelect(props) {
  return (
    <div className="user-info">
    	<label>{props.label}</label>
    	<div className="w-100">
	        <select className="form-control" onChange={props.onChange} name={props.name} value={props.value} >
			  <option></option>
			  {
			  	props && props.categories && props.categories.map((color, index) => {
			  		return(
			  			<option value={color.value} key={index}>{color.title}</option>
			  		)
			  	})
			  } 
			</select>
		</div>
    </div>
  );
}

export default CustomSelect;
