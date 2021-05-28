const schema = require('../../Schema/schema');

function deleteCategory(id, res){
    schema.categories.deleteOne({_id: id}, function(err){
        if(!err) return res.send({success: true, message: "expense deleted successfully"});
    })
}

module.exports = deleteCategory;