const schema = require('../../Schema/schema');

function getCategoryData(id, res){
  if(id === 0 || id === undefined){
    schema.categories.find({}, function(err, data){
    console.log(data)
    if(data)
      res.send(data)
    else
      res.send('no data available');
  })}
  else{
    schema.categories.findOne({_id: id}, function(err, data){
      console.log(data)
      if(data)
        res.send(data)
      else
        res.send('no data available');
    })
  }
}
module.exports = getCategoryData;
