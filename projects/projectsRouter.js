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
        res.status(500).json({message:error.toString()})
    }
})
router.get('/actions/:id',async(req,res)=>{
    try {
        const response = await projectsHelper.getProjectActions(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message:error.toString()})
    }
})

router.post('/',async(req,res)=>{
    try {
        let msg = validateProjectBody(req.body)
        if(msg.length>0){
            res.status(400).json({message:msg})
        } else {
          const resp =  await projectsHelper.insert(req.body);
          const project = await projectsHelper.get(resp.id);
          res.status(201).json(project)
        }
    } catch (error) {
        res.status(500).json({message:error.toString()})        
    }
})
router.put('/:id',(req,res)=>{
    try {
        let msg = validateProjectBody(req.body)
        if(msg.length>0){
            res.status(400).json({message:msg})
        } else {
            projectsHelper.update(req.params.id,req.body);
            projectsHelper.get(req.params.id)
                .then(response => res.status(200).json(response))
                .catch(error=>res.status(500).json({message:error.toString()}))
        }
    } catch (error) {
        res.status(500).json({message:error.toString()})        
    }
})

router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    projectsHelper.remove(id)
        .then(response => res.status(200).json(response))
        .catch(error=>res.status(500).json({message:error.toString()}))
})



function validateProjectBody(bodyObject){
    let retval = true;

    if(!bodyObject.name)
    {
        retval += 'Name is required';
    } else if(bodyObject.name.length > 128) {
        retval += '\nName can only be 128 characters';
    }

    if(!bodyObject.description){
        retval += '\nDescription is required'
    }
    return retval;

}

module.exports = router;