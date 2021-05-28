import React, { useEffect, useState } from 'react';
import { useParams , Link , useHistory } from 'react-router-dom';
import axios from 'axios';
import CustomInput from './customInput';
import CustomTextArea from './customTextArea'
import  { apiHost } from "./constant.js";

function AddNewCategory() {
	const [formConfig, setFormConfig] = useState({
    inputs: {
      title: '',
      description: '',
      id: 0
    }
  });

  const paramsData = useParams();
  const history = useHistory();
  const [call, handleCall] = useState(false);
	const handleChange = (e) => {
  	setFormConfig({
      ...formConfig,
      inputs: {
        ...formConfig.inputs,
        [e.target.name]: e.target.value,
      },
    });
  }		

  const submitForm = () => {
    let Data = formConfig.inputs
    let id = paramsData.slug
    if(Data.title !== "" && Data.description !== ""){
      if(id){
        let temp = {
          description: Data.description,
          title: Data.title,
          id: Data._id
        }
        axios.put(`${apiHost}/updateCategoryData` , temp).then((res) => {
          if(res.status === 200 && res.data.success === true){
            alert(res.data.message)
            redirect()
          }
        })
      }else{
        axios.post(`${apiHost}/addCategoryData` , Data).then((res) => {
          if(res.status === 200 && res.data.success === true){
            alert(res.data.message)
            redirect()
          }
        })
      }
    }
  }

  const redirect = () => {
    history.push("")
  }

  useEffect(() => {
    if(paramsData.slug && call === false){
      let id = paramsData.slug
      axios.get(`${apiHost}/getCategoryData/${id}`).then((res) => {
          setFormConfig({
            ...formConfig,
            inputs: res.data,
          });
      })
      handleCall(true)
    }
  })

  return (
  	<div className="w-75 mx-auto bg-light p-5 mt-4 rounded">
    	<h3>{paramsData.slug ? "Edit Category" : "Add New Category" }</h3>
  		<CustomInput placeholder="Title"
              		 name="title"
              		 onChange={(e) => handleChange(e)}
                	 value={formConfig.inputs.title}
                	 type="text"
                	 label="Title"/>
      <CustomTextArea placeholder="Description"
                  		name="description"
                  		onChange={(e) => handleChange(e)}
                    	value={formConfig.inputs.description}
                    	type="text"
                    	label="Description"
        />
      <p className="text-danger mt-2">Note: All the fields are required to submit the form</p>
      <div className="text-right mt-3">
        <button className="btn btn-primary mr-2" onClick={() => submitForm()}> {paramsData.slug ? "Update" : "Submit" } </button>
    		<button className="btn btn-success" onClick={() => redirect()}> Expense & Category List</button>
  	  </div>
    </div>
  );
}

export default AddNewCategory;
