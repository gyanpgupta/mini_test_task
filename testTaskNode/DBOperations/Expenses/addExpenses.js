const schema = require('../../Schema/schema');

function addExpensesData(data, res){
  const expenseData = new schema.expenses({
    title: data.title,
    category: data.category,
    date: data.date,
    value: data.value,
  })

  expenseData.save(function(err, data){ 
    if(err) return console.log(err)
    else return res.send({ success: true, message: "expense saved successfully"});
  })
}

module.exports = addExpensesData;
