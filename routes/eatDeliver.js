const {Router} = require('express');
const {apiEatDeliver} = require("../script");
const router = new Router();

router.get('/', async (req, res) => {
    try {
        res.send(await apiEatDeliver());
    } catch (err){
        console.log(err);
    }
})

module.exports = router;