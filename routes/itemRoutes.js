const router = require('express').Router()
const { Item, User } = require('../models')

// GET all items
router.get('/items', (req, res) => {
  Item.find()
    .populate('user')
    .then(items => res.json(items))
    .catch(err => console.log(err))
})

// POST one item
router.post('/items', (req, res) => {
  Item.create(req.body)
    .then(item => {
      User.findByIdAndUpdate(item.user, { $push: { items: item._id } })
        .then(() => res.json(item))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// PUT one item
router.put('/items/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body)
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err))
})

// DELETE one item
router.delete('/items/:id', (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router
