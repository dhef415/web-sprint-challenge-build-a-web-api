const express = require('express')
const Actions = require('./actions-model')
const router = express.Router()

router.get('/', (req, res) => {
  Actions.get()
    .then(action => {
      res.status(200).json(action)
    })
    .catch(() => {
      res.status(404).json({ message: 'not found' })
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  Actions.get(id)
    .then(byId => {
      if (!byId) {
        res.status(404).json({ message: 'not here' })
      } else {
        res.json(byId)
      }
    })
    .catch(() => {
      res.status(404).json({ message: 'not here' })
    })
})

router.post('/', (req, res) => {
  Actions.insert(req.body)
    .then(newPost => {
      res.json(newPost)
    })
    .catch(() => {
      res.status(400).json({ message: '' })
    })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  Actions.update(id, req.body)
    .then(updates => {
      if (!updates) {
        res.status(400).json({ message: 'try again' })
      } else {
        res.json(updates)
      }
    })
    .catch(() => {
      res.status(400).json({ message: 'try again' })
    })
})

router.delete('/:id', async (req, res) => {
  try {
    const toBeDeleted = Actions.findById(req.params.id)
    if (!toBeDeleted) {
      res.status(404).json({
        message: 'The user does not exist',
      })
    } else {
      const deletedUser = await Actions.remove(toBeDeleted.id)
      res.status(200).json(deletedUser)
    }
  } catch (err) {
    res.status(500).json({
      message: 'The user could not be removed',
    })
  }
})

module.exports = router
