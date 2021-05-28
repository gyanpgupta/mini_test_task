import React, { useEffect, useState } from 'react';
import { useParams , Link , useHistory} from "react-router-dom";
import axios from 'axios';
import CustomInput from './customInput';
import CustomSelect from './customSelect'
import  { apiHost } from "./constant.js";
import moment from 'moment';

function AddNewExpense() {
  const [formConfig, setFormConfig] = useState({
    inputs: {
      title: '',
      category: '',
      date: '',
      value: ''
    }
  });

  const history = useHistory()
  const paramsData = useParams();
  const [call, handleCall] = useState(false);
  const [expenseData, handleExpense] = useState(false);
  const [editData, handleEditData] = useState(false);
  const [formCategory, setCategory] = useState({
    categories: []
  });

  useEffect(() => {
    if(call === false){
      axios.get(`${apiHost}/getCategoryData`).then((res) => {
          setCategory({categories: res.data})
      })
      handleCall(true);
    }
  });

  useEffect(() => {
    if(paramsData.slug && editData === false){
      let id = paramsData.slug
      axios.get(`${apiHost}/getExpenseData/${id}`).then((res) => {
          let date = res.data.date && moment(res.data.date).format('YYYY-MM-DD')
          res.data.date = date
          setFormConfig({
            ...formConfig,
            inputs: res.data,
          });
      })
      handleEditData(true);
    }
  })

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
    if(Data.title !== "" && Data.category !== "" && Data.date !== "" && Data.value !== ""){
      if(id){
        let temp = {
          category: Data.category,
          date: Data.date,
          title: Data.title,
          value: Data.value,
          id: Data._id
        }
        axios.put(`${apiHost}/updateExpenseData` , temp).then((res) => {
          if(res.status === 200 && res.data.success === true){
            alert(res.data.message)
            redirect()
          }
        })

      }else{
        axios.post(`${apiHost}/addExpenseData` , Data).then((res) => {
          if(res.status === 200 && res.data.success === true){
            redirect()
            alert(res.data.message)
          }
        })
      }
    }
  }

  const redirect = () => {
    history.push("")
  }

  return (
  	<div className="w-75 mx-auto bg-light p-5 mt-4 rounded">
    	<h3>{paramsData.slug ? "Edit Expense" : "Add New Expense" }</h3>
  		<CustomInput placeholder="Title"
              		 name="title"
              		 onChange={(e) => handleChange(e)}
                	 value={formConfig.inputs.title}
                	 type="text"
                	 label="Title"
                	 />
        <CustomSelect categories={formCategory.categories}
            		  name="category"
            		  onChange={(e) => handleChange(e)}
                      value={formConfig.inputs.category}
            		  label="Category"
        			  />
        <CustomInput placeholder="Date"
              		 name="date"
              		 onChange={(e) => handleChange(e)}
                	 value={formConfig.inputs.date}
                	 type="date"
                	 label="Date"
                	 />
        <CustomInput placeholder="Value"
              		 name="value"
              		 onChange={(e) => handleChange(e)}
                	 value={formConfig.inputs.value}
                	 type="number"
                	 label="Value"
                	 />
        <p className="text-danger mt-2">Note: All the fields are required to submit the form</p>
    		<div className="text-right mt-3">
          <button className="btn btn-primary mr-2" onClick={() => submitForm()}>{paramsData.slug ? "Update" : "Submit"}</button>
      		<button className="btn btn-success" onClick={() => redirect()}> Expense & Category List</button>
      	</div>
    </div>
  );
}

export default AddNewExpense;
