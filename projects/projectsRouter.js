const express = require('express');
const router = express.Router();

projectsHelper = require('../data/helpers/projectModel');


router.get('/',async(req,res)=>{
    try {
        const response = await projectsHelper.get();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message:error})
    }
})
router.get('/:id',async(req,res)=>{
    try {
        const response = await projectsHelper.get(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message:error})
    }
})

module.exports = router;