const {Router} = require('express');
const {apiEatDeliver} = require("../script");
const router = new Router();


/*********************** Eat Delivery routes *************************/
router.get('/', async (req, res) => {
    try {
        res.send(await apiEatDeliver(req.query.lat, req.query.lon, req.query.postCode));
    } catch (err){
        console.log(err);
    }
})
module.exports = router;
