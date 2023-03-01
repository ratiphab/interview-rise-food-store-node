const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = (foodService) => {
    const REST_PORT = 8080;
  
    const server = app.listen(REST_PORT, () => {
      console.log('App listening on port' , REST_PORT );
    });
  
    app.get('/', (req, res) => {
      res.send('Server running...');
    });

    app.get('/table', (req, res) => {
        const tableList = foodService.get()
        res.status(200).json(tableList);
      });
    
    app.post('/table/open', (req, res) => {
        const { numTable } = req.body
        const tableList = foodService.open(numTable)
        if(tableList){
            res.status(200).json({"success" : true,"data":tableList});
        }else{
            res.status(400).json({"success" : false})
        }
    })

    app.post('/table/close', (req, res) => {
        const { numTable,isMember } = req.body
        const totalPrice = foodService.close(numTable,isMember)
        if(totalPrice){
            res.status(200).json({"success" : true, totalPrice:totalPrice});
        }else{
            res.status(400).json({"success" : false})
        }
    })

    app.post('/orders', (req, res) => {
        const { numTable,orders } = req.body
        const tableList = foodService.addOrder(orders,numTable)
        if(tableList){
            res.status(200).json({"success" : true});
        }else{
            res.status(400).json({"success" : false})
        }
    })
  };
  