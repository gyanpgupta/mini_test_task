const express = require('express');
const router = express.Router();
const schema = require('../../Schema/schema');

router.get('/', (req, res)=>{
    schema.expenses.find({}, function(err, expenses){
      console.log(expenses)
      if(expenses){
        let totalValue = 0;
        let valuePercentagePair = [];
        let finalResponse = [];
        // res.send(data)
        expenses.map(expense => {
          totalValue = totalValue + expense.value;
        })
        expenses.map(expense => {
            let match = false;
            valuePercentagePair.map((vpp, index) => {
                if(vpp.key === expense.category){
                  match = true;
                  valuePercentagePair[index].percent = valuePercentagePair[index].percent + expense.value;
                }
            })
            let key = expense.category;
            let percent = expense.value;
            if(match === false)
              valuePercentagePair.push({key: key, percent: percent});
        })
        valuePercentagePair.map(vpp => {
            let percentage = vpp.percent/totalValue * 100;
            finalResponse.push({category: vpp.key, percentage: percentage.toFixed(2) });
        })
        res.send(finalResponse);
      }
      else
        res.send('no data available');
    })
})

module.exports = router;
