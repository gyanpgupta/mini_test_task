const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/userExpensesDb", { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const ExpensesSchema = new mongoose.Schema({
    title:{ type:String, require: true },
    category: { type:String, require: true },
    date: Date,
    value:Number,
})

const CategoriesSchema = new mongoose.Schema({
    title: { type:String, require: true, unique:true },
    description: String,
});

const category = mongoose.model('category', CategoriesSchema);
const expense = mongoose.model('expense', ExpensesSchema);

module.exports = {
    expenses: expense,
    categories: category
}