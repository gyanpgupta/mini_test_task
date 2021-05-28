const schema = require('../../Schema/schema');

function updateExpenseData(data, res){
  console.log(data.id)
    schema.expenses.updateOne({_id: data.id},
    {$set: {
      title: data.title,
      category: data.category,
      date: data.date,
      value: data.value,
    }}, function(err){
      if(!err) res.send({success: true, message: "Expense updated successfully"});
      else res.send({success: false, message: "document not updated"});
    }
  );
};

module.exports = updateExpenseData;
