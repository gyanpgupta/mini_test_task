import React, { useEffect, useState } from 'react';
import { Link , useHistory } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import  { apiHost } from "./constant.js";
import axios from 'axios';
import moment from 'moment';
import "./expenseList.css";

function ExpenseList() {
  const [ percentData , handlePercentDate ] = useState([])
  const [chartData , handleChartData] = useState(false);
	const donughtValuationData1 = {
    datasets: [{
      data: percentData,
      backgroundColor: [
        `lightblue`,
        'red',
        'orange',
        'green',
        'blue',
        'pink',
        'grey',
        'yellow'
      ]
    }],
    labels: chartData,
  };
	const options2 = {
    plugins: {
      datalabels: {
        display: false,
      },
    },
    tooltips: {
      enabled: false,
    },
    responsive: false,
    cutoutPercentage: 92,
    maintainAspectRatio: false,
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  }; 

  const history = useHistory();
  const [call, handleCall] = useState(false);
  const [expenseData, handleExpense] = useState(false);
  const [formConfig, setCategory] = useState({
    categories: []
  });
  const [expenseConfig, setExpense] = useState({
    expenses: []
  });



  useEffect(() => {
    if(expenseData === false){
      getExpenseList()        
      handleExpense(true);
    }
  });

  const getExpenseList = () => {
    axios.get(`${apiHost}/getExpenseData`).then((res) => {
        setExpense({
          ...expenseConfig,
          expenses: res.data
        })
    })
  }

  useEffect(() => {
    if(call === false){
      getCategoryList()
      handleCall(true);
    }
  });

  const getCategoryList = () => {
    axios.get(`${apiHost}/getCategoryData`).then((res) => {
      setCategory({
        ...formConfig,
        categories: res.data
      })
    })
  }

  useEffect(() => {
    if(chartData === false){
      getChartData()
      handleChartData(true);
    }
  });

  const getChartData = () => {
    axios.get(`${apiHost}/getChartData`).then((res) => {
      let percent = []
      let name = [] 
      res.data && res.data.map((data) => {
        percent.push(data.percentage)
        name.push(data.category)
      })
      handlePercentDate(percent)
      handleChartData(name)
    })
  }

  const deleteMethod = (type , id) => {
    let ID = id
    if(type === "expenses"){
      axios.delete(`${apiHost}/deleteExpense/${ID}`).then((res) => {
        if(res.data.success === true && res.status === 200){
          getExpenseList()
          getChartData()
        }
      })
    }else{
      axios.delete(`${apiHost}/deleteCategory/${ID}`).then((res) => {
        if(res.data.success === true && res.status === 200){
          getCategoryList()        
        }
      })
    }
  }

  const redirect = (type) => {
    if(type === "expense"){
      history.push("/newExpense")
    }else{
      history.push("/newCategory")
    }
  } 

  const navigate = (path) => {
    history.push(path)
  }

  return (
    <div>
    	<h3 className="mb-3 font-weight-bold">Expense List </h3>
      <table className="table">
      	<tr>
          <th>S. No.</th>
          <th>Title</th>
          <th>Category</th>
          <th>Date</th>
          <th>Value</th>
          <th>Actions</th>
        </tr>
        {
          expenseConfig && expenseConfig.expenses && expenseConfig.expenses.length > 0 
          ?
            expenseConfig.expenses.map((expense , index) => {
              return(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{expense.title}</td>
                    <td>{expense.category}</td>
                    <td>{expense.date && moment(expense.date).format('Do MMM YYYY')}</td>
                    <td>{expense.value}</td>
                    <td>
                      <button className="btn btn-primary mr-2 py-1 bg-transparent border-primary text-primary rounded-pill" onClick={() => navigate(`/editExpense/${expense._id}`)}> Edit </button>
                      <button className="btn btn-danger py-1 bg-transparent border-danger text-danger rounded-pill" onClick={() => deleteMethod( "expenses" , expense._id)}> Delete </button>
                    </td>
                  </tr>
                )
            })
          :
            <tr><td colspan="6">No record found</td></tr>
        }
      </table>
      <p className="text-right mb-0">
        <button className="text-decoration-underline btn text-primary" onClick={() => redirect("expense")}>+ Add New Expense</button>
    	</p>
      <h3 className="mb-3 font-weight-bold">Category List </h3>
    	<table className="table">
        <tr>
          <th>S. No.</th>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
        {
          formConfig && formConfig.categories && formConfig.categories.length > 0 
          ?
            formConfig.categories.map((catg , index) => {
              return(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{catg.title}</td>
                    <td>{catg.description}</td>
                    <td>
                        <button className="btn btn-primary mr-2 py-1 bg-transparent border-primary text-primary rounded-pill" onClick={() => navigate(`/editCategory/${catg._id}`)}> Edit </button>
                        <button className="btn btn-danger py-1 bg-transparent border-danger text-danger rounded-pill" onClick={() => deleteMethod("category" , catg._id)}> Delete </button>
                    </td>
                  </tr>
                )
            })
          :
            <tr><td colspan="4">No record found</td></tr>
        }
      </table>
      <p className="text-right mb-0">
        <button className="text-decoration-underline btn text-primary" onClick={() => redirect("category")}>+ Add New Category</button>
      </p>
      {
        expenseConfig && expenseConfig.expenses && expenseConfig.expenses.length > 0 &&
      	<div className="py-5 bg-light mt-4">
          <h3 className="mb-3 font-weight-bold text-center">Data According to category perentage</h3>
        	<Doughnut data={donughtValuationData1} options={options2} className="mx-auto mb-5 mt-4"/>
        </div>
      }
  	</div>
  );
}

export default ExpenseList;
