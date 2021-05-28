const express = require('express');
const bodyParser = require('body-parser') ;
const cors = require('cors');

const getChartData = require('./DBOperations/Chart/getChartData');

const getCategoryData = require('./DBOperations/Categories/getCategories');
const addCategoryData = require('./DBOperations/Categories/addCategories');
const updateCategoryData = require('./DBOperations/Categories/editCategories');
const deleteCategory = require('./DBOperations/Categories/deleteCategories');

const getExpenseData = require('./DBOperations/Expenses/getExpenses');
const addExpensesData = require('./DBOperations/Expenses/addExpenses');
const updateExpenseData = require('./DBOperations/Expenses/editExpenses');
const deleteExpense = require('./DBOperations/Expenses/deleteExpenses');

const app = express();
const port = 8000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/getCategoryData/:id', (req, res)=>{
    console.log(getCategoryData(req.params.id, res))
})

app.get('/getCategoryData', (req, res)=>{
    console.log(getCategoryData(0, res))
})

// app.use('/getCategoryData', getCategoryData);

app.put('/updateCategoryData', (req, res)=>{
    console.log(updateCategoryData(req.body, res));
})

app.post('/addCategoryData', (req, res)=>{
    console.log(addCategoryData(req.body, res));
})

app.delete('/deleteCategory/:id', (req, res)=>{
    console.log(deleteCategory(req.params.id, res));
})

app.get('/getExpenseData/:id', (req, res)=>{
    console.log(getExpenseData(req.params.id, res))
})

app.get('/getExpenseData', (req, res)=>{
    console.log(getExpenseData(0, res))
})

// app.use('/getExpenseData', getExpenseData);

app.put('/updateExpenseData', (req, res)=>{
    console.log(updateExpenseData(req.body, res));
})

app.post('/addExpenseData', (req, res)=>{
    console.log(addExpensesData(req.body, res));
})

app.delete('/deleteExpense/:id', (req, res)=>{
    console.log(deleteExpense(req.params.id, res));
})

app.use('/getChartData', getChartData);

app.listen(port, ()=>{
    console.log(`server runs on ${port}`)
})
