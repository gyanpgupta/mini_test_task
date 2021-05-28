// import './form.css';

function CustomTextArea(props) {
  return (
    <div className="user-info">
    	<label>{props.label}</label>
      <div className="w-100">
      	<textarea 
      		placeholder={props.placeholder}
      		name={props.name}
      		onChange={props.onChange}
        	value={props.value}
        	type={props.type}
          className="form-control"
          />
      </div>
    </div>
  );
}

export default CustomTextArea;
