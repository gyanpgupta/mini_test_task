const schema = require('../../Schema/schema');

function getExpenseData(id, res){
  if(id === 0 || id === undefined){
    schema.expenses.find({}, function(err, data){
    console.log(data)
    if(data)
      res.send(data)
    else
      res.send('no data available');
  })}
  else{
    schema.expenses.findOne({_id: id}, function(err, data){
      console.log(data)
      if(data)
        res.send(data)
      else
        res.send('no data available');
    })
  }
}
module.exports = getExpenseData;