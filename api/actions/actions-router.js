const express = require('express')
const Actions = require('./actions-model')
const router = express.Router()


router.get('/', (req, res) => {
    Actions.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(() => {
            res.status(404).json({message: 'not found'})
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Actions.get(id)
        .then(byId => {
            if (!byId) {
                res.status(404).json({message: 'not here'})
            } else {
                res.json(byId)
            }
        })
        .catch(() => {
            res.status(404).json({message: 'not here'})
        })
})

router.post('/', (req, res) => {
    Actions.insert(req.body)
        .then(newPost => {
            res.json(newPost)
        })
        .catch(() => {
            res.status(400).json({message: ''})
        })
})

router.put('/:id', (req,res) => {
    const { id } = req.params
    Actions.update(id, req.body)
        .then(updates => {
            if (!updates) {
                res.status(400).json({message:'try again'})
            } else {
                res.json(updates)
            }
        })
        .catch(() => {
            res.status(400).json({message: 'try again'})
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Actions.get(id)
        .then(tbd => {
            if (!id) {
                res.status(404).json({message: 'not found'})
            } else {
                Actions.remove(id)
                    .then(
                        res.status(200).json(tbd)
                    )
                    .catch(() => {
                        res.status(404).json({message: 'not found'})
                        
                    })
            }
        })
})

module.exports = router