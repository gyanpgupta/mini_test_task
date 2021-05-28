const schema = require('../../Schema/schema');

function deleteExpense(data, res){
    schema.expenses.deleteOne({_id: data}, function(err){
        if(!err) return res.send({success: true, message: "expense deleted successfully"});
    })
}

module.exports = deleteExpense;
