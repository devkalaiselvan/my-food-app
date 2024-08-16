const express = require('express');
const router = express.Router();



router.post('/foodData', async (req, res) =>{
    res.send([global.food_item,global.food_list])
})
       

module.exports = router;
