'use strict'

const router = require('express').Router()
const Todo = require('../models/dbHelper')

router.get('/read', (req, res)=>{
	Todo.find().then(data=>res.json(data)).catch(err=>console.log(err))
})
router.post('/create', (req, res)=>{
	Todo.add(req.body).then(data=>res.json(data)).catch(err=>console.log(err))
})
router.post('/update/:id', (req, res)=>{
	Todo.update(req.params.id, req.body).then(data=>res.json(data)).catch(err=>console.log(err))
})
router.get('/delete/:id', (req, res)=>{
	Todo.remove(req.params.id).then(data=>res.json(data)).catch(err=>console.log(err))
})

module.exports = router