const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()

router.get('/', (req, res) => {
    Projects.get()
        .then(project => {
            res.status(404).json(project)
        })
        .catch(res.status(404))
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Projects.get(id)
        .then(byId => {
            if (!byId) {
                res.status(404).json({message: 'not found'})
            } else {
                res.status(200).json(byId)
            }
        })
        .catch(res.status(500))
})

router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(newProj => {
            res.status(201).json(newProj)
        })
        .catch(() => {
            res.status(400).json({message: 'missing data'})
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    Projects.update(id, req.body)
        .then(changes => {
            if (!id) {
                res.status(404).json({message: 'does not exist'})
            } else {
                res.status(200).json(changes)
            }
        })
        .catch(() => {
            res.status(400).json({message: 'nope'})
        })
})


router.delete('/:id', (req, res) => {
    const { id } = req.params
    Projects.get(id)
        .then(toDelete => {
            if (!id) {
                res.status(404).json({message: 'no project with given id'})
            } else {
                Projects.remove(id)
                    .then(
                        res.status(200).json(toDelete)
                    )
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
        .catch(() => {
            res.status(404).json({message: 'no'})
        })
})

router.get('/:id/actions', (req, res) => {
    const { id } = req.params
    Projects.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(res.status(404))
})

module.exports = router
