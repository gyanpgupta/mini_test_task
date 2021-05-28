import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ExpenseList from './expenseList';
import AddNewExpense from './addNewExpense';
import AddNewCategory from './addNewCategory';

const RoutesHandler = () => (
  <Switch>
    <Route path="/" exact render={() => <ExpenseList />} />
    <Route path="/newExpense" exact render={() => <AddNewExpense />} />
    <Route path="/editExpense/:slug" exact render={() => <AddNewExpense />} />
    <Route path="/newCategory" exact render={() => <AddNewCategory/>} />
    <Route path="/editCategory/:slug" exact render={() => <AddNewCategory/>} />
  </Switch>
);

export default RoutesHandler;
