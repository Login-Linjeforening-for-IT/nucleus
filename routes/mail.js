const express = require('express')
const router = express.Router()

router.post('/feedback', async(req,res)=>{
    console.log(req.body)
    return(
        res.json({message: 'Varsel mottatt.'})
    )
})

module.exports = router;
