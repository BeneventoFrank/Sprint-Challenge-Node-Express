const express = require('express');
const router = express.Router();

actionsHelper = require('../data/helpers/actionModel');
projectsHelper = require('../data/helpers/projectModel');


router.get('/',async(req,res)=>{
    try {
        const response = await actionsHelper.get();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message:error})
    }
})
router.get('/:id',async(req,res)=>{
    try {
        const response = await actionsHelper.get(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message:error.toString()})
    }
})

router.post('/',async(req,res)=>{
    try {
        let msg = validateActionBody(req.body)
        console.log('message',msg)
        if(msg.length>0){
            res.status(400).json({message:msg})
        } else {
          const resp =  await actionsHelper.insert(req.body);
          const action = await actionsHelper.get(resp.id);
          res.status(201).json(action)
        }
    } catch (error) {
        res.status(500).json({message:error.toString()})        
    }
})
router.put('/:id',(req,res)=>{
    try {
        let msg = validateActionBody(req.body)
        if(msg.length>0){
            res.status(400).json({message:msg})
        } else {
            actionsHelper.update(req.params.id,req.body);
            actionsHelper.get(req.params.id)
                .then(response => res.status(200).json(response))
                .catch(error=>res.status(500).json({message:error.toString()}))
        }
    } catch (error) {
        res.status(500).json({message:error.toString()})        
    }
})

router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    actionsHelper.remove(id)
        .then(response => res.status(200).json(response))
        .catch(error=>res.status(500).json({message:error.toString()}))
})



function validateActionBody(bodyObject){
    let retval = '';

    if(!bodyObject.project_id)
    {
        retval += 'Id is required'
    }

    if(!bodyObject.description){
        retval += "Description is required"
    } else if(bodyObject.description.length > 128){
        retval += "Description max lenght 128"
    }
   
    if(!bodyObject.notes){
        retval += "Notes are required"
    }
    

    return retval;

}

module.exports = router;