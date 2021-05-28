// import './form.css';

function CustomInput(props) {
  return (
    <div className="user-info">
    	<label>{props.label}</label>
      <div className="w-100">
      	<input 
      		placeholder={props.placeholder}
      		name={props.name}
      		onChange={props.onChange}
        	value={props.value}
        	type={props.type}
          className="form-control"
          />
          {
          	props.error &&
          		<p>{props.errorMessage}</p>
          }
        </div>
    </div>
  );
}

export default CustomInput;
