const schema = require('../../Schema/schema');

function updateCategoryData(data, res){
    schema.categories.updateOne({_id: data.id},
    {$set: {
      title: data.title,
      description: data.description,
    }}, function(err){
      if(!err) res.send({success: true, message: "Category updated successfully"});
      else res.send({success: false, message: "Category already exist"});
    }
  );
};

module.exports = updateCategoryData;
