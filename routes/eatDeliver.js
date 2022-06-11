const {Router} = require('express');
const {apiEatDeliver} = require("../script");
const router = new Router();

router.get('/', async (req, res) => {
    try {
        console.log(req.query.lat, req.query.lon, req.query)
        res.send(await apiEatDeliver(req.query.lat, req.query.lon, req.query.postCode));
    } catch (err){
        console.log(err);
    }
})

module.exports = router;
