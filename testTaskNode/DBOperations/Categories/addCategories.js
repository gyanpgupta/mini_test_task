const schema = require('../../Schema/schema');

function addCategoryData(data, res){
  const categoryData = new schema.categories({
    title: data.title,
    description: data.description,
  })

  categoryData.save(function(err, data){ 
    if(err) return console.log(err)
    else return res.send({ success: true, message: "category saved successfully"});
  })
}

module.exports = addCategoryData;
